const pool = require("../../connectDB")
exports.index = async (req, res, next) => {
    try {
        const authors = await pool.query(`SELECT * FROM "AUTHOR" ORDER BY "AUTHOR_ID" ASC`)
        res.status(200).json({
            error: false,
            data: authors
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
            message: `Berhasil menambahkan author`,
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
            message: `Berhasil menghapus author dengan id ${id}`
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
            message: "Berhasil mengubah author"
        })
    } catch (error) {
        return next(error);
    }
}