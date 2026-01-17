/**
 * Google Apps Script for Movement Coaching - Session Data Logging
 *
 * This script receives workout session data from the workout logger application
 * and appends it to a Google Sheet for tracking and analysis.
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet named "Movement Coaching - Session Data"
 * 2. Create a sheet/tab for each client (e.g., "Tanner")
 * 3. Add column headers in row 1:
 *    A: Date | B: Timestamp | C: Block ID | D: Block Name | E: Exercise ID
 *    F: Exercise Name | G: Set Number | H: Target Reps | I: Actual Reps
 *    J: Load | K: Notes | L: Session Notes
 * 4. Go to Extensions → Apps Script
 * 5. Paste this code into the script editor
 * 6. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7. Copy the deployment URL and add it to your workout logger HTML
 */

/**
 * Handles POST requests from the workout logger
 * Appends workout data to the appropriate client's sheet
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(data.clientName);

    if (!sheet) {
      return createResponse({
        success: false,
        error: `Client sheet "${data.clientName}" not found`
      });
    }

    // Append each exercise set as a row
    let rowsAdded = 0;
    data.exercises.forEach(exercise => {
      exercise.sets.forEach(set => {
        sheet.appendRow([
          data.date,
          data.timestamp,
          exercise.blockId,
          exercise.blockName,
          exercise.exerciseId,
          exercise.exerciseName,
          set.setNumber,
          set.targetReps,
          set.actualReps,
          set.load,
          exercise.notes || '',
          data.sessionNotes || ''
        ]);
        rowsAdded++;
      });
    });

    return createResponse({
      success: true,
      rowsAdded: rowsAdded,
      message: `Successfully logged ${rowsAdded} sets`
    });
  } catch (error) {
    return createResponse({
      success: false,
      error: error.toString()
    });
  }
}

/**
 * Handles GET requests for fetching previous workout data
 * Returns the most recent session data for a specific exercise
 */
function doGet(e) {
  try {
    const clientName = e.parameter.client;
    const exerciseId = e.parameter.exerciseId;

    if (!clientName || !exerciseId) {
      return createResponse({
        success: false,
        error: 'Missing required parameters: client and exerciseId'
      });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(clientName);
    if (!sheet) {
      return createResponse({
        success: false,
        error: `Client sheet "${clientName}" not found`
      });
    }

    // Get all data from the sheet
    const data = sheet.getDataRange().getValues();

    if (data.length <= 1) {
      // Only headers, no data
      return createResponse({
        success: true,
        hasData: false
      });
    }

    // Skip header row and filter for this exercise
    const exerciseData = data
      .slice(1)
      .filter(row => row[4] === exerciseId) // Column E: Exercise ID
      .sort((a, b) => {
        // Sort by date (column A) descending
        const dateA = new Date(a[0]);
        const dateB = new Date(b[0]);
        return dateB - dateA;
      });

    if (exerciseData.length === 0) {
      return createResponse({
        success: true,
        hasData: false
      });
    }

    // Get most recent date's data
    const mostRecentDate = exerciseData[0][0];
    const lastSession = exerciseData.filter(row => {
      const rowDate = new Date(row[0]);
      const recentDate = new Date(mostRecentDate);
      return rowDate.toDateString() === recentDate.toDateString();
    });

    return createResponse({
      success: true,
      hasData: true,
      date: mostRecentDate,
      sets: lastSession.map(row => ({
        setNumber: row[6],    // Column G: Set Number
        actualReps: row[8],   // Column I: Actual Reps
        load: row[9]          // Column J: Load
      }))
    });
  } catch (error) {
    return createResponse({
      success: false,
      error: error.toString()
    });
  }
}

/**
 * Helper function to create properly formatted JSON responses
 */
function createResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Optional: Function to initialize a new client sheet with proper headers
 * Run this manually from the Apps Script editor when adding a new client
 */
function createClientSheet(clientName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(clientName);

  if (sheet) {
    throw new Error(`Sheet "${clientName}" already exists`);
  }

  const newSheet = ss.insertSheet(clientName);
  newSheet.appendRow([
    'Date',
    'Timestamp',
    'Block ID',
    'Block Name',
    'Exercise ID',
    'Exercise Name',
    'Set Number',
    'Target Reps',
    'Actual Reps',
    'Load',
    'Notes',
    'Session Notes'
  ]);

  // Format header row
  const headerRange = newSheet.getRange(1, 1, 1, 12);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4CAF50');
  headerRange.setFontColor('#FFFFFF');

  // Freeze header row
  newSheet.setFrozenRows(1);

  // Auto-resize columns
  for (let i = 1; i <= 12; i++) {
    newSheet.autoResizeColumn(i);
  }

  Logger.log(`Created new client sheet: ${clientName}`);
}
