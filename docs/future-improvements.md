# Roadmap & Future Improvements

> **This is the single source of truth for planned work.**

## Completed

- [x] Mobile-first workout logger
- [x] Block-based program navigation
- [x] Google Sheets auto-sync
- [x] Last session data loading

---

## Now (< 1 hour each)

### Progression Content Simplification
**Priority: High** | Content editing, no code changes

Rewrite verbose progression notes to be action-oriented:

| Exercise | Current | Better |
|----------|---------|--------|
| Pull-Up | "Track total reps. Build volume." | "Add 1 rep each session. At 15 total reps, add weight." |
| Back Squat | "Build to 3x8 at 185 before adding load. Then 195lb for 3x5." | "Add 1 rep per set. When you hit 3x8, increase to 195lb." |
| Ring Support | "Build to 3x60s before ring dip eccentrics" | "Add 5 seconds each session. At 3x60s, move to ring dips." |
| Hamstring Slide | "Progress to 1-leg eccentric when 3x10 is easy and confident" | "At 3x10, switch to 1-leg eccentric (slower tempo)." |

**Guidelines:**
1. Be specific—tell them exactly what to do next
2. Be concise—1-2 short sentences max
3. Focus on the next step, not the entire progression path

### PR Highlight
Compare current set to previous best, show "PR!" badge when exceeded.

### Fix exercises.yaml TODO
Look up Steven Low's progression charts for `parallel-bar-dip-eccentric` checkpoint.
Location: `training/data/exercises.yaml:973`

---

## Next (1-3 hours each)

### Session Complete Screen Redesign
Current summary screen is unattractive and needs a visual refresh. Consider more engaging layout, better data presentation, and improved visual hierarchy.

### URL Parameters for Client Selection
Allow `?client=tanner` to load different programs without separate HTML files. Foundation for multi-client support.

### Visual Progress Indicator
Show reps added over time as a simple sparkline or progress bar.

### Landing Page
Simple page showcasing coaching services. Doesn't need to wait for other features.

---

## Later

### Coach Dashboard
- Trend visualization (4-week rolling averages)
- Auto-flag exercises meeting progression criteria
- Client notes aggregation
- Volume tracking (sets × reps × load)

### Exercise Library Integration
- Link exercises to detailed library entries
- Surface "what comes next" suggestions
- Alternative exercise suggestions
- Auto-regression when performance drops

### Multi-Client Support
- Client selector on overview screen
- Client authentication for privacy
- Separate Google Sheet tabs auto-created

### Program Management
- Program versioning in Google Sheets
- Multiple programs per client
- Program templates library
- Program creation interface

---

## Ideas (Unprioritized)

- Frequency tracking
- Video demonstrations for exercises
- Easy program duplication/modification
- Client onboarding flow

## Auto-Sync Test 2026-01-22 04:04:10

Testing the automated documentation sync system.
