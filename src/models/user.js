const { hashPassword } = require("../utils/auth");

module.exports = {
    get: (con, callback) => {
        con.query('SELECT * FROM users', callback);
    },
    getById: (con, id, callback) => {
        con.query(`SELECT * FROM users where id = ${id}`, callback);
    },

    getById: (con, email, callback) => {
        con.query(`SELECT * FROM users where email = '${email}'`, callback);
    },

    create: (con, data, callback) => {
        con.query(`
            INSERT INTO users SET 
             firstName = '${data.firstName}',
             lastName = '${data.lastName}',
             active = '${typeof data.active !== 'undefined' ? data.active: 1}',
             email = '${data.email.toLowerCase()}',
             password = '${hashPassword(data.password)}',
             roleId = '${typeof data.roleId !== 'undefined' ? data.roleId : 1}',
             img = '${data.img}'
            `, callback);
    },
}