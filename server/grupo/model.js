
module.exports = function (mongoose, Types) {

    const GrupoSchema = mongoose.Schema({
        nome: { type: String, default: '' },
        createdAt: Date,
    }, { collection: 'grupo' });    

    return mongoose.model('Grupo', GrupoSchema);
}