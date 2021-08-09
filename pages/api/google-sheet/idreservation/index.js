import { callApiGoogleSheet } from "../../../../helpers/index";

//import { cors, runMiddleware } from "../../../../helpers/index";

import handler from "../../../../handler/index";

export default handler
  .put(async (req, res) => {
    const { reservationid } = req.query;

    const {
      reservation,
      NEXT_PUBLIC_SPREADSHEET_ID_MARIACHON,
      NEXT_PUBLIC_SHEET_ID,
    } = req.body;

    const reservationUpdate = reservation;

    console.log("ORa", reservationid);

    if (req.userName === "Juan Tellez") {
      console.log("Hola tryr :", req.userId);
      try {
        console.log("Hola tryr :", req.userId);
        const { sheetGoogle } = await callApiGoogleSheet(
          NEXT_PUBLIC_SPREADSHEET_ID_MARIACHON,
          NEXT_PUBLIC_SHEET_ID
        );

        const getReservationById = await sheetGoogle.filter(
          (res) => res.reservationId === reservationid
        );

        const filteredRow = (await getReservationById[0]._rowNumber) - 2;

        if (reservationUpdate.status) {
          sheetGoogle[filteredRow].status = await reservationUpdate.status;
        }

        await sheetGoogle[filteredRow].save();

        res.status(200).json({
          message: `Reservación ${reservationid} actualizada correntamente en google sheet`,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(201).json({
        message: "Usted no tiene autorización de hacer esta operación.",
      });
    }
  })
  .post((req, res) => {
    throw new Error("upss something happened! Sorry!");
  });
