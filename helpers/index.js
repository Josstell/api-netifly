const GoogleSpreadsheet = require('google-spreadsheet/lib/GoogleSpreadsheet')

/** **********************************************************************************************
 *
 * Google Sheet
 */

const credsEnv = process.env.NEXT_PUBLIC_GOOGLE_SHEET
const creds = JSON.parse(credsEnv)

// const { SPREADSHEET_ID } = process.env
// const { SHEET_ID } = process.env

export const callApiGoogleSheet = async (SPREADSHEET_ID, SHEET_ID) => {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID)

  await doc.useServiceAccountAuth(creds)
  await doc.loadInfo()
  const sheet = doc.sheetsById[SHEET_ID]
  const sheetGoogle = await sheet.getRows()
  return { sheetGoogle, sheet }
}
