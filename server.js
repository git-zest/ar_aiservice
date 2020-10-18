var express = require('express');
var app = express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
var bodyparser = require('body-parser');
var session = require('express-session')
//var DOMParser= require('DOMParser');
// Helmet
app.use(helmet());
// Rate Limiting
const limit = rateLimit({
    max: 100,// max requests
    windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout
    message: 'Too many requests' // message to send
});
app.use('/routeName', limit); // Setting limiter on specific route

// Body Parser
app.use(express.json({ limit: '20kb' })); // Body limit is 10
// Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());
// Data Sanitization against XSS attacks
app.use(xss())


app.use(express.static(__dirname+'/htmlpath'));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'jsdhfkadshfkasdnkfjhasukhdkjasnlf',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// Init Middleware
app.use(express.json());


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
// Define Routes

  // Set static folder
//app.get('*', (req, res) => {
//    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//});


// Post method login
app.post('/api/submitapplication', function(req,res){
  console.log(req);
  const MongoClient = require('mongodb').MongoClient;



  const uri = "mongodb+srv://xmluser:xmluser@xmlapp.y4ioi.mongodb.net/xmlapp?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("xmlapp").collection("xmlgenerator");
    collection.find({}).toArray(function(err, docs) {
    //assert.equal(err, null);
    //console.log("Found the following records");
    //console.log(docs.status)
    res.send(docs[0].status);
    });
    client.close();
  });

})



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
