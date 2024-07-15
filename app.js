const express = require('express');
const app = express();
const session = require('express-session')
const mysql = require('mysql2')
const port = 4000;

app.use(express.json())
//app.use(express.urlencoded({ extended: true }))

//koneksi kedatabase
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'backend'
});
connection.connect(error => {
    if (error) throw error;
    console.log('Terhubung ke database')
})

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     expires: 60000
    // }
}));

//middleware untuk auntentikasi
const authenticate = (req, res, next) => {
    //iff (req.session && req.session.isAunthenticated) 
    if ( req?.session.isAunthenticated) {
        //pengguna sudah terauntentikasi
        next();
    } else {
        // pengguna belum terauntentikasi
        res.status(401).send('Tidak Terauntentikasi')
    }
};

// register
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    connection.query(`INSERT INTO user (username, password) VALUES ('${username}',PASSWORD('${password}'))`,
        (error, results) => {
            if (error) throw error;
            res.json({ message: 'Data berhasil ditambahkan', id: results.insertId});
        });
});

//route login
app.post('/login', (req, res) => {
    const { username, password } = req.body

    connection.promise().query(`SELECT * FROM user WHERE username = '${username}'
                                AND password = PASSWORD('${password}')`)
        .then((results) => {
            if (results.length > 0 ) {
                req.session.isAuthenticated = true;
                res.json({ message: 'Berhasil Login'})
            } else {
                res.status(401).send('username atau password salah')
            }
        })
    // if (username === 'admin' && password === 'password') {
    //     req.session.isAuthenticated = true;
    //     res.send('Login Sukses');
    // } else {
    //     res.status(401).send('Kredensial Tidak Valid');
    // }
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

app.get('/open', (req, res) => {
    res.send('Anda masuk pada route terproteksi')
}) 

app.get('/protected', authenticate, (req, res) => {
    res.send('anda masuk pada route terprokteksi(GET)')
})

// // Route POST yang membutuhkan autentikasi
// app.post('/protected', authenticate, (req, res) => {
//     res.send('Route terprokteksi (POST)')
// });

// // Route PUT yang membutuhkan autentikasi
// app.put('/protected', authenticate, (req, res) => {
//     res.send('Route terprokteksi (PUT)')
// });

// // Route DELETE yang membutuhkan autentikasi
// app.delete('/protected', authenticate, (req, res) => {
//     res.send('Route terprokteksi (DELETE)')
// });

app.listen(port, () => {
    console.log(`server berjalan pada port ${port}`);
});