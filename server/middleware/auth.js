const config = require('config')
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(401).json({ msg: 'Access denied' })
    }
    try {
        const decoded = jwt.verify(token, config.get('SECRET'));
        req.user = decoded.user
        next()
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' })
    }
}


module.exports = auth