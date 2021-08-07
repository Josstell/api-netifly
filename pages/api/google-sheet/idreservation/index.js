//import { callApiGoogleSheet } from "../../../../helpers/index";

//import { cors, runMiddleware } from "../../../../helpers/index";

import handler from "../../../../handler/index";

export default handler
  .put(async (req, res) => {
    const { reservationid } = req.query;
    const reservationId = reservationid;

    const reservation = req.body;

    console.log("ORa", reservationid);
    console.log("Data !!! ", reservation);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    // res.status(200).json({ body: reservation, id: reservationid });
    let getReservationById = [];
    try {
      const { sheetGoogle } = await callApiGoogleSheet();
      getReservationById = await sheetGoogle.filter(
        (res) => res.reservationId === reservationId
      );

      const filteredRow = (await getReservationById[0]._rowNumber) - 2;

      if (reservationUpdate.createdAt) {
        const creado = new Date(reservationUpdate.createdAt);

        sheetGoogle[filteredRow].fecha_creacion = creado.toLocaleDateString(
          "es-MX",
          options
        );
      }

      if (reservationUpdate.reservationId) {
        sheetGoogle[filteredRow].reservationId =
          await reservationUpdate.reservationId;
      }

      if (reservationUpdate.date) {
        const date = new Date(reservationUpdate.date);

        sheetGoogle[filteredRow].fecha_y_hora =
          date.toLocaleDateString("es-MX", options) +
          ", " +
          date.toLocaleTimeString();
      }

      if (reservationUpdate.mariachiData.nameMariachi) {
        sheetGoogle[filteredRow].mariachi = await reservationUpdate.mariachiData
          .nameMariachi;
      }

      if (reservationUpdate.address) {
        sheetGoogle[filteredRow].direccion = await reservationUpdate.address;
      }

      if (reservationUpdate.client.nameClient) {
        sheetGoogle[filteredRow].cliente = await reservationUpdate.client
          .nameClient;
      }

      if (reservationUpdate.client.phone) {
        sheetGoogle[filteredRow].tel = await reservationUpdate.client.phone;
      }

      if (reservationUpdate.client.email) {
        sheetGoogle[filteredRow].email = await reservationUpdate.client.email;
      }

      if (reservationUpdate.service) {
        sheetGoogle[filteredRow].servicio = await reservationUpdate.service;
      }

      if (reservationUpdate.qty) {
        sheetGoogle[filteredRow].cantidad = await reservationUpdate.qty;
      }

      if (reservationUpdate.price) {
        sheetGoogle[filteredRow].precio = await (reservationUpdate.price *
          reservationUpdate.qty);
      }

      if (reservationUpdate.deposit) {
        sheetGoogle[filteredRow].deposito = await reservationUpdate.deposit;
      }

      if (reservationUpdate.message) {
        sheetGoogle[filteredRow].mensaje = await reservationUpdate.message;
      }

      if (reservationUpdate.playlist) {
        sheetGoogle[filteredRow].Lista_de_canciones =
          await reservationUpdate.playlist;
      }

      if (reservationUpdate.status) {
        sheetGoogle[filteredRow].status = await reservationUpdate.status;
      }

      if (reservationUpdate.coordinatorData.userName) {
        sheetGoogle[filteredRow].coordinator = await reservationUpdate
          .coordinatorData.userName;
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
