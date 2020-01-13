const jwt = require('jsonwebtoken');

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'soFarAway', null, (err, decodedToken) => {
            if (err || !decodedToken) {
                reject(err);
            }
            resolve(decodedToken);
        });
    });
}

module.exports = verifyToken;