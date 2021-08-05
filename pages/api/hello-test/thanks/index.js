export default function handler(req, res) {
  console.log("Gracias: ", req.body);
  res.status(200).json({ name: "John Rendon", body: req.body });
}
