const User = require('../models/user');
const { getFilePath, unlinkFile, hashPassword } = require('../utils/auth');
const bcrypt = require('bcryptjs');
const { createAccessToken, createRefreshToken } = require('../utils/jwt');

module.exports = {
    index: (req, res) => {
        User.get(req.con, (error, rows) => {
            if(error) {
                res.status(500).send({response: 'Ha ocurrido un error en el listado de los usuarios'})
            }else {
                res.status(200).send({response: rows});
            }
        })
    },

    store: (req, res) => {
        req.body.img = '';
        if (req.files.img) {
            req.body.img = getFilePath(req.files.img);
        }
        User.create(req.con, req.body, (error, row) => {
            if(error) {
                unlinkFile(req.body.img);
                res.status(500).send({response: 'Ha ocurrido un error creando el usuario'})
            }else {
                res.status(200).send({response: row});
            }
        });
    },

    login: (req, res) => {
        const { email, password } = req.body;

        User.getByEmail(req.con, email, (error, rows) => {
            if(error) {
                res.status(500).send({response: 'Ha ocurrido un error en el inicio de sesión'})
            }else {
                const userData = rows[0];

                bcrypt.compare(password, userData.password, (error, check) => {
                    if (error) return res.status(500).send({ response: 'Error del servidor' });
                    if (!check) return res.status(400).send({ response: 'Datos incorrectos' });
                    if (!userData.active) return res.status(401).send({ response: 'Usuario inactivo' });
                    delete userData.password;
                    res.status(200).send({
                        token: createAccessToken(userData),
                        refresh: createRefreshToken(userData)
                    });
                })
            } 
        });
    }
}