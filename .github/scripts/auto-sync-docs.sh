#!/bin/bash
#
# Auto-sync documentation files to GitHub
# Runs every 30 minutes via cron
#
# Usage: bash auto-sync-docs.sh
# No arguments needed - designed for unattended execution

set -o pipefail

# Configuration
REPO_DIR="/home/user/maiwebsite"
LOG_FILE="$REPO_DIR/.github/logs/auto-sync.log"
WATCH_PATHS=(
    "docs/"
    "training/docs/"
    "README.md"
)

# Use current branch instead of creating a new one
# This avoids git push 403 errors (branches must match claude/* pattern)
cd "$REPO_DIR" || exit 1
BRANCH=$(git branch --show-current)

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG_FILE"
}

# Rotate log file (keep last 100 lines)
rotate_log() {
    if [ -f "$LOG_FILE" ]; then
        local line_count=$(wc -l < "$LOG_FILE")
        if [ "$line_count" -gt 200 ]; then
            tail -100 "$LOG_FILE" > "$LOG_FILE.tmp"
            mv "$LOG_FILE.tmp" "$LOG_FILE"
        fi
    fi
}

# Change to repository directory
cd "$REPO_DIR" || {
    log "ERROR: Cannot access repository at $REPO_DIR"
    exit 1
}

# Rotate log before starting
rotate_log

# Check for git lock
if [ -f .git/index.lock ]; then
    log "Git index locked. Waiting 5 seconds..."
    sleep 5
    if [ -f .git/index.lock ]; then
        log "ERROR: Git still locked after wait. Skipping sync."
        exit 1
    fi
fi

# Fetch latest changes (network check)
if ! git fetch origin --quiet 2>&1 | tee -a "$LOG_FILE"; then
    log "WARNING: Cannot reach remote. Network may be down. Skipping sync."
    exit 0
fi

# Log which branch we're syncing
log "Syncing on branch: $BRANCH"

# Check for changes in watched paths
CHANGED_FILES=$(git status --porcelain "${WATCH_PATHS[@]}" 2>/dev/null)

if [ -z "$CHANGED_FILES" ]; then
    # No changes - silent exit
    exit 0
fi

# Stage changes
git add "${WATCH_PATHS[@]}"

# Verify there are staged changes
if git diff --cached --quiet; then
    log "Changes already committed previously. No new commit needed."
    exit 0
fi

# Create commit with timestamp
COMMIT_MSG="Auto-sync docs: $(date '+%Y-%m-%d %H:%M')"
if ! git commit -m "$COMMIT_MSG" --quiet 2>&1 | tee -a "$LOG_FILE"; then
    log "ERROR: Commit failed"
    exit 1
fi

COMMIT_HASH=$(git rev-parse --short HEAD)
log "Created commit: $COMMIT_HASH - $COMMIT_MSG"

# Check if remote branch exists
if git ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
    # Remote branch exists - pull with rebase to avoid merge commits
    if ! git pull --rebase origin "$BRANCH" --quiet 2>&1 | tee -a "$LOG_FILE"; then
        log "ERROR: Rebase failed - possible conflict"
        git rebase --abort 2>/dev/null
        log "Manual intervention required:"
        log "  cd $REPO_DIR"
        log "  git checkout $BRANCH"
        log "  git pull --rebase origin $BRANCH"
        log "  Resolve conflicts, then: git rebase --continue"
        log "  git push origin $BRANCH"

        # Optional: Desktop notification
        command -v notify-send >/dev/null 2>&1 && \
            notify-send "Doc Sync Error" "Merge conflict detected. Check $LOG_FILE"

        exit 1
    fi
else
    log "Remote branch does not exist yet - will create on first push"
fi

# Push to remote with retry logic
MAX_RETRIES=4
RETRY_COUNT=0
RETRY_DELAY=2

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if git push -u origin "$BRANCH" --quiet 2>&1 | tee -a "$LOG_FILE"; then
        log "SUCCESS: Synced docs to GitHub (commit: $COMMIT_HASH)"
        exit 0
    else
        RETRY_COUNT=$((RETRY_COUNT + 1))
        if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
            log "WARNING: Push failed (attempt $RETRY_COUNT/$MAX_RETRIES). Retrying in ${RETRY_DELAY}s..."
            sleep $RETRY_DELAY
            RETRY_DELAY=$((RETRY_DELAY * 2))  # Exponential backoff
        fi
    fi
done

log "ERROR: Push failed after $MAX_RETRIES attempts"
log "$(git status --short)"
exit 1
