import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/qr', async (req, res) => {
  try {
    const { data } = req.body;

    const response = await fetch('https://nbs.rs/QRcode/api/qr/v1/gen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'image/png'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      return res.status(response.status).send('Greška kod NBS API-a');
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);

  } catch (err) {
    console.error(err);
    res.status(500).send('Greška na serveru');
  }
});

app.listen(PORT, () => console.log(`Server radi na portu ${PORT}`));
