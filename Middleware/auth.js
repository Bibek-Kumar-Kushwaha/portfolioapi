import jwt from 'jsonwebtoken'
import registerModel from '../models/userRegisterSchema.js';

const isAuthorized = async (req, res, next) => {
    try {
        // const token = req.cookies.token;
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).send({ success: false, message: "Please login to access this resource" })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.existingUser = await registerModel.findById(decodedToken.id);
        if (!req.existingUser) {
            return res.status(401).send({ success: false, message: "User not found" });
        }

        next();
    } catch (error) {
        console.error('Authorization error:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ success: false, message: "Token expired" });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).send({ success: false, message: "Invalid token" });
        }

        return res.status(400).send({ success: false, message: "Error in Authorization", error });
    }
}

export { isAuthorized }