const { response, request } = require("express");

const login = (req = request, res = response) => {
    res.json({
        msg: "login ok",
    });
};
module.exports = { login }