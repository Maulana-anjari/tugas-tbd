const pool = require("../../connectDB")
exports.index = async (req, res, next) => {
    try {
        const pub = await pool.query(`SELECT * FROM "PUBLISHER" ORDER BY "PUBLISHER_ID" ASC`)
        res.status(200).json({
            error: false,
            data: pub
        })
    } catch (error) {
        return next(error);
    }
}

exports.create = async (req, res, next) => {
    const {  } = req.body;
    try {
        res.status(201).json({
            error: false,
            message: `Berhasil menambahkan buku`,
        })
    } catch (error) {
        return next(error);
    }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id
    try {

        res.status(200).json({
            error: false,
            message: `Berhasil menghapus buku dengan id ${id}`
        })
    } catch (error) {
        return next(error);
    }
}
exports.update = async (req, res, next) => {
    const id = req.params.id
    try {

        res.status(200).json({
            error: false,
            message: "Berhasil mengubah buku"
        })
    } catch (error) {
        return next(error);
    }
}