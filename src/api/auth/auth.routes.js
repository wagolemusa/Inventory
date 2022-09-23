const express = require('express');
const yup = require('yup');
const bcrypt = require('bcrypt')

const jwt = require('../../lib/jwt')
const User = require('../users/users.model')

const router = express.Router();


// Validations Signup
const schema = yup.object().shape({
    firstname: yup
        .string()
        .trim()
        .min(2)
        .required(),
    lastname: yup
        .string()
        .required()
        .trim()
        .min(2),
    email: yup
        .string()
        .required()
        .trim()
        .email(),
    phone: yup
        .string()
        .required()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(12, 'Must be exactly 5 digits')
        .max(12, 'Must be exactly 5 digits'),
    idnumber: yup
    .string().required(),
    password: yup
        .string()
        .min(8)
        .max(100)
        .matches(/[^A-Za-z0-9]/, 'Passweord must contain a special character')
        .matches(/[A-Z]/, 'Password must contain an uppercase letter')
        .matches(/[a-z]/, 'Password must cantain a lowecase letter')
        .matches(/[0-9]/, 'Password must contain a number')
})


// Validations Login
const schemaLogin = yup.object().shape({
    email: yup
        .string()
        .required()
        .trim()
        .email(),
    password: yup
        .string()
        .min(8)
        .max(100)
        .matches(/[^A-Za-z0-9]/, 'Passweord must contain a special character')
        .matches(/[A-Z]/, 'Password must contain an uppercase letter')
        .matches(/[a-z]/, 'Password must cantain a lowecase letter')
        .matches(/[0-9]/, 'Password must contain a number')
})
// error Messages
const errorMessages = {
    invalidLogin: 'Invalid Login password.',
    emailInUse: 'Email in use.',
    emailNotFound: 'Employee email not found'

}

// Singup endpoint
router.post('/signup', async (req, res, next) => {
    try {
        const { firstname, lastname, email, phone, idnumber, sex, password} = req.body;
        const createUser = {firstname, lastname, email, phone, idnumber, sex, password};

        await schema.validate(createUser ,{
            abortEarly: false,
        })

        const existingUser = await User.query().where({ email}).first()
        if(existingUser) {
            const error = new Error(errorMessages.emailInUse)
            res.status(403);
            throw error
        }
        const hashedPassword =  await bcrypt.hash(password, 12)

        const insertedUser = await User.query().insert({
            firstname,
            lastname,
            email,
            phone,
            idnumber,
            sex,
            password:hashedPassword,
        });
        delete insertedUser.password;

        const payload = {
            id: insertedUser.id,
            lastname,
            email
        }
        const token = await jwt.sign(payload)
        res.json({
            user: payload,
            token

        })

    }catch(error){
        console.log(error)
        next(error)
    }
});

// Signin endpoints
router.post('/signin', async(req, res, next) =>{
    try {
        const {  email, password} = req.body;
        const createUser = { email,  password};

        await schemaLogin.validate(createUser ,{
            abortEarly: false,
        })

        const user = await User.query().where({ email}).first()
        if(!user) {
            const error = new Error(errorMessages.emailNotFound)
            res.status(401);
            throw error
        }
        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            const error = new Error(errorMessages.invalidLogin)
            res.status(401);
            throw error
        }
        const payload = {
            id: user.id,
            user: user.lastname,
            email
        }
        const token = await jwt.sign(payload)
        res.json({
            user: payload,
            token
        })
    }catch(error){
        console.log(error)
        next(error)
    }
})

module.exports = router;