var con = require("./index");


const addOne = (user, cb) => {
    const statement = "INSERT INTO users (username, password, fullname) VALUES (?, ?, ?)";
    con.getConnection((err, sql) => {
        if (err) return cb(err);
        sql.query(statement, [user.username, user.password, user.fullname], (er, result) => {
            if (er) cb({error: er.sqlMessage}, null);
            else {
                getUserByUsername(user.username, (er, user) => {
                    if (er) cb(er, null);
                    else cb(null, user);
                })
            }
        })
    })
}

const getUserByUsername = (username, cb) => {
    const statement = "SELECT * FROM users WHERE username = ?";
    con.getConnection((err, sql) => {
        if (err) return cb(err);
        sql.query(statement, [username], (er, result) => {
            if (er || result.length === 0) cb(true, null);
            else cb(null, result[0]);
        })
    })
}

module.exports = {
    addOne,
    getUserByUsername,
}