import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: false,      
    sameSite: 'lax',    
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
