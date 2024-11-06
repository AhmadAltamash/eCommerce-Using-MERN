// const jwt = require('jsonwebtoken');

// const auth = (req,res,next)=>{
//     try {
//         const token = req.header('Authorization')
//         if(!token) return res.status(400).json({msg: 'Invalid Authentication'})

//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
//             if(err) return res.status(400).json({msg: 'Invalidation'})

//             req.user = user
//             next()
//         })
//     } catch (error) {
//         return res.status(500).json({msg: error.message})
//     }
// }

// module.exports = auth;
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', ''); // Get the token from headers
        
        if (!token) {
            return res.status(401).json({ msg: 'Access denied, no token provided' });
        }

        // Verify the token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ msg: 'Invalid token' });
            }
            
            // Attach the user info to the request object
            req.user = user;
            next(); // Move to the next middleware or route handler
        });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = auth;
