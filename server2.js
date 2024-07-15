const express = require('express');
const routerMhs = require('./routes/mahasiswa')
const routerMk = require('./routes/matakuliah')
const routerNilai = require('./routes/nilai')
const routerUser = require('./routes/user');
const app = express();
const port = 4000;
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

app.use(routerMhs)
app.use(routerMk)
app.use(routerNilai)
app.use(routerUser)



app.listen(port, () => {
    console.log(`Server berjalan pada localhost:${port}`);
});