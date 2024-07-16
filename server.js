const express = require('express');
const Samsung = require('samsung-tv-control').default;
const app = express();
const port = 3000;

const config = {
  debug: true,
  ip: 'Endereço IP', // Insira o Endereço IP da TV Samsung
  mac: 'Endereço MAC', // Insira o Endereço MAC da TV Samsung
  nameApp: 'NodeJS',
  port: 8001, // Porta para comunicação com a TV
  token: '0000', // Token de autenticação, se necessário
};

const control = new Samsung(config);

app.use(express.static('public'));

app.get('/control/:key', (req, res) => {
  try {
    const key = req.params.key.toUpperCase(); // Captura o parâmetro :key e converte para maiúsculas
    control.sendKey(key); // Envia a tecla para a TV Samsung de forma síncrona
    res.send(`Sent key ${key}`);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`); // Tratamento de erro para enviar mensagem de erro 500
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
