const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connection = require('./data/connection')

app.listen(process.env.PORT, () => {
    console.log((`Server is running at http://localhost:${process.env.PORT}`));

})

app.get('/api/movies', (req, res) => {

    //SAVING THE QUERY STRING INTO A VARIABLE
    const sql = 'SELECT * FROM boolean_movies_webapp.movies;'
    connection.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: 'true', message: err.message })
        res.json(result)
    })
})