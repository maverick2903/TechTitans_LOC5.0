const express = require("express");
const router = new express.Router();
const authenticate=require('../middlewares/auth')

const {
    addJobPosting
}=require('../controllers/recruiterController')
router.post('/addJobPosting',authenticate,addJobPosting)

module.exports=router