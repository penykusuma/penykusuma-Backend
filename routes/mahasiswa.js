const express = require('express');
const routerMhs = express.Router();
const ctrMhs = require('../controller/mahasiswa')
const ctrUser = require('../controller/user')

// endpoint untuk mahasiswa
routerMhs.get('/mahasiswa',ctrUser.authenticate, ctrMhs.getMhs);
routerMhs.get('/mahasiswa/:nim',ctrUser.authenticate, ctrMhs.getbynim );
routerMhs.post('/mahasiswa',ctrUser.authenticate, ctrMhs.postbyMhs);
routerMhs.put('/mahasiswa/:nim',ctrUser.authenticate, ctrMhs.putbynim);
routerMhs.delete('/mahasiswa/:nim',ctrUser.authenticate, ctrMhs.deletebynim);

module.exports = routerMhs