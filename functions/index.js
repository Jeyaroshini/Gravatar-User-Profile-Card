/* eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require("crypto");
const axios = require("axios");
const functions = require("firebase-functions");
const admin = require('firebase-admin');

// Configure CORS
const corsOptions = {
    origin: true, // or specify your domains in production
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200 // some legacy browsers choke on 204
};

// Initialize Firebase
try {
    // When running locally
    const serviceAccount = require('./service-account-key.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        ...(serviceAccount.project_id && { 
            databaseURL: `https://${serviceAccount.project_id}.firebaseio.com` 
        })
    });
} catch (error) {
    // In production (Firebase automatically initializes)
    console.log('Using default Firebase initialization');
    admin.initializeApp();
}

const db = admin.firestore();

// Create express app
const app = express();

// Middleware setup
app.use(cors(corsOptions)); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Helper function
const getGravatarEmailHash = function (email) {
    try {
        return crypto.createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
    } catch (err) {
        console.log(err);
        return null;
    }
};

// Route handler
app.post('/users/profiles', async (req, res) => {
    try {
        console.log("req.body", JSON.stringify(req.body));
        const { email, fullName, userName, phoneNumber, city, country, bio, socialLinks } = req.body;
        
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const userRef = db.collection('users-profiles').doc(email);
        const snapshot = await userRef.get();
        
        if (snapshot.exists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const emailHash = getGravatarEmailHash(email);
        let gravatar = {};
        
        try {
            const response = await axios.get(`https://api.gravatar.com/v3/profiles/${emailHash}`, {
                headers: {
                    Authorization: `Bearer 3687:gk-L9_K5vSDjsV3o5NPex16M66MutlS7hUTqD6j1jFR_4YyNpMRuWOiAQI9xdcnw`
                }
            });
            gravatar = response.data;
        } catch (err) {
            console.log("Gravatar API error:", err.message);
        }

        const gravatarData = gravatar || null;
        let gravatarCustom = null;
        
        if (gravatarData) {
            gravatarCustom = {
                userName: gravatarData.display_name || "",
                profile_url: gravatarData.profile_url || "",
                avatar_url: gravatarData.avatar_url ? { 
                    url: gravatarData.avatar_url || "", 
                    background_color: gravatarData.background_color || "" 
                } : "",
                location: gravatarData.location || "",
                bio: gravatarData.description || "",
            }
        }

        const resultData = {
            email,
            fullName,
            userName,
            phoneNumber,
            city,
            country,
            location: `${city}, ${country}`,
            bio,
            socialLinks,
            gravatar: gravatarCustom || {},
            gravatarOrginal: gravatarData || {},
            createdTime: new Date().toISOString()
        };

        await userRef.set(resultData, { merge: true });
        return res.status(201).json(resultData);
    } catch (error) {
        console.error("Error in /users/profiles:", error);
        return res.status(500).json({ 
            error: "Internal server error",
            message: error.message 
        });
    }
});

exports.v1 = functions.https.onRequest(app);
