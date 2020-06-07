const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb+srv://mkerekes_mongo:hn79wt@cluster0-p1v4h.mongodb.net/';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'varadinum-instructional' });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to mongo at ${url}`));
