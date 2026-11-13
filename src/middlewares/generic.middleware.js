const validarById = (modelo) => {
    return async (req, res, next) => {
        const id = req.params.id;
        const instance = await modelo.findByPk(id);

        if (!instance) {
            res.status(404).json({ error_message: `el ${modelo.name} con id: ${id} no fue encontrado.` });
            return;
        }

        next();
    };
};

const validarSchema = (schema) => {
    return (req, res, next) => {
        const dataAValidar = req.body
        const result = schema.validate(dataAValidar, {abortEarly:false})
        if (result.error){
            return res.status(400).json({ //400 Bad Request
                errores: result.error.details.map( e=> {
                    return {atributo: e.path[0], error: e.message }
                })
            })
        }

        next()
    }
}

module.exports = { validarById, validarSchema};