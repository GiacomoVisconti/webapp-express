const express = require('express')
const app = express()
const dotenv = require('dotenv')
const movieRouter = require('./routes/moviesRouter')
const erro404handler = require('./middlewares/error404handler')
const erro500handler = require('./middlewares/error500handler')

//Server Listening
app.listen(process.env.PORT, () => {
    console.log((`Server is running at http://localhost:${process.env.PORT}`));

})

//Movie Routing
app.use('/api/movies', movieRouter)

app.use(erro404handler)
app.use(erro500handler)
