const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('token');

    if (!token)
        return res.status(401).json({ msg: 'No token, Authorizaton denied' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], config.get('jwtSecret'));
        req.user = decoded;
        next();
    } 
    catch (e) {
        res.status(400).json({ msg: 'Invalid Token' });
    }
}

module.exports = auth;