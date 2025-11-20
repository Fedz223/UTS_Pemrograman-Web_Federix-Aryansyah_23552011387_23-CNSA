const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

let rawData = fs.readFileSync("db.json");
let database = JSON.parse(rawData);


app.get("/informasi", (req, res) => {
  res.json(database.informasi);
});


app.get("/informasi/:id", (req, res) => {
  const id = req.params.id; 
  const item = database.informasi.find((i) => i.id === id);

  if (!item) return res.status(404).json({ message: "Data tidak ditemukan" });

  res.json(item);
});


app.post("/informasi", (req, res) => {
  const newItem = {
    id: Date.now().toString(), 
    judul: req.body.judul,
    detail: req.body.detail
  };

  database.informasi.push(newItem);
  fs.writeFileSync("db.json", JSON.stringify(database, null, 2));

  res.json({ message: "Data berhasil ditambah", data: newItem });
});


app.put("/informasi/:id", (req, res) => {
  const id = req.params.id;
  const item = database.informasi.find((i) => i.id === id);

  if (!item) return res.status(404).json({ message: "Data tidak ditemukan" });

  item.judul = req.body.judul;
  item.detail = req.body.detail;

  fs.writeFileSync("db.json", JSON.stringify(database, null, 2));

  res.json({ message: "Data berhasil diupdate", data: item });
});


app.delete("/informasi/:id", (req, res) => {
  const id = req.params.id;

  database.informasi = database.informasi.filter((i) => i.id !== id);

  fs.writeFileSync("db.json", JSON.stringify(database, null, 2));

  res.json({ message: "Data berhasil dihapus" });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
