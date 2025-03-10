const express = require('express');
const { getAllHods } = require('../Hods/getAllHods');
const { registerHod } = require('../Hods/addHod');
const { loginHod } = require('../Hods/loginAdmin');

const router = express.Router();

router.get('/allHods', getAllHods);
router.post('/addHod',registerHod);
router.post('/login',loginHod)



module.exports = router;
