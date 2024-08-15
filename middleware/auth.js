require('dotenv').config();

const jwt= require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY; 
const bcrypt = require('bcryptjs');

const UserModel = require('../models/User')
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Received Token:', token); // Log received token
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  
    try {
      const decoded = jwt.verify(token, secretKey);
      console.log('Decoded Token:', decoded); // Log decoded token
      req.user = decoded;
      next();
    } catch (err) {
      console.log('Token Verification Error:', err); // Log verification error
      res.status(400).json({ message: 'Invalid token.' });
    }
  };
  
  

const roleMiddleware = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({message: 'Access denied. You do not have permision to perform this action.'});
    }
    next();
};

module.exports = {authMiddleware, roleMiddleware};