const express = require('express')
const router = express.Router();
const User = require('../models/User')


router.post('/FetchUser', async(req,res)=>{
    try {
        const data = await User.findOne({email:req.body.email, password:req.body.password});
        if(data){res.status(200).json({success:true})
        console.log(data)}
        else{res.status(404).json({success:false})
    console.log("data not found")}

    } catch (e) {
        console.log(e)
    }
})

module.exports = router

/*async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
} 
.toArray(function(err,data){
            if(err) console.log(Err)
                else{ console.log("found")
                 res.json(data)
            }

            
        }) */