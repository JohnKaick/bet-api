const express = require('express');
const mongosse = require('mongoose');

const router = express.Router()
const Caixa = mongosse.model('Caixa')

router.get('/', async (req, res, next) => {

    try {
        const caixa = await Caixa.find()
        res.send(caixa)
    } catch (err) {
        res.status(401).send({ error: 'get all caixa failed' });
    }

})

module.exports = router