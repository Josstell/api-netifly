import { callApiGoogleSheet } from "../../../../helpers/index";

import handler from "../../../../handler/index";

export default handler
  .post(async (req, res) => {
    const {
      reservation,
      NEXT_PUBLIC_SPREADSHEET_ID_MARIACHON,
      NEXT_PUBLIC_SHEET_ID,
    } = req.body;

    const reservationUpdate = reservation;

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const date = new Date(reservationUpdate.date);
    const creado = new Date(reservationUpdate.createdAt);
    if (req.userName === "Juan Tellez") {
      try {
        const { sheet } = await callApiGoogleSheet(
          NEXT_PUBLIC_SPREADSHEET_ID_MARIACHON,
          NEXT_PUBLIC_SHEET_ID
        );

        const reservationDetails = {
          fecha_creacion: creado.toLocaleDateString("es-MX", options),
          reservationId: reservationUpdate.reservationId,
          fecha_y_hora: `${date.toLocaleDateString(
            "es-MX",
            options
          )} ,  ${date.toLocaleTimeString()}`,
          mariachi: reservationUpdate.mariachi,
          direccion: reservationUpdate.address,
          cliente: reservationUpdate.client,
          tel: reservationUpdate.phone,
          email: reservationUpdate.email,
          servicio: reservationUpdate.service,
          cantidad: reservationUpdate.qty,
          precio: reservationUpdate.price * reservationUpdate.qty,
          deposito: reservationUpdate.deposit,
          mensaje: reservationUpdate.message,
          coordinador: reservationUpdate.coodinator,
          status: reservationUpdate.status,
        };

        await sheet.addRow(reservationDetails);
        res.status(200).json({
          message: `Reservación ${reservationDetails.reservationId} agregada correntamente en google sheet`,
        });
      } catch (err) {
        res.status(400).json({
          error: err.message,
        });
      }
    } else {
      res.status(201).json({
        message: "Usted no tiene autorización de hacer esta operación .",
        name: req.userName,
        userId: req.userId,
      });
    }
  })
  .put((req, res) => {
    throw new Error("upss something happened! Sorry!");
  })
  .get((req, res) => {
    throw new Error("upss something happened! Sorry!");
  });
