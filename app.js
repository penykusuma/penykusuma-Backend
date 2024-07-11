const express = require('express');
const app = express();
const session = require('express-session')
const port = 4000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000
    }
}));

//middleware untuk autentikasi
const authenticate = (req, res, next) => {
    if (req?.session.isAuthenticated) {
        next();
    } else {
        res.status(401).send('Tidak Terautentikasi')
    }
};

//route login
app.post('/login', (req, res) => {
    const { username, password } = req.body
    if (username === 'admin' && password === 'password') {
        req.session.isAuthenticated = true;
        res.send('Login Sukses');
    } else {
        res.status(401).send('Kredensial Tidak Valid');
    }
});

// route logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('logout')
        }
    });
});

app.get('/protected', authenticate, (req, res) => {
    res.send('anda masuk pada route terprokteksi(GET)')
})

// Route POST yang membutuhkan autentikasi
app.post('/protected', authenticate, (req, res) => {
    res.send('Route terprokteksi (POST)')
});

// Route PUT yang membutuhkan autentikasi
app.put('/protected', authenticate, (req, res) => {
    res.send('Route terprokteksi (PUT)')
});

// Route DELETE yang membutuhkan autentikasi
app.delete('/protected', authenticate, (req, res) => {
    res.send('Route terprokteksi (DELETE)')
});

app.listen(port, () => {
    console.log(`server berjalan pada port ${port}`);
});