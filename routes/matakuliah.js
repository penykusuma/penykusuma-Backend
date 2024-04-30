const express = require('express');
const routerMk = express.Router();
const connection = require('../db/db');

// endpoint untuk matakuliah
routerMk.get('/matakuliah', (req, res) => {
    connection.query("SELECT * FROM matakuliah", (err, data) => {
        if (err) {
            console.log("error: ", err);
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat mengambil data mahasiswa"
            });
        } else {
            res.send(data);
        };
    });
});

routerMk.get('/matakuliah/:kodemk', (req, res) => {
    const kodemk = req.params.kodemk;
    connection.query(`SELECT * FROM matakuliah WHERE kodemk= '${kodemk}'`, (err, data) => {
        if (err) {
            console.log("error: ", err);
            res.status(500).send({
                message: err.message || "Terjadi kesalahan saat mengambil data matakuliah"
            });
        } else {
            res.send(data);
        }
    });
});

routerMk.post('/matakuliah', (req, res) => {
    const matakuliahbaru = req.body;
    connection.query("INSERT INTO matakuliah SET ?", matakuliahbaru, (err) => {
        if (err) {
            console.log("error: ", err);
            res.status(500).send({
                message: err.message || "terjadi kesalahan saat menyimpan data matakuliah"
            });
        } else {
            res.send(matakuliahbaru);
        }
    });
});

routerMk.put('/matakuliah/:kodemk', (req, res) => {
    const kodemk = req.params.kodemk;
    const Mk = req.body;
    const qstring = `UPDATE matakuliah
                    SET matakuliah = '${Mk.matakuliah}', sks = '${Mk.sks}', semester = '${Mk.semester}'
                    WHERE kodemk = '${kodemk}'`;
    connection.query(qstring, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "error update mahasiswa dengan kodemk" + kodemk
            });
        } else if (data.affectedRows === 0) {
            res.status(404).send({
                message: `matakuliah dengan kodemk ${kodemk} tidak ditemukan`
            });
        } else {
            console.log("update matakuliah: ", { kodemk: kodemk, ...Mk });
            res.send({ message: `Data matakuliah dengan kodemk ${kodemk} berhasil diupdate` });
        }
    });
});

routerMk.delete('/matakuliah/:kodemk', (req, res) => {
    const kodemk = req.params.kodemk;
    const string = `DELETE FROM matakuliah WHERE kodemk = '${kodemk}'`;
    connection.query(string, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "error deleting matakuliah dengan kodemk: " + kodemk
            });
        } else if (data.affectedRows === 0) {
            res.status(404).send({
                message: `matakuliah dengan kodemk ${kodemk} tidak ditemukan`
            });
        } else {
            res.send(`matakuliah dengan kodemk ${kodemk} telah dihapus`);
        }
    });
});

module.exports = routerMk