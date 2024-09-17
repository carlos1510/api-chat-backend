
module.exports = {
    get: (con, callback) => {
        con.query('SELECT a.id, a.userId, a.content, a.date, b.firstName, b.lastName FROM messages a INNER JOIN users b ON a.userId=b.id ORDER BY a.id ASC', callback);
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