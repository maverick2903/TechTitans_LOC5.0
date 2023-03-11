const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const geocoder=require('../utils/api')
const recruiterSchema = new mongoose.Schema({
    companyName:{
        type:String
    },
    basedOutOff:{
        type:String
    },
    recPincode:{
        type:Number
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
        },
        coordinates: {
            type: [Number],
            index: "2dsphere",
        },
        formattedAddress: String,
    }
},{timestamps:true})

recruiterSchema.pre("save", async function (next) {
    const loc = await geocoder.geocode(this.pincode);
    this.location = {
        type: "Point",
        coordinates: [loc[0].latitude, loc[0].longitude],
    };
    next();
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema)
module.exports = Recruiter