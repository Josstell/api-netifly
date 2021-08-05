import { callApiGoogleSheet } from '../../../../helpers/index'

const { SPREADSHEET_ID_MARIACHON, SHEET_ID } = process.env

const handlerGoogle = async (req, res) => {
  const {
    query: { reservationId },
  } = req

  if (req.method !== 'PUT') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  const reservation = req.body

  console.log('ORa', reservationId)
  console.log('Data !!! ', reservation)

  const reservationUpdate = reservation

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  if (req.method === 'PUT') {
    let getReservationById = []
    try {
      const { sheetGoogle } = await callApiGoogleSheet(
        SPREADSHEET_ID_MARIACHON,
        SHEET_ID
      )
      getReservationById = await sheetGoogle.filter(
        (reser) => reser.reservationId === reservationId
      )

      const filteredRow = (await getReservationById[0]._rowNumber) - 2

      if (reservationUpdate.createdAt) {
        const creado = new Date(reservationUpdate.createdAt)

        sheetGoogle[filteredRow].fecha_creacion = creado.toLocaleDateString(
          'es-MX',
          options
        )
      }

      if (reservationUpdate.reservationId) {
        sheetGoogle[filteredRow].reservationId =
          await reservationUpdate.reservationId
      }

      if (reservationUpdate.date) {
        const date = new Date(reservationUpdate.date)

        sheetGoogle[filteredRow].fecha_y_hora = `${date.toLocaleDateString(
          'es-MX',
          options
        )} , ${date.toLocaleTimeString()}`
      }

      if (reservationUpdate.mariachiData.nameMariachi) {
        sheetGoogle[filteredRow].mariachi = await reservationUpdate.mariachiData
          .nameMariachi
      }

      if (reservationUpdate.address) {
        sheetGoogle[filteredRow].direccion = await reservationUpdate.address
      }

      if (reservationUpdate.client.nameClient) {
        sheetGoogle[filteredRow].cliente = await reservationUpdate.client
          .nameClient
      }

      if (reservationUpdate.client.phone) {
        sheetGoogle[filteredRow].tel = await reservationUpdate.client.phone
      }

      if (reservationUpdate.client.email) {
        sheetGoogle[filteredRow].email = await reservationUpdate.client.email
      }

      if (reservationUpdate.service) {
        sheetGoogle[filteredRow].servicio = await reservationUpdate.service
      }

      if (reservationUpdate.qty) {
        sheetGoogle[filteredRow].cantidad = await reservationUpdate.qty
      }

      if (reservationUpdate.price) {
        sheetGoogle[filteredRow].precio = await (reservationUpdate.price *
          reservationUpdate.qty)
      }

      if (reservationUpdate.deposit) {
        sheetGoogle[filteredRow].deposito = await reservationUpdate.deposit
      }

      if (reservationUpdate.message) {
        sheetGoogle[filteredRow].mensaje = await reservationUpdate.message
      }

      if (reservationUpdate.playlist) {
        sheetGoogle[filteredRow].Lista_de_canciones =
          await reservationUpdate.playlist
      }

      if (reservationUpdate.status) {
        sheetGoogle[filteredRow].status = await reservationUpdate.status
      }

      if (reservationUpdate.coordinatorData.userName) {
        sheetGoogle[filteredRow].coordinator = await reservationUpdate
          .coordinatorData.userName
      }
      await sheetGoogle[filteredRow].save()

      res.status(200).json({
        message: `Reservación ${reservationId} actualizada correntamente en google sheet`,
      })
    } catch (err) {
      res.status(400).json({
        error: err.message,
      })
    }
  }
}

module.exports = handlerGoogle
