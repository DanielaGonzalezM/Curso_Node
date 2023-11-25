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

module.exports = {
    esAdminRole
}