const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const User = require('../models/userSchema')
const Feedback = require('../models/feedback')
const Employee=require('../models/employeeSchema')
const Recruiter=require('../models/recruiterSchema')
const Job=require('../models/jobSchema')
const nodemailer = require('nodemailer')
const sendEmail=require('../utils/functions')

const addJobPosting=async(req,res)=>{
    try {
        const {field,jobTitle,yearsOfExp,skills,quizOrNot}=req.body
        const job=new Job({field,jobTitle,yearsOfExp,skills,quizOrNot})
        job.company=req.user.companyName
        job.recruiterId=req.user._id
        job.timeOfPosting=new Date().getTime
        await job.save()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }
}