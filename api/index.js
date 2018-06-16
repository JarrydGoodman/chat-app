const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://@chatcluster-w8rlx.mongodb.net/chat-app?retryWrites=true';
const dbName = 'chat-app';

MongoClient.connect(url, function (err, client) {
    if (err) throw err;
    
    const app = express();
    const db = client.db(dbName);

    /**
     * Test Route
     */
    app.get('/', (req, res) => res.send('Hello world'));

    /**
     * Middleware
     */
    app.use(express.json());
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    /**
     * Requests
     */
    app.get('/api/users', (req, res) => {
        db.collection('users').find().toArray((err, docs) => {
            res.send(docs);
        });
    });
    app.post('/api/users/register', (req, res) => {
        const data = req.body;
        // TODO: validation logic
        db.collection('users').insertOne(data).then(result => {
            res.sendStatus(200);
        });
    });

    // TODO:
    // user login
    // user get
    // message create
    // messages get
    // messages search


    /**
     * Create HTTP Server
     */
    const server = app.listen(3000, () => console.log('Chat-API:3000'));
    server.on('close', function() {
        client.close();
    });
    process.on('SIGINT', function() {
        server.close();
    });
});
