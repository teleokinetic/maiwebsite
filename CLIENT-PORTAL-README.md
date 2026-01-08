# Client Portal - How to Use

This is a password-protected mini-course portal for your coaching clients. Each client gets their own URL with a simple password gate.

---

## Quick Start: Adding a New Client

### Step 1: Copy the template folder

1. Go to the `clients` folder in your repository
2. Copy the entire `fantin` folder
3. Rename the copy to your new client's name (lowercase, no spaces)
   - Example: `clients/sarah` or `clients/john-smith`

### Step 2: Edit 3 things in the new folder's `index.html`

Open the `index.html` file in your new client folder. Near the top (around line 20), you'll find these lines:

```html
<script>
  window.PORTAL_CLIENT_ID = 'fantin';  // Change for each client
  window.PORTAL_PASSWORD = 'welcome2025';  // Change for each client
</script>
```

**Change #1:** Replace `'fantin'` with your client's name (must match the folder name)

**Change #2:** Replace `'welcome2025'` with a password for this client

A few lines below, you'll see:

```html
<h1>Welcome, Fantin</h1>  <!-- Change name for each client -->
```

**Change #3:** Replace `Fantin` with your client's name (this is what they see)

### Step 3: Save and push to GitHub

After saving the file, push the changes to GitHub. The new client portal will be live at:
- `https://yourdomain.com/clients/clientname/`
- Example: `https://yourdomain.com/clients/sarah/`

---

## How It Works

### Password Protection
- Each client has their own password stored in their HTML file
- This is simple privacy, not military-grade security
- Enough to keep casual visitors out, not enough for sensitive data

### Progress Saving
- When clients check boxes, their progress is saved in their browser
- When they type in session logs, text is saved automatically
- Progress persists when they return (as long as they use the same browser)
- Progress is stored locally, not on a server - if they clear browser data, it's gone

### The Progress Bar
- Shows what percentage of checkboxes are complete
- Updates automatically as they work through the course

---

## Deploying to GitHub Pages

### First-Time Setup

1. **Go to your repository on GitHub**
   - Visit `github.com/yourusername/maiwebsite`

2. **Open Settings**
   - Click the "Settings" tab at the top

3. **Find Pages**
   - In the left sidebar, click "Pages"

4. **Enable GitHub Pages**
   - Under "Source", select "Deploy from a branch"
   - Under "Branch", select `main` (or your default branch)
   - Select `/ (root)` for the folder
   - Click "Save"

5. **Wait 2-5 minutes**
   - GitHub will build and deploy your site
   - You'll see a green checkmark when it's ready

6. **Find your URL**
   - Your site will be at: `https://yourusername.github.io/maiwebsite/`
   - Client portals at: `https://yourusername.github.io/maiwebsite/clients/fantin/`

---

## Connecting a Custom Domain (Optional)

If you want your portal at something like `portal.yourdomain.com`:

### Step 1: Add your domain in GitHub

1. Go to your repository Settings → Pages
2. Under "Custom domain", enter your domain (e.g., `portal.yourdomain.com`)
3. Click "Save"

### Step 2: Configure your domain provider

Add a CNAME record at your domain registrar:
- **Type:** CNAME
- **Name:** `portal` (or whatever subdomain you want)
- **Value:** `yourusername.github.io`
- **TTL:** 3600 (or default)

### Step 3: Wait for DNS propagation

This can take anywhere from 5 minutes to 48 hours. Usually it's under an hour.

### Step 4: Enable HTTPS (important!)

Once DNS is working:
1. Go back to Settings → Pages
2. Check "Enforce HTTPS"
3. Wait a few minutes for the certificate

Your clients can now access their portals at:
- `https://portal.yourdomain.com/clients/sarah/`

---

## Troubleshooting

### Client says password doesn't work
- Check for typos in the password (it's case-sensitive)
- Make sure there are no extra spaces
- Have them try in an incognito/private browser window

### Client lost their progress
- Progress is stored in the browser's localStorage
- If they cleared browser data, switched browsers, or used a different device, progress is lost
- There's no way to recover it - they'll need to re-check boxes

### Changes aren't showing up
- After pushing to GitHub, wait 2-5 minutes for deployment
- Have the client do a hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Try opening in incognito mode to bypass cache

### How to reset a client's access
If you need to give a client a fresh start:
1. Change their `PORTAL_CLIENT_ID` to something new (e.g., `sarah-v2`)
2. This creates a fresh localStorage namespace
3. Give them the same URL - their old progress won't carry over

---

## File Structure Reference

```
maiwebsite/
├── index.html          ← Your main website (unchanged)
├── CNAME               ← Custom domain config
├── css/
│   └── portal.css      ← Styling for all client portals
├── js/
│   └── portal.js       ← Password gate & progress saving
├── clients/
│   ├── fantin/
│   │   └── index.html  ← Fantin's portal (template)
│   ├── sarah/
│   │   └── index.html  ← Sarah's portal (example)
│   └── [new-client]/
│       └── index.html  ← Copy template, change 3 things
└── CLIENT-PORTAL-README.md  ← This file
```

---

## Advanced: Customizing the Design

If you want to change colors, fonts, or spacing:

1. Open `css/portal.css`
2. At the top, you'll find CSS variables:

```css
:root {
  --color-bg: #faf9f7;           /* Page background */
  --color-surface: #ffffff;       /* Card backgrounds */
  --color-text: #2d3436;          /* Main text */
  --color-text-muted: #636e72;    /* Secondary text */
  --color-accent: #6b8e7b;        /* Green accent color */
  --color-accent-light: #e8f0eb;  /* Light green */
  --color-border: #e0ddd8;        /* Borders */
  ...
}
```

Change these values to adjust the entire site's look.

---

## Questions?

If you run into issues:
1. Check the Troubleshooting section above
2. Make sure all file names are lowercase with no spaces
3. Verify the folder structure matches the reference above

The most common issues are typos in client IDs/passwords and waiting for GitHub Pages to deploy changes.
