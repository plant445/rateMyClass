import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'
import dotenv from 'dotenv';

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET

export const register = async (req, res) => {
    const { username, password } = req.body 
    try {
        const existing = await User.findOne({username})
        if (existing) {
            return res.status(400).json({error : 'Username already exists'})
        }

        const hashed = await bcrypt.hash(password, 10)
        const newUser = new User({username, password: hashed})
        await newUser.save()

        res.status(200).json({ message: 'User Created Sucessfully'})
    } catch(err) {
        console.error(err)
        res.status(500).json({error: 'Server error'})
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body 
    try {
        const user = await User.findOne({username})
        if(!user) {
            return res.status(400).json({error: 'Username does not exist'})
        }
        const match = await bcrypt.compare(password, user.password)
        if(!match) {
            return res.status(400).json({error: 'Incorrect Password'})
        }

        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h'})

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000
        })

        res.json({ username:user.username})
    } catch(err) {
        console.error(err)
        res.status(500).json({ error:'Server Error'})
    }
}

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if(!token){
        return res.status(400).json({error: 'Please sign in'})
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET)
        req.user = verified
        next()
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
}

export const getMe = (req, res) => {
    res.json({ username: req.user.username})
}

export const logout = (req, res) => {
    res.clearCookie('token')
    res.json({ message: 'Logged out' });
}