const userModel = require('../models/user')
const constants = require('../config/constants')
const {CustomError} = require('../error/errors')
const alloha = async (req, res,next) => {
    // res.status(500).json({ message: constants.MESSAGES.USER_CREATED });
    return next(CustomError('Working',429))
}


const register = async (req,res) => {
    try {

        
    } catch (error) {
        throw new ClassError.ServerError('Internal Server Error')
    }
}


const login = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}


const profile = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

const updateProfile = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}


module.exports = {
    alloha,
    register,
    login, 
    profile, 
    updateProfile
}