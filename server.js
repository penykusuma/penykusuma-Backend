const express = require('express');
const routerMhs = require('./routes/mahasiswa')
const routerMk = require('./routes/matakuliah')
const routerNilai = require('./routes/nilai')
const app = express();
const port = 4000;

app.use(express.json()); // mengambil body berupa json
app.use(routerMhs)
app.use(routerMk)
app.use(routerNilai)
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`Server berjalan pada localhost:${port}`);
});