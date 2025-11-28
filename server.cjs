const express = require("express");
const cors = require("cors");
const qrcode = require("qrcode");
const generator = require("ips-qr-code");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/api/qr", async (req, res) => {
  try {
    const { data } = req.body;

    const ipsString = await generator({
      p: data.platioc,
      s: data.svrha,
      n: data.primalac,
      sf: data.sifraPlacanja,
      i: data.iznos,
      r: data.racun,
      k: data.kod,
      v: data.verzija,
      c: data.c
    });

    const imgBuffer = await qrcode.toBuffer(ipsString, { type: "png", width: 300 });

    res.setHeader("Content-Type", "image/png");
    res.send(imgBuffer);

  } catch (err) {
    console.error("Greška:", err);
    res.status(500).send("Greška na serveru pri generisanju QR koda");
  }
});

app.listen(PORT, () => console.log(`Server radi na portu ${PORT}`));
