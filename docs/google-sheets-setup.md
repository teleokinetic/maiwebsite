# Google Sheets Integration Setup Guide

This guide walks you through setting up automatic workout data syncing to Google Sheets.

## Overview

When a client completes their workout, data automatically syncs to a Google Sheet where you can:
- Track performance trends over time
- See progression patterns
- Identify when clients are ready to advance
- Review notes and observations

## Prerequisites

- Google account
- Access to Google Sheets and Google Apps Script

## Step-by-Step Setup

### Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: **"Movement Coaching - Session Data"**
4. Keep this sheet open - you'll use it in the next steps

### Step 2: Set Up Client Sheet

For each client, create a dedicated sheet/tab:

1. At the bottom of the Google Sheet, click the **+** button to add a new sheet
2. Rename it to match your client's name (e.g., "Tanner")
   - **Important**: This name must match exactly what's in the HTML file
3. In row 1, add these column headers:

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Date | Timestamp | Block ID | Block Name | Exercise ID | Exercise Name | Set Number | Target Reps | Actual Reps | Load | Notes | Session Notes |

4. (Optional) Format the header row:
   - Select row 1
   - Make it bold
   - Add a background color
   - Freeze the row (View → Freeze → 1 row)

### Step 3: Deploy the Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any default code in the editor
3. Open the file `docs/apps-script.js` from this repository
4. Copy all the code
5. Paste it into the Apps Script editor
6. Click the **💾 Save** icon (or Ctrl/Cmd + S)
7. Name the project: "Workout Logger Webhook"

### Step 4: Deploy as Web App

1. In the Apps Script editor, click **Deploy → New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "Workout data webhook"
   - **Execute as**: Me (your-email@gmail.com)
   - **Who has access**: Anyone
5. Click **Deploy**
6. You may need to authorize the script:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to Workout Logger Webhook (unsafe)"
   - Click "Allow"
7. **Copy the Web app URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```
8. Click **Done**

### Step 5: Update the HTML File

1. Open `training/tanner.html` (or your client's HTML file)
2. Find this line near the top of the `<script>` section:
   ```javascript
   const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_APPS_SCRIPT_URL_HERE` with your actual deployment URL:
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz.../exec';
   ```
4. Verify the `CLIENT_NAME` matches your sheet name:
   ```javascript
   const CLIENT_NAME = 'Tanner'; // Must match sheet name exactly
   ```
5. Save the file

### Step 6: Test the Integration

1. **Deploy** your changes to GitHub (if using GitHub Pages)
2. **Open** the workout logger in a browser (on phone is best)
3. **Start a session** and log a simple workout:
   - Fill in reps and load for 1-2 exercises
   - Click through to "Finish Session"
4. **Check Google Sheets**:
   - Go back to your Google Sheet
   - Look at the client's sheet (e.g., "Tanner")
   - You should see new rows with the workout data
5. **Test last session data**:
   - Refresh the workout logger page
   - Start a new session
   - Each exercise should show "Last session" data from Google Sheets

## Troubleshooting

### "Client sheet not found" error

**Problem**: The script can't find the sheet for your client.

**Solution**:
- Check that the sheet name in Google Sheets matches `CLIENT_NAME` exactly
- Sheet names are case-sensitive: "Tanner" ≠ "tanner"
- Check for extra spaces in the sheet name

### Last session shows "No previous data" when data exists

**Problem**: The GET request isn't returning data.

**Solutions**:
- Verify you deployed the script as a "Web app" (not just saved it)
- Check that the Exercise ID in the HTML matches what's in column E of your sheet
- Open the Apps Script editor → Executions tab to see error logs
- Make sure "Who has access" is set to "Anyone"

### Data not syncing automatically

**Problem**: Clicking "Finish Session" doesn't save to Google Sheets.

**Solutions**:
- Check browser console (F12 → Console tab) for errors
- Verify `APPS_SCRIPT_URL` is set correctly (not 'YOUR_APPS_SCRIPT_URL_HERE')
- Check that the URL ends with `/exec` (not `/dev`)
- Test if the Apps Script URL is accessible in a new browser tab

### "Authorization required" when deploying

**Problem**: Google needs to verify you approve the script.

**Solution**:
- This is normal for first-time deployment
- Click "Advanced" → "Go to [project name] (unsafe)"
- This is safe because you wrote the script yourself
- Click "Allow" to grant permissions

### Need to update the script

If you need to make changes to the Apps Script code:

1. Make your edits in the Apps Script editor
2. Click **💾 Save**
3. Click **Deploy → Manage deployments**
4. Click the pencil icon ✏️ next to your web app deployment
5. Under "Version", select "New version"
6. Click **Deploy**
7. You'll get the same URL (no need to update HTML)

## Security Notes

### Is the Apps Script URL a secret?

**No.** The URL will be visible in browser network requests. This is acceptable because:
- Worst case: Someone logs fake workout data to your sheet
- The script only appends data (doesn't delete or modify)
- Your Google Sheet is still private (only you can view it)
- Apps Script has rate limiting to prevent abuse

### Can clients see my Google Sheet?

**No.** The Apps Script acts as a middleman:
- Clients send data to the script
- Script writes to your sheet
- Clients never access the sheet directly
- Your sheet remains private to you

### What if someone abuses the URL?

If you discover the URL is being abused:
1. Go to Apps Script editor
2. Deploy → Manage deployments
3. Click the archive icon 🗄️ next to the deployment
4. Create a new deployment (you'll get a new URL)
5. Update the HTML file with the new URL

## Adding Additional Clients

To add a new client:

1. **In Google Sheets**:
   - Add a new sheet/tab
   - Name it with the client's name
   - Add the same column headers from Step 2

2. **In your website**:
   - Copy `training/tanner.html` to `training/newclient.html`
   - Update `CLIENT_NAME` to match the sheet name
   - Keep the same `APPS_SCRIPT_URL`

The same Apps Script handles all clients - just make sure the sheet names match!

## Optional: Using the Helper Function

The Apps Script includes a helper function to automatically create properly formatted client sheets:

1. Open the Apps Script editor
2. Find the `createClientSheet` function at the bottom
3. Click on the function name
4. Click the **▶️ Run** button
5. When prompted, enter the client's name
6. A new sheet will be created with proper headers and formatting

## Data Structure Reference

Each row in the Google Sheet represents **one set** of an exercise:

| Column | Description | Example |
|--------|-------------|---------|
| A - Date | Date of workout | 2025-01-15 |
| B - Timestamp | Time workout completed | 14:30:00 |
| C - Block ID | Program block identifier | A |
| D - Block Name | Block description | Squat |
| E - Exercise ID | Unique exercise identifier | barbell-back-squat |
| F - Exercise Name | Display name | Barbell Back Squat |
| G - Set Number | Which set (1, 2, 3...) | 1 |
| H - Target Reps | Prescribed reps | 5 |
| I - Actual Reps | Reps performed | 5 |
| J - Load | Weight/resistance | 185lb |
| K - Notes | Exercise-specific notes | Good depth today |
| L - Session Notes | Overall session notes | |

## Next Steps

Once your data is flowing into Google Sheets:
- Use built-in Sheets features to create charts and trends
- Set up conditional formatting to highlight PRs
- Create formulas to calculate total volume
- Export data for deeper analysis

Future versions will include automated coaching dashboards and progression tracking!
