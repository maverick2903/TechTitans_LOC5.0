const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const User = require("../models/userSchema");
const Feedback = require("../models/feedback");
const Employee = require("../models/employeeSchema");
const Recruiter = require("../models/recruiterSchema");
const Job = require("../models/jobSchema");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/functions");

const addJobPosting = async (req, res) => {
  try {
    const {
      field,
      jobTitle,
      yearsOfExp,
      skills,
      quizOrNot,
      workLocation,
      salary,
    } = req.body;
    const job = new Job({
      field,
      jobTitle,
      yearsOfExp,
      skills,
      quizOrNot,
      workLocation,
      salary,
    });
    const user = req.user;
    const r=await Recruiter.findOne({username:user.username})
    job.company = r.companyName;
    job.recruiterId = user._id;
    let date = new Date();
    let time =
      date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    job.timeOfPosting = time;
    job.jobPincode = r.recPincode;
    await job.save();
    console.log(job);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const showUsersInterested = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiterId: req.user._id });
    res.status(200).json({ jobs });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
};

module.exports = { addJobPosting, showUsersInterested };
