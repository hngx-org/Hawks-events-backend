const userModel = require('../models/user')
const constants = require('../config/constants')
const ClassError = require('../error/errors')
const alloha = async (req,res) => {
        // res.status(200).json({message:"It's still day one!"}
        // throw new ClassError.AcceptedError("It's still day one")
        // throw new ClassError.CreatedError(constants.MESSAGESS.USER_CREATED)` Using the pre defined message`s
        
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