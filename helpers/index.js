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

//const { NEXT_PUBLIC_SPREADSHEET_ID_MARIACHON } = process.env;
//const { NEXT_PUBLIC_SHEET_ID } = process.env;

export const callApiGoogleSheet = async (
  NEXT_PUBLIC_SPREADSHEET_ID_MARIACHON,
  NEXT_PUBLIC_SHEET_ID
) => {
  const doc = new GoogleSpreadsheet(NEXT_PUBLIC_SPREADSHEET_ID_MARIACHON);

  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsById[NEXT_PUBLIC_SHEET_ID];
  const sheetGoogle = await sheet.getRows();
  return { sheetGoogle, sheet };
};
