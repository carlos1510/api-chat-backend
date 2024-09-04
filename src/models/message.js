
module.exports = {
    get: (con, callback) => {
        con.query('SELECT * FROM messages', callback);
    },
    
    getById: (con, id, callback) => {
        con.query(`SELECT * FROM messages WHERE id = ${id}`, callback);
    },

    create: (con, data, callback) => {
        const { content, userId } = data;
        con.query(
            `INSERT INTO messages SET 
             content='${content}', 
             userId='${userId}'`,
            callback
        );
    },

    destroy: (con, id, callback) => {
        con.query(`DELETE FROM messages WHERE id = ${id}`, callback);
    },
}