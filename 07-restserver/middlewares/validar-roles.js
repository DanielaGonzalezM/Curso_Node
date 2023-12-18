const { response } = require("express")

const esAdminRole = (req, res = response) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: "Se debe validar token antes del rol"
        })

    }
    const { rol, nombre } = req.usuario
    if (rol !== "ADMIN_ROLE") {
        return res.status(500).json({
            msg: `${nombre} no es administrador - no puede hacer esta petición`
        })
    }
    next();
}

const tieneRole = (...roles) => {

    return (req, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: "Se debe validar token antes del rol"
            })

        }
        const { rol, nombre } = req.usuario
        if (!roles.includes(rol)) {
            return res.status(500).json({
                msg: `${nombre} no tiene el rol correspondiente - no puede hacer esta petición`
            })
        }
        next();
    }
}
module.exports = {
    esAdminRole, tieneRole
}