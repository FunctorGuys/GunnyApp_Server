const validateFormUser = (user, cb) => {
    if (!user.username || !user.password || !user.fullname) return cb({
        error: "Username or password or fullname not null"
    });

    if (user.username.indexOf(" ") !== -1 || user.password.indexOf(" ") !== -1) return cb({
        error: "Username or password have space charactor"
    })

    if (user.password !== user.cfpassword) return cb({
        error: "Confirm password incorrect"
    });

    return cb(false, true);
}

module.exports = {
    validateFormUser
}