const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connection = require('./data/connection')

app.listen(process.env.PORT, () => {
    console.log((`Server is running at http://localhost:${process.env.PORT}`));

})


//INDEX
app.get('/api/movies', (req, res) => {

    //SAVING THE QUERY STRING INTO A VARIABLE
    const sql = 'SELECT * FROM boolean_movies_webapp.movies;'
    connection.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: 'true', message: err.message })
        res.json(result)
    })
})

//SHOW
app.get('/api/movies/:id', (req, res) => {
    const { id } = req.params
    const sql_rev = 'SELECT * FROM boolean_movies_webapp.reviews WHERE movie_id = ?;'
    let movie

    const sql_movie = 'SELECT * FROM boolean_movies_webapp.movies WHERE id = ?;'
    connection.query(sql_movie, [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'true', message: err.message })
        movie = result


    })

    connection.query(sql_rev, [id], (err, result) => {
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
        const movie_rev = [{
            movie,
            reviews: result,
        }]
        console.log(movie_rev);
        res.json(movie_rev)


    })
})