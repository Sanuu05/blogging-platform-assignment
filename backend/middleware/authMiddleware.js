const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized - Invalid token format" });
    }
    
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }
        req.user = user;
        next();
    });
};
