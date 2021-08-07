const GoogleSpreadsheet = require("google-spreadsheet/lib/GoogleSpreadsheet");

import Cors from "cors";

// Initializing the cors middleware
export const cors = Cors({
  methods: ["GET", "PUT", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

/** **********************************************************************************************
 *
 * Google Sheet
 */

const credsEnv = process.env.NEXT_PUBLIC_GOOGLE_SHEET;
const creds = JSON.parse(credsEnv);

// const { SPREADSHEET_ID } = process.env
// const { SHEET_ID } = process.env

export const callApiGoogleSheet = async (SPREADSHEET_ID, SHEET_ID) => {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsById[SHEET_ID];
  const sheetGoogle = await sheet.getRows();
  return { sheetGoogle, sheet };
};
