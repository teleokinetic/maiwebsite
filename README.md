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

### Data Recording

The workout logger automatically syncs to Google Sheets for tracking and analysis.

**Setup**: See [Google Sheets Integration Guide](docs/google-sheets-setup.md) for step-by-step setup.

**How it works**: When client clicks "Finish Session", data saves automatically. Next session loads previous performance for comparison. CSV and clipboard exports are available as backup.

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

## Automated Documentation Sync

Docs are automatically backed up to GitHub every 30 minutes via cron job.

- **Script**: `.github/scripts/auto-sync-docs.sh`
- **Logs**: `.github/logs/auto-sync.log`
- **Check status**: `tail -20 .github/logs/auto-sync.log`
- **Force sync**: `bash .github/scripts/auto-sync-docs.sh`

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
