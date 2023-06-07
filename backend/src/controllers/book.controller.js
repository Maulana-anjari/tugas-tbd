const pool = require("../../connectDB")
exports.index = async (req, res, next) => {
    try {
        const books = await pool.query(`
            SELECT b.*, STRING_AGG(DISTINCT a."AUTHOR_NAME", ', ') AS "AUTHOR_NAMES", STRING_AGG(DISTINCT g."GENRE", ', ') AS "GENRE_NAMES", "PUBLISHER"."PUBLISHER_NAME", a."AUTHOR_ID", g."GENRE_ID"
            FROM "BOOK" b
            JOIN "PUBLISHER" ON b."PUBLISHER_ID" = "PUBLISHER"."PUBLISHER_ID"
            JOIN "BOOK_AUTHOR" ba ON b."ISBN" = ba."BOOK_ID"
            JOIN "AUTHOR" a ON ba."AUTHOR_ID" = a."AUTHOR_ID"
            JOIN "BOOK_GENRE" bg ON b."ISBN" = bg."BOOK_ID"
            JOIN "GENRE" g ON bg."GENRE_ID" = g."GENRE_ID"
            GROUP BY b."ISBN", "PUBLISHER"."PUBLISHER_NAME", a."AUTHOR_ID", g."GENRE_ID"
            ORDER BY b."ISBN" ASC;
            `);
        res.status(200).json({
            error: false,
            data: books
        })
    } catch (error) {
        return next(error);
    }
}

exports.create = async (req, res, next) => {
    const { ISBN, TITLE, PUBLISHER_ID, PUBLICATION_YEAR, EDITION, AUTHOR_ID, GENRE_ID, LANGUAGE, PAGES, SYNOPSIS, CAPITAL_PRICE, SELLING_PRICE } = req.body;
    try {
        const checkBook = await pool.query(`SELECT * FROM "BOOK" WHERE "ISBN" = $1;`, [ISBN]);

        if (checkBook.rows.length > 0) {
            return res.status(501).json({
                error: true,
                message: `Buku dengan ISBN ${ISBN} sudah ada!`,
            });
        }
        // await pool.query('BEGIN'); // Mulai transaksi
        const newBook = await pool.query('INSERT INTO "BOOK" ("ISBN", "TITLE", "PUBLISHER_ID", "PUBLICATION_YEAR", "EDITION", "LANGUAGE", "PAGES", "SYNOPSIS", "CAPITAL_PRICE", "SELLING_PRICE", "LAST_UPDATED") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_DATE) RETURNING *',
            [
                parseInt(ISBN, 10),
                TITLE,
                parseInt(PUBLISHER_ID, 10),
                parseInt(PUBLICATION_YEAR, 10),
                parseInt(EDITION, 10),
                LANGUAGE,
                parseInt(PAGES, 10),
                SYNOPSIS,
                parseInt(CAPITAL_PRICE, 10),
                parseInt(SELLING_PRICE, 10)
            ]);
        // Simpan data di tabel "book_author"
        const bookId = newBook.rows[0].ISBN; // Dapatkan nilai ISBN dari hasil query sebelumnya
        if (Array.isArray(AUTHOR_ID)) {
            // Variabel AUTHOR_ID adalah array
            for (const authorId of AUTHOR_ID) {
                await pool.query('INSERT INTO "BOOK_AUTHOR" ("BOOK_ID", "AUTHOR_ID", "LAST_UPDATE") VALUES ($1, $2, CURRENT_DATE)',
                    [parseInt(bookId, 10), parseInt(authorId, 10)]);
            }
        } else {
            // Variabel AUTHOR_ID bukan array
            await pool.query('INSERT INTO "BOOK_AUTHOR" ("BOOK_ID", "AUTHOR_ID", "LAST_UPDATE") VALUES ($1, $2, CURRENT_DATE)',
                [parseInt(bookId, 10), parseInt(AUTHOR_ID, 10)]);
        }
        if (Array.isArray(GENRE_ID)) {
            // Variabel GENRE_ID adalah array
            for (const genreId of GENRE_ID) {
                await pool.query('INSERT INTO "BOOK_GENRE" ("BOOK_ID", "GENRE_ID", "LAST_UPDATED") VALUES ($1, $2, CURRENT_DATE)',
                    [parseInt(bookId, 10), parseInt(genreId, 10)]);
            }
        } else {
            // Variabel AUTHOR_ID bukan array
            await pool.query('INSERT INTO "BOOK_GENRE" ("BOOK_ID", "GENRE_ID", "LAST_UPDATED") VALUES ($1, $2, CURRENT_DATE)',
                [parseInt(bookId, 10), parseInt(GENRE_ID, 10)]);
        }

        await pool.query('COMMIT'); // Commit transaksi jika berhasil
        res.status(201).json({
            error: false,
            message: `Berhasil menambahkan buku ${bookId}`,
        })
    } catch (error) {
        await pool.query('ROLLBACK'); // Rollback transaksi jika terjadi error    
        return next(error);
    }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id
    try {
        await pool.query(`DELETE FROM "BOOK" WHERE "ISBN" = $1;`, [id]);
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