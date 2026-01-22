# tannerholman.space

Personal website and movement coaching platform for Tanner Holman.

## Structure

```
maiwebsite/
├── index.html              # Main website homepage
├── CNAME                   # Custom domain configuration (tannerholman.space)
├── tanner_photo.JPG        # Profile photo
└── training/               # Movement coaching section
    ├── index.html          # Training section landing page (placeholder)
    ├── tanner.html         # Workout logger application
    ├── data/               # Program and exercise data
    │   ├── tanner-program.json
    │   └── exercises.yaml
    └── docs/               # Client context documentation
        └── tanner-context.md
```

## Training Section

The training section (`/training/`) contains a custom workout logging application for movement coaching clients.

### Current Setup
- **Testing mode**: Direct URL access only
- **Access**: `tannerholman.space/training/tanner.html`
- **Purpose**: Mobile-first workout logger for tracking strength training sessions

### Adding New Clients

To add a new client:

1. Copy `training/tanner.html` to `training/[clientname].html`
2. Create `training/data/[clientname]-program.json` with their program
3. Update the program data in the HTML file to reference the new JSON
4. Share direct URL: `tannerholman.space/training/[clientname].html`

### Data Recording & Google Sheets Integration

The workout logger automatically syncs session data to Google Sheets for tracking and analysis.

#### Setup (One-time)

1. **Create Google Sheet**: "Movement Coaching - Session Data"
2. **Add client sheet**: Create a tab/sheet named exactly as configured in the HTML (e.g., "Tanner")
3. **Add column headers** in row 1:
   ```
   A: Date | B: Timestamp | C: Block ID | D: Block Name | E: Exercise ID
   F: Exercise Name | G: Set Number | H: Target Reps | I: Actual Reps
   J: Load | K: Notes | L: Session Notes
   ```
4. **Copy Apps Script code**: From `docs/apps-script.js`
5. **Deploy Apps Script**:
   - In Google Sheets: Extensions → Apps Script
   - Paste the code from `docs/apps-script.js`
   - Click "Deploy" → "New deployment"
   - Type: Web app
   - Execute as: Me
   - Who has access: Anyone
   - Copy the deployment URL
6. **Update HTML file**: Replace `YOUR_APPS_SCRIPT_URL_HERE` with your deployment URL

#### How It Works

- **Auto-sync**: When client clicks "Finish Session", data automatically saves to Google Sheets
- **Last session data**: Next workout loads previous performance in "Last session" fields
- **Backup exports**: CSV download and clipboard copy still available if sync fails
- **No authentication required**: Simple webhook approach, no OAuth complexity

#### Data Structure

Each row = one set of one exercise

| Date | Time | Block | Exercise | Set# | Target | Actual | Load | Notes |
|------|------|-------|----------|------|--------|--------|------|-------|
| 2025-01-15 | 14:30:00 | A | Barbell Back Squat | 1 | 5 | 5 | 185lb | Good depth |

#### Security Considerations

- **Apps Script URL**: Not a secret, but worst case is someone logs fake data
- **Sheet access**: Keep Google Sheet private (only coach has edit access)
- **No PII**: Client doesn't need Google account to use logger
- **Rate limiting**: Apps Script has built-in rate limiting (60 req/min)
- **URL rotation**: Can redeploy script to get new URL if compromised

### Future Development

See [`docs/future-improvements.md`](docs/future-improvements.md) for the full roadmap.

**Completed:** Mobile-first workout logger, block-based navigation, Google Sheets auto-sync, last session loading.

**Up Next:** Progression simplification, PR highlighting, coach dashboard.

## Deployment

This site is deployed via GitHub Pages:
- **Repository**: `teleokinetic/maiwebsite`
- **Branch**: `main`
- **Custom Domain**: `tannerholman.space` (configured via CNAME)
- **Deployment**: Automatic on push to main branch

Changes pushed to the main branch are typically live within 30 seconds.

## Local Development

No build process required. To test locally:

```bash
# Open any HTML file in your browser
open index.html
open training/index.html
open training/tanner.html
```

## Technologies

- Pure HTML/CSS/JavaScript (no frameworks or build tools)
- GitHub Pages for hosting
- File-based routing
- Mobile-first responsive design
