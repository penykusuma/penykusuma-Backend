const express = require('express');
const app = express();
const port = 5000;
const routerMahasiswa = require('./routes/mahasiswa')

//untuk menerima req body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routerMahasiswa)

const mongoose = require('mongoose')
require('dotenv').config();
mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser : true,
        useUnifiedTopology : true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("sukses terkoneksi dengan mongodb")
});

app.listen(port, () => {
    console.log(`server berjalan pada port ${port}`);
})