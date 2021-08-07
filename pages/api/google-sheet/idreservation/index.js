//import { callApiGoogleSheet } from "../../../../helpers/index";

//import { cors, runMiddleware } from "../../../../helpers/index";

import handler from "../../../../handler/index";

export default handler
  .put(async (req, res) => {
    const { reservationid } = req.query;

    const reservation = req.body;

    console.log("ORa", reservationid);
    console.log("Data !!! ", reservation);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    res.status(200).json({ body: reservation, id: reservationid });
  })
  .post((req, res) => {
    throw new Error("upss something happened! Sorry!");
  });
