const userModel = require('../models/user')
const constants = require('../config/constants')
const { CustomError } = require('../error/errors')
const alloha = async (req, res, next) => {
    // return next(CustomError('test', 429)) //use case

    // const message = constants.MESSAGES.USER_CREATED
    // return next(CustomError(message,200))Use case for constants

}


const register = async (req,res) => {
    try {
        
    } catch (error) {
        
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
    profile
}