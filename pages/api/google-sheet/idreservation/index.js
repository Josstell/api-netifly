//import { callApiGoogleSheet } from "../../../../helpers/index";

//import { cors, runMiddleware } from "../../../../helpers/index";

import handler from "../../../../handler/index";

export default handler
  .put(async (req, res) => {
    const { reservationid } = req.query;

    const { reservation, spreadSheetId, sheetIndex } = req.body;

    const reservationUpdate = reservation;

    console.log("ORa", reservationid);
    console.log("Data !!! ", spreadSheetId);
    console.log(sheetIndex);
    console.log(reservationUpdate);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    console.log("Hola ", options);

    // res.status(200).json({ body: reservation, id: reservationid });
    let getReservationById = [];
    try {
      console.log("Hola tryr", getReservationById);

      const { sheetGoogle } = await callApiGoogleSheet(
        spreadSheetId,
        sheetIndex
      );
      getReservationById = await sheetGoogle.filter(
        (res) => res.reservationId === reservationId
      );

      console.log(getReservationById);

      const filteredRow = (await getReservationById[0]._rowNumber) - 2;

      if (reservationUpdate.createdAt) {
        const creado = new Date(reservationUpdate.createdAt);

        sheetGoogle[filteredRow].fecha_creacion = creado.toLocaleDateString(
          "es-MX",
          options
        );
      }

      if (reservationUpdate.status) {
        sheetGoogle[filteredRow].status = await reservationUpdate.status;
      }

      await sheetGoogle[filteredRow].save();

      res.status(200).json({
        message: `Reservación ${reservationId} actualizada correntamente en google sheet`,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  })
  .post((req, res) => {
    throw new Error("upss something happened! Sorry!");
  });
