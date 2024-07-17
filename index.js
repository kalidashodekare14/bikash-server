const express = require('express')
const cors = require('cors')
require('dotenv').config()
const bcrypt = require('bcryptjs');
const app = express()
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())


// kalidashodekare14
// zfDrNM3BRteboh3H


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://kalidashodekare14:zfDrNM3BRteboh3H@cluster0.bcypa7e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const userRegistered = client.db('registered-user').collection('users')

        app.post('/users-register', async (req, res) => {
            const { name, pin, number, email } = req.body
            if(!name || !pin || !number || !email){
                return res.status(400).send({message: "All fields are required"})
            }
            if(!/^\d{5}$/.test(pin)){
                return res.status(401).send({message: "PIN must be a 5-digit number"})
            }
            const hashpin = await bcrypt.hash(pin, 10)
            const newUser = { name, pin: hashpin, mobileNumber, email, status: 'pending', balance: 0 }
            console.log(newUser)
            const result = await userRegistered.insertOne(newUser)
            res.send(result)
        })

        app.post('/users-login', async (req, res) => {
            const { email, pin } = req.body
            const users = await userRegistered.findOne({ email })
            // email check
            if (!users) {
                return res.status(400).json({ message: "invalid email or Pin" })
            }
            const isMath = await bcrypt.compare(pin, users.pin)
            if (!isMath) {
                res.status(400).json({ message: "Invalid email or PIN" })
            }
            res.send(isMath)
        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('bikash is running')
})

app.listen(port, () => {
    console.log(`bikash app is running ${port}`)
})


