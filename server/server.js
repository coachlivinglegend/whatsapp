import express from 'express'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import Messages from './dbMessages.js'


//app configuration
const app = express()
const port = process.env.PORT || 5000;


//middlewares
app.use(express.json())
const pusher = new Pusher({
    appId: '1078994',
    key: '32f57dadcb8ff9637c3c',
    secret: '0f2c30d199195ee83ade',
    cluster: 'eu',
    encrypted: true
});

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})

//routes
app.get('/', (req, res) => {
    console.log('YKTV')
    res.status(200).send('hello world')
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (error, data) => {
        if (error) {
            res.status(500).send(err)
        } else {
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
})

app.get('/messages/sync', (req, res) => {
    Messages.find((error, data) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.status(200).send(data)
        }
    })
})

//DATABASE config
const mongodb_connection_url = 'mongodb+srv://admin:kRYqlnA1Iz5oE1Ud@cluster0.kl9ix.mongodb.net/whatsappMDB?retryWrites=true&w=majority'
mongoose.connect(mongodb_connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.once('open', () => {
    console.log('DB is connected')
    
    // const msgCollection = db.collection("messagecontents");
    // const changeStream = msgCollection.watch()
    const changeStream = Messages.watch()

    changeStream.on('change', (change) => {
        console.log(change)

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                _id: messageDetails._id,
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            })
        } else {
            console.log("Error triggering pusher.")
        }
    })
})



app.listen(port, () => console.log(`app is running on localhost:${port}`))