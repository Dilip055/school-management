
import jwt from 'jsonwebtoken';
import CustomError from '../utils/customError.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new CustomError('Authorization token missing', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return next(new CustomError('Invalid or expired token', 403));
  }
};


export const authorizeRoles = (...roles) => {
 
  return (req, res, next) => {
   
    if (!roles.includes(req.user.role)) {
      return next(new CustomError('Access forbidden: insufficient role', 403));
    }
    next();
  };
};
