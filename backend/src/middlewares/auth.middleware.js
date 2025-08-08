import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async (req, res, next) => {
    try {
        console.log('[AUTH] Checking authentication for:', req.method, req.path);
        console.log('[AUTH] Cookies received:', req.cookies);
        console.log('[AUTH] Headers:', {
            authorization: req.headers.authorization,
            cookie: req.headers.cookie,
            origin: req.headers.origin
        });

        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            console.log('[AUTH] No token found in cookies or headers');
            return res.status(401).json({
                success: false,
                message: 'Token missing',
                error: 'NOT_AUTHENTICATED'
            });
        }

        console.log('[AUTH] Token found, verifying...');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        if (decoded) {
            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Not authorized - User not found'
                });
            }
            user.password = undefined;
            console.log(user);
            req.user = user;
            next();
        }
        else {
            return res.status(401).json({
                success: false,
                message: 'Not authorized - Token Invalid'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: 'Not authorized'
        });
    }
}