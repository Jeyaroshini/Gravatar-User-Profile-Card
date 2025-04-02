/* eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require("crypto");
const axios = require("axios");
const functions = require("firebase-functions");
const admin = require('firebase-admin');

const firebaseConfig = {
    apiKey: "AIzaSyDGqLxFQ6JmfTylwCSFU_-7oX9CjwxvxBI",
    authDomain: "gravatar-user-profiles.firebaseapp.com",
    projectId: "gravatar-user-profiles",
    storageBucket: "gravatar-user-profiles.firebasestorage.app",
    messagingSenderId: "244535976144",
    appId: "1:244535976144:web:4de1d8c8077cf89e00bed5"
};
admin.initializeApp(firebaseConfig);
const db = admin.firestore();

// create express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//post user profile form details to firestore additionally get gravatar user details using api by user form email
app.post('/users/profiles', async (req, res) => {
    try{
        console.log("req.body", JSON.stringify(req.body));
        const { email, fullName, userName, phoneNumber, city, country, bio, socialLinks } = req.body;
        const userRef = db.collection('users-profiles').doc(email);
        const snapshot = await userRef.get();
        if (snapshot.exists) {
            return res.status(400).send('User already exists');
        }
        const emailHash = getGravatarEmailHash(email);
        let gravatar = {};
        try{
            gravatar = await axios.get(`https://api.gravatar.com/v3/profiles/${emailHash}`, {
                headers: {
                    Authorization: `Bearer 3687:gk-L9_K5vSDjsV3o5NPex16M66MutlS7hUTqD6j1jFR_4YyNpMRuWOiAQI9xdcnw`
                }
            });
        }
        catch(err){
            console.log(JSON.stringify(err));
        }
        console.log("gravatar", gravatar.data);
        const gravatarData = gravatar.data ? gravatar.data : null;
        let gravatarCutome = null;
        if(gravatarData){
            gravatarCutome = {
                userName: gravatarData.display_name || "",
                profile_url: gravatarData.profile_url || "",
                avatar_url: gravatarData.avatar_url ? { url: gravatarData.avatar_url || "", background_color: gravatarData.background_color || "" } : "",
                location: gravatarData.location || "",
                bio: gravatarData.description || "",
            }
        }
        console.log({ email, fullName, userName, phoneNumber, city, country, location: `${city}, ${country}`, bio, socialLinks, gravatar: gravatarCutome, gravatarOrginal: gravatarData, createdTime: new Date().toISOString() });
        let resultData = { 
            email, 
            fullName, 
            userName, 
            phoneNumber, 
            city, 
            country, 
            location: `${city}, ${country}`, 
            bio, 
            socialLinks, 
            gravatar: gravatarCutome || {}, 
            gravatarOrginal: gravatarData || {},
            createdTime: new Date().toISOString()
        }
        await userRef.set(resultData, { merge: true });
        const doc = await userRef.get();
        return res.status(201).send(resultData);
    }
    catch(error){
        console.log(error, JSON.stringify(error));
        return res.status( error.response ? error.response.status : 500 ).json( { error: "Internal server error!" } );
    }
});


const getGravatarEmailHash = function(email){
    try{
        const hash = crypto.createHash( 'sha256' ).update(email.trim().toLowerCase()).digest( 'hex' );
        return hash;
    }
    catch(err){
        console.log(err);
        return null;
    }
};


exports.v1 = functions.https.onRequest(app);