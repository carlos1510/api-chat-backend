const Message = require('../models/message');


module.exports = {
    index: (req, res) => {
        _getMessages(req, res);
    },

    store: (req, res) => {
        Message.create(req.con, req.body, (error, row) => {
            if(error) {
                res.status(500).send({response: 'Ha ocurrido un error creando el usuario'})
            }else {
                _getMessages(req, res);
            }
        });
    },

    destroy: (req, res) => {
        const { id } = req.params;
        Message.destroy(req.con, id, (error, row) => {
            if(error) {
                res.status(500).send({response: 'Ha ocurrido un error creando el usuario'})
            }else {
                _getMessages(req, res);
            }
        });
    },

   
}

function _getMessages(req, res){
    Message.get(req.con, (error, rows) => {
        if(error) {
            res.status(500).send({response: 'Ha ocurrido un error en el listado de los usuarios'})
        }else {
            const { io } = req;
            io.emit('messages', rows);
            res.status(200).send({response: rows});
        }
    })
}