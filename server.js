const express = require('express');
const connection = require("mysql");
const routerMhs = require('./routes/mahasiswa');
const routerMk = require('./routes/matakuliah')
const app = express();
const port = 4000;

// untuk menerima req.body
app.use(express.json());
app.use (routerMhs);
app.use (routerMk)
app.use(express.urlencoded({ extended: true }));






app.listen(port, () => {
    console.log(`server berjalan pada localhost:${port}`);
});
