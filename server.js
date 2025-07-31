const express = require('express')
const app = express()
const dotenv = require('dotenv')
const movieRouter = require('./routes/moviesRouter')

app.use('/api/movies', movieRouter)

app.listen(process.env.PORT, () => {
    console.log((`Server is running at http://localhost:${process.env.PORT}`));

})


//INDEX
app.get('/api/movies', (req, res) => {


})

//SHOW
app.get('/api/movies/:id', (req, res) => {

})