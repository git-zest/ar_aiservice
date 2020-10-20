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

app.get('/api/getlastapplicationnumber', function(req,res){
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://xmluser:xmluser@xmlapp.y4ioi.mongodb.net/xmlapp?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("xmlapp").collection("worklist");
    collection.find({}).toArray(function(err, docs) {
      var totallength=docs.length
      console.log(docs[totallength-1].applicationnumber);
      var applicationnumber=""+docs[totallength-1].applicationnumber
      res.send(applicationnumber);
    })
});
});


app.get('/api/getlastcarname', function(req,res){
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://xmluser:xmluser@xmlapp.y4ioi.mongodb.net/xmlapp?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("xmlapp").collection("worklist");
    collection.find({}).toArray(function(err, docs) {
      var totallength=docs.length
      console.log(docs[totallength-1].carname);
      var applicationnumber="Car:"+docs[totallength-1].carname+"    "  + "Variant:"+docs[totallength-1].variant
      res.send(applicationnumber);
    })
});
});

app.get('/api/getlaststatus', function(req,res){
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://xmluser:xmluser@xmlapp.y4ioi.mongodb.net/xmlapp?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("xmlapp").collection("worklist");
    collection.find({}).toArray(function(err, docs) {
      var totallength=docs.length
      console.log(docs[totallength-1].carname);
      var applicationnumber=docs[totallength-1].status;
      res.send(applicationnumber);
    })
});
});


app.get('/api/getlastbeforeapplicationnumber', function(req,res){
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://xmluser:xmluser@xmlapp.y4ioi.mongodb.net/xmlapp?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("xmlapp").collection("worklist");
    collection.find({}).toArray(function(err, docs) {
      var totallength=docs.length
      console.log(docs[totallength-2].applicationnumber);
      var applicationnumber=""+docs[totallength-2].applicationnumber
      res.send(applicationnumber);
    })
});
});


app.get('/api/getlastbeforecarname', function(req,res){
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://xmluser:xmluser@xmlapp.y4ioi.mongodb.net/xmlapp?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("xmlapp").collection("worklist");
    collection.find({}).toArray(function(err, docs) {
      var totallength=docs.length
      console.log(docs[totallength-2].carname);
      var applicationnumber="Car:"+docs[totallength-2].carname+"    " + "Variant:"+docs[totallength-2].variant
      res.send(applicationnumber);
    })
});
});

app.get('/api/getlastbeforestatus', function(req,res){
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://xmluser:xmluser@xmlapp.y4ioi.mongodb.net/xmlapp?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    const collection = client.db("xmlapp").collection("worklist");
    collection.find({}).toArray(function(err, docs) {
      var totallength=docs.length
      console.log(docs[totallength-2].carname);
      var applicationnumber=docs[totallength-2].status;
      res.send(applicationnumber);
    })
});
});


app.post('/api/motivateapplication', function(req,res){
  console.log(req);
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://xmluser:xmluser@xmlapp.y4ioi.mongodb.net/xmlapp?retryWrites=true&w=majority";
  MongoClient.connect(uri, function(err, client1) {
    console.log("Connected successfully to server");
    const db1 = client1.db("xmlapp");
    const collection1 = db1.collection("worklist");
    var num = Math.floor(Math.random() * 90000) + 10000;
    collection1.insertOne({applicationnumber:num,name:"Ravi Kastala", carname:"Lamborghini",variant:"Huracan",status:"Arbitration"}, function(err, result) {
      client1.close();

      if(err){
        res.send('Approved');
      }else{
        res.send('Approved');
      }

    })
  });

})

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
    if(docs[0].status=='Approved'){
    MongoClient.connect(uri, function(err, client1) {
      console.log("Connected successfully to server");
      const db1 = client1.db("xmlapp");
      const collection1 = db1.collection("worklist");
      var num = Math.floor(Math.random() * 90000) + 10000;
      collection1.insertOne({applicationnumber:num,name:"Ravi Kastala", carname:"Lamborghini",variant:"Huracan",status:"Approved"}, function(err, result) {
        client1.close();
        client.close();
        res.send(docs[0].status);
      })
    });
    }
    else{
      client.close();
      res.send(docs[0].status);
    }
    });
  });
})



const PORT =  5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
