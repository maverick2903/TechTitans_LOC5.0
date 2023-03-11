const express = require("express");
const router = new express.Router();
const authenticate=require('../middlewares/auth')

const {
    addJobPosting,
    showUsersInterested
}=require('../controllers/recruiterController')
router.post('/addJobPosting',authenticate,addJobPosting)
router.post('/showUsersInterested',authenticate,showUsersInterested)

module.exports=router