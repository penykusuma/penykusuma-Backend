const connection = require('../db/db') 

module.exports = {
    getMhs:(req, res) => {
        connection.query("SELECT * FROM mahasiswa", (err, data) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message: err.message || "Terjadi kesalahan saat mengambil data mahasiswa"
                });
            } else {
                res.send(data);
            };
        });
    },

    getbynim:(req, res) => {
        const nim = req.params.nim;
        connection.query(`SELECT * FROM mahasiswa WHERE nim= '${nim}'`, (err, data) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message: err.message || "Terjadi kesalahan saat mengambil data mahasiswa"
                });
            } else {
                res.send(data);
            }
        });
    },
    postbyMhs: (req, res) => {
        const mahasiswabaru = req.body;
        connection.query("INSERT INTO mahasiswa SET ?", mahasiswabaru, (err) => {
            if (err) {
                console.log("error: ", err);
                res.status(500).send({
                    message: err.message || "terjadi kesalahan saat menyimpan data mahasiswa"
                });
            } else {
                res.send(mahasiswabaru);
            }
        });
    },
    putbynim: (req, res) => {
        const nim = req.params.nim;
        const mhs = req.body;
        const qstring = `UPDATE mahasiswa
                        SET nama = '${mhs.nama}', angkatan = '${mhs.angkatan}', prodi = '${mhs.prodi}'
                        WHERE nim = '${nim}'`;
        connection.query(qstring, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "error update mahasiswa dengan nim" + nim
                });
            } else if (data.affectedRows === 0) {
                res.status(404).send({
                    message: `mahasiswa dengan NIM ${nim} tidak ditemukan`
                });
            } else {
                console.log("update mahasiswa: ", { nim: nim, ...mhs });
                res.send({ message: `Data mahasiswa dengan NIM ${nim} berhasil diupdate` });
            }
        });
    },
    deletebynim: (req, res) => {
        const nim = req.params.nim;
        const string = `DELETE FROM mahasiswa WHERE nim = '${nim}'`;
        connection.query(string, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "error deleting mahasiswa dengan nim: " + nim
                });
            } else if (data.affectedRows === 0) {
                res.status(404).send({
                    message: `mahasiswa dengan nim ${nim} tidak ditemukan`
                });
            } else {
                res.send(`mahasiswa dengan nim ${nim} telah dihapus`);
            }
        });
    }
}