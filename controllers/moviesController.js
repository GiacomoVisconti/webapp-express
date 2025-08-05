const dotenv = require('dotenv')
const connection = require('../data/connection')

//Create the functions for the CRUD operations

//INDEX
function index(req, res) {

    //SAVING THE QUERY STRING INTO A VARIABLE
    const sql = 'SELECT * FROM boolean_movies_webapp.movies;'
    connection.query(sql, (err, result) => {

        //Manage 500 error
        if (err) return res.status(500).json({ error: 'true', message: err.message })
        res.json(result)
    })
}

function show(req, res) {
    const { id } = req.params
    const sql_rev = 'SELECT * FROM boolean_movies_webapp.reviews WHERE movie_id = ?;'
    let movie

    const sql_movie = 'SELECT * FROM boolean_movies_webapp.movies WHERE id = ?;'
    connection.query(sql_movie, [id], (err, result) => {

        //Manage 500 error
        if (err) return res.status(500).json({ error: 'true', message: err.message })
        movie = result[0]


    })

    connection.query(sql_rev, [id], (err, result) => {

        //Manage 500 and 400 errors
        if (err) {
            return res.status(500).json({
                error: 'Database query failed'
            })
        }
        if (!result.length > 0) {
            return res.status(404).json({
                error: 'true',
                message: 'Record not found'
            })
        }



        const movie_rev = {
            id: movie.id,
            title: movie.title,
            director: movie.director,
            genre: movie.genre,
            image: movie.image,
            abstract: movie.abstract,
            reviews: result
        };
        console.log(movie_rev);
        res.json(movie_rev)
    })


}

function StoreReview(req, res) {

    const { id } = req.params
    const { movie_id, name, vote, text } = req.body
    console.log({ movie_id, id, name, vote, text });


    const sql = 'INSERT INTO boolean_movies_webapp.reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)'
    connection.execute(sql, [id, name, vote, text], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: err.message,
            })
        }

        res.status(201).json({
            message: 'Review added successfully',
            review: {

                movie_id: id,
                name: name,
                vote: vote,
                text: text
            }
        })
    })

}

module.exports = { index, show, StoreReview }