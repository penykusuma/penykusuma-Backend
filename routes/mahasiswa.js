const express = require('express');
const routerMhs = express.Router();
const ctrMhs = require('../controller/mahasiswa')

// endpoint untuk mahasiswa
routerMhs.get('/mahasiswa', ctrMhs.getMhs);
routerMhs.get('/mahasiswa/:nim', ctrMhs.getbynim );
routerMhs.post('/mahasiswa', ctrMhs.postbyMhs);
routerMhs.put('/mahasiswa/:nim', ctrMhs.putbynim);
routerMhs.delete('/mahasiswa/:nim', ctrMhs.deletebynim);

module.exports = routerMhs