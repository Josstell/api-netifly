import { callApiGoogleSheet } from "../../../../helpers/index";

const { SPREADSHEET_ID_MARIACHON, SHEET_ID } = process.env;

const handlerGoogle = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed" });
  }

  const { reservation, spreadSheetId, sheetIndex } = req.body;

  const reservationUpdate = reservation;

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(reservationUpdate.date);
  const creado = new Date(reservationUpdate.createdAt);

  if (req.method === "POST") {
    try {
      const { sheet } = await callApiGoogleSheet(
        SPREADSHEET_ID_MARIACHON,
        SHEET_ID
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
  }
};

module.exports = handlerGoogle;
