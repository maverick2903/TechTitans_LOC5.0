const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jobSchema=new mongoose.Schema({
    company:{
        type:String
    },
    timeOfPosting:{
        type:String
    },
    recruiterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Recruiter'
    },
    field:{
        type:String
    },
    jobTitle:{
        type:String
    },
    yearsOfExp:{
        type:Number
    },
    skills:{
        type:String
    },
    quizOrNot:{
        type:Boolean,
        default:false
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId
    }]
},{timestamps:true})

const Job = mongoose.model('Job', jobSchema)
module.exports = Job