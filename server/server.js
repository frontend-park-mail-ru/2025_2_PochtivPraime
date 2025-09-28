const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

/**
 * Раздаём статику. Работа с модулями требуется для прекомпелированных шаблонов Handlebars
 */
app.use('/src', express.static(path.join(__dirname, '../src')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

/**
 * SPA: любое неизвестное обращение возвращает index.html
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});