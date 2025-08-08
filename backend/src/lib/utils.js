import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const cookieOptions = {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Allow cross-site in production
    };

    console.log('[AUTH] Setting cookie with options:', cookieOptions);

    res.cookie('token', token, cookieOptions);

    return token;
}
