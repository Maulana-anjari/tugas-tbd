const pool = require("../../connectDB")
exports.index           = async (req, res, next) => {
    try {
        const books = await pool.query(`SELECT * FROM "BOOK" ORDER BY "ISBN" ASC`)
        res.status(200).json({
            error: false,
            data: books
        })
    } catch (error) {
        return next(error);
    }
}

exports.create          = async (req, res, next) => {
    const { } = req.body;
    try {
        
        res.status(201).json({
            error: false,
            message: `Berhasil membuat staff`,
        })
    } catch (error) {
        return next(error);
    }
}

exports.delete          = async (req, res, next) => {
    const id = req.params.id
    try {
        
        res.status(200).json({
            error: false,
            message: `Berhasil menghapus staff dengan id ${id}`
        })
    } catch (error) {
        return next(error);
    }
}
exports.update          = async (req, res, next) => {
    const id = req.params.id
    try {
        
        res.status(200).json({
            error: false,
            message: "Berhasil mengubah staff"
        })
    } catch (error) {
        return next(error);
    }
}