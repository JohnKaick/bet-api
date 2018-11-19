import express from 'express';
import mongosse from 'mongoose';

const router = express.Router()
const Grupo = mongosse.model('Grupo')

router.get('/', async (req, res, next) => {

    try {
        const grupo = await Grupo.find()
        res.send(grupo)
    } catch (err) {
        res.status(401).send({ error: 'get all grupo failed' });
    }

})

router.put('/cadastrar', async (req, res, next) => {

    const { nome } = req.body

    try {
        await Grupo.create({
            nome: nome,
            createdAt: new Date()
        })

        res.sendStatus(200)
    } catch (err) {
        res.status(401).send({ error: 'create grupo failed' });
    }

})

module.exports = router