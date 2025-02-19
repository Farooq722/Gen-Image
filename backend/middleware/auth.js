const jwt = require("jsonwebtoken");

const userAuth = async(req, res, next) => {
    try {
        if (req.method === "OPTIONS") {
            return res.sendStatus(200);
          }
        const { token } = req.headers;
        
        if(!token) {
            return res.json({
                msg: "Unauthorized request"
            });
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodeToken) {
            return res.status(402).json({
                msg: "Unauthorized request"
            });
        }
        req.body.userId = decodeToken.id;
        next();

    } catch (error) {
        return res.status(500).json({
            msg: error.message || error
        })
    }
} 

module.exports = userAuth;