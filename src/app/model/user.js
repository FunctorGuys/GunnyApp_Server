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

const increateWin = (id_winner, cb) => {
    const statement = "UPDATE users SET win=win + 1 WHERE id = ?";
    con.getConnection((err, sql) => {
        if (err) return cb(err);
        sql.query(statement, [id_winner], (er, result) => {
            if (er) cb(true);
            else cb(false, result);
        })
    })
}

const increateLose = (id_loser, cb) => {
    const statement = "UPDATE users SET lose=lose + 1 WHERE id = ?";
    con.getConnection((err, sql) => {
        if (err) return cb(err);
        sql.query(statement, [id_loser], (er, result) => {
            if (er) cb(true);
            else cb(false, result);
        })
    })
}

module.exports = {
    addOne,
    getUserByUsername,
    increateWin,
    increateLose
}