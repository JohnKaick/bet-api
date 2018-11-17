
module.exports = function (mongoose, Types) {

    const CaixaSchema = mongoose.Schema({
        valor: { type: Number, default: '' },
        tipo: { type: String, enum: ['deposito', 'saque', 'outros'] },
        obs: { type: String, default: '' },
        createdAt: Date,
    }, { collection: 'caixa' });    

    return mongoose.model('Caixa', CaixaSchema);

}