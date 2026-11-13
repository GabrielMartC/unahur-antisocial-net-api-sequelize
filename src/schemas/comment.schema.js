const JOI = require('joi')

const schemaComment = JOI.object
    ({
        PostId: JOI.number().integer().positive().required().messages({
            'number.base': '{#label} debe ser un texto',
            'number.integer': '{#label}debe ser un número entero.',
            'number.positive': '{#label} debe ser un número mayor a cero.',
            'any.required': '{#label} es requerido',
        }),
        content: JOI.string().max(150).required().messages({
            'string.base': '{#label} debe ser un texto',
            'string.empty': '{#label} no puede estar vacío',
            'string.max': '{#label} debe tener como máximo {#limit} caracteres',
            'any.required': '{#label} es requerido',
        }),
        fechaCreacion: JOI.date().iso().required().messages({
            'date.base':'{#label} debe ser una fecha válida',
            'date.format': '{#label} debe tener formato YYYY-MM-DD',
            'any.required': '{#label} es requerido',
        })
    }).unknown(false).messages({
        'object.unknown': 'El atributo {#label} no está permitido'
    })

module.exports = {schemaComment};