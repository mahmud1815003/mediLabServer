const jwt = require('jsonwebtoken');

const jwtCreator = (login) => {
    const token = jwt.sign(login, process.env.salt, {
        expiresIn: 86400000,
    })
    return token;
};

module.exports = {
    jwtCreator,
}