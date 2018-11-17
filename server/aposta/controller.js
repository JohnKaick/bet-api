import express from 'express';
import mongosse from 'mongoose';

const router = express.Router()
const Aposta = mongosse.model('Aposta')
const Grupo = mongosse.model('Grupo')

router.get('/', async (req, res, next) => {
    
    const data = new Date()
    const inicio = new Date(data.getFullYear(), data.getMonth() + 1, data.getDate(), 0, 0, 0)
    const fim = new Date(data.getFullYear(), data.getMonth() + 1, data.getDate(), 23, 59, 59)

    try {
        const apostas = await Aposta.find({"createdAt": { "$gte": inicio, "$lt": fim }}).populate('grupo').sort({ createdAt: 1 })
        res.send(apostas)
    } catch (err) {
        res.status(401).send({ error: 'get all aposta failed' });
    }

})

router.get('/obter/:id', async (req, res, next) => {

    const { id } = req.params

    try {
        const aposta = await Aposta.findById(id)
        res.send(aposta)
    } catch (err) {
        res.status(401).send({ error: 'get aposta failed' });
    }

})

router.put('/cadastrar/:grupoId', async (req, res, next) => {

    const { grupoId } = req.params

    const { nome, valor, lucro, resultado, data } = req.body

    try {
        let grupo = await Grupo.findById(grupoId)
        await Aposta.create({
            grupo: grupo._id,
            nome: nome,
            valor: valor,
            lucro: lucro,
            resultado: resultado,
            createdAt: data || new Date()
        })

        res.sendStatus(200)
    } catch (err) {
        res.status(401).send({ error: 'create aposta failed' });
    }

})

router.post('/resultado/:id', async (req, res, next) => {

    const { id } = req.params
    
    const { resultado } = req.body

    try {
        await Aposta.update({ id: id }, {
            $set: {
                resultado: resultado
            }
        })

        res.sendStatus(200)
    } catch (err) {
        res.status(401).send({ error: 'create aposta failed' });
    }
})

/*
router.get('/acumulado', async (req, res, next) => {
    
    let acumuladas = 0
    let pendencia = 0

    try {

        const apostas = await Aposta.find().sort({ createdAt: 1 })

        for (aposta of apostas) {
            if ( aposta.resultado === 'perdeu' ) {
                pendencia += aposta.valor,
                acumuladas += 1
            } else if (aposta.resultado === '') {
                acumuladas = acumuladas
            } else {
                break;
            }
        }

        res.status(200).send({ acumuladas: acumuladas, valor: pendencia });
    } catch (err) {
        res.status(401).send({ error: 'get aposta failed' });
    }

})
*/

module.exports = router