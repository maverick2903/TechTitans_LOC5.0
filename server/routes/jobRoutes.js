const express = require("express");
const router = new express.Router();
const authenticate=require('../middlewares/auth')

const {
    showJobListings,
    nearByJobs
}=require('../controllers/jobController')
router.post('/showJobListings',authenticate,showJobListings)
router.post('/nearByJobs',authenticate,nearByJobs)
module.exports=router