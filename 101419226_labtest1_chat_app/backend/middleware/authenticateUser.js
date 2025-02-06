const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.headers["authorization"];

    // If token is not present in the request headers
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }

        // Attach user information to request object
        req.user = decoded;  // This will store the user data (userId, username) for later use

        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateUser;
