const pool = require("../../connectDB")
exports.index = async (req, res, next) => {
    try {
        const genres = await pool.query(`SELECT * FROM "GENRE" ORDER BY "GENRE_ID" ASC`)
        res.status(200).json({
            error: false,
            data: genres
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
            message: `Berhasil menambahkan genre`,
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
            message: `Berhasil menghapus genre dengan id ${id}`
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
            message: "Berhasil mengubah genre"
        })
    } catch (error) {
        return next(error);
    }
}