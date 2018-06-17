require('dotenv').config();

const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGODB_URL;
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
        const data = req.query;
        db.collection('users').find(data).toArray((err, docs) => {
            res.send(docs);
        });
    });
    app.get('/api/users/:username', (req, res) => {
        const data = { username: req.params.username };
        db.collection('users').findOne(data).then(doc => {
            res.send(doc);
        }).catch(err => {
            res.sendStatus(400);// TODO: different status codes depending on error
        });
    });
    app.post('/api/users/register', (req, res) => {
        const data = req.body;
        // TODO: validation logic
        db.collection('users').insertOne(data).then(result => {
            res.send(data);
        }).catch(err => {
            res.sendStatus(500);// TODO: different status codes depending on error
        });
    });
    app.post('/api/users/login', (req, res) => {
        const data = req.body;
        // TODO: validation logic
        db.collection('users').findOne(data).then(doc => {
            if (doc !== null) {
                res.send(data);
            } else {
                res.sendStatus(400);
            }
        }).catch(err => {
            res.sendStatus(500);// TODO: different status codes depending on error
        });
    });

    app.get('/api/messages', (req, res) => {
        const data = req.query;
        db.collection('messages').find(data).toArray((err, docs) => {
            res.send(docs);
        });
    });
    app.post('/api/messages', (req, res) => {
        const data = req.body;
        // TODO: validation logic
        db.collection('messages').insertOne(data).then(result => {
            res.send(data);
        }).catch(err => {
            res.sendStatus(500);// TODO: different status codes depending on error
        });
    });

    // user search

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
