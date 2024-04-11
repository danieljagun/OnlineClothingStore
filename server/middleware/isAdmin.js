const User = require('../models/User');

const isAdmin = async (req, res, next) => {
    try {
        if (!req.user) return res.status(403).json({ message: "Access denied. No user details found." });

        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ message: "User not found." });

        if (user.isAdmin) {
            next(); // The user is an admin, proceed to the next middleware or route handler
        } else {
            res.status(403).json({ message: "Access denied. Not authorized as admin." });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid request." });
    }
};

module.exports = isAdmin;
