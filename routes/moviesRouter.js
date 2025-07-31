const express = require('express');
const router = express.Router();

//Importing the moviesControllers with the CRUD functions
const movieController = require('../controllers/moviesController')


//Index
router.get('/', movieController.index)

//Show
router.get('/:id', movieController.show)


//Export Router
module.exports = router

