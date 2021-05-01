const functions = require("firebase-functions");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')('sk_test_51IkPqiGLEib1NsjWT3enkIr69g4Wc04odmeEZVTgRXrhnufbglwzlIxWWQB5Dy0nPtlOP8lioQRrJXafKE5HWbTE00Y1C8f47z')

//API

//APP config
const app = express()

//Middlewares
app.use(cors({origin: true}))
app.use(express.json())

//API routes
// app.get('/', (request, response) => response.status(200).send('hello world'))
// app.get('/programmer', (request, response) => response.status(200).send('프로그래머'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total 
    console.log('Payment Request Recieve', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency 
        currency: 'usd' 
    })
    //201: created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//Listen command
exports.api = functions.https.onRequest(app)

//Example endpoint
//http://localhost:5001/clone-3cea9/us-central1/api
