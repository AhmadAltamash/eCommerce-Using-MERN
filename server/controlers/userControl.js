const Users = require('../models/userModel')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');
const { request } = require('express');

const userControler = {
    register: async(req,res)=>{
        try {
            const {name,email,password} = req.body;
            const user = await Users.findOne({email}) 
            if(user) return res.status(400).json({message: 'Email already exists'})
            
            if(password.length < 6) 
            return res.status(400).json({message: 'password must be atleast 6 characters long'})

            //password Encryption
            const passwordHash = await bcrypt.hash(password,10)

            const newUser = new Users({
                name,email,password:passwordHash
            })

            //Saving In DB

            await newUser.save()

            //JWT for authentication
            const accessToken = createAccessToken({id:newUser._id})
            const refreshToken = createRefreshToken({id:newUser._id})

            res.cookie('refreshtoken', refreshToken,{
                httpOnly:true,
                path:'/user/refresh_token'
            })

            res.json({ accessToken, msg: 'Register Successful' });

        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    refreshToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
    
            if (!rf_token) return res.status(400).json({ msg: 'Please login or register first' });
    
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: 'Please login or register' });
    
                const accessToken = createAccessToken({ id: user.id });
    
                res.json({ user, accessToken });
            });
    
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    login: async(req,res) => {
        try {
            const {email, password} = req.body;
            const user = await Users.findOne({email});

            if(!user) return res.status(400).json({msg: 'user not exist'});

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: 'Incorrect Password'})

            const accessToken = createAccessToken({id: user._id})
            const refreshToken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshToken,{
                httpOnly:true,
                path:'/user/refresh_token'
            })

            res.json({msg: 'LOGIN SUCCESSFULL', accessToken});
            
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    logout: async(req,res) => {
        try {
            res.clearCookie('refreshtoken',{path: '/user/refresh_token'})
            return res.json({msg: 'Logged Out'})
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getInformation: async(req,res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg:'user not found'})
            res.json(user)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}


module.exports = userControler