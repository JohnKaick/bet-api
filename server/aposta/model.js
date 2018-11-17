
module.exports = function (mongoose, Types) {

    const ApostaSchema = mongoose.Schema({
        grupo: { type: Types.ObjectId, ref: 'Grupo' },
        nome: { type: String, default: '' },
        valor: { type: Number, default: '' },
        lucro: { type: Number, default: '' },
        resultado: { type: String, enum: ['ganhou', 'perdeu', ''], default: '' },
        createdAt: Date,
    }, { collection: 'aposta' });

    return mongoose.model('Aposta', ApostaSchema);

}