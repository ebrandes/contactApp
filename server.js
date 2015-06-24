var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var cors = require('cors');

var db = mongojs("mongodb://dbrandesadmin:dbrandespass@ds041992.mongolab.com:41992/dbrandes", ['contactlist']);


app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));

app.get('/contactList', function(req, res) {
    console.log("I receivet a Get requrest");
    db.contactlist.find(function(err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.post('/contactList', function(req, res) {
    console.log(req.body);
    console.log("I receivet a POST requrest");
    db.contactlist.insert(req.body, function(err, docs) {
        res.json(docs);
    })
});

app.delete('/contactList/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({
        _id: mongojs.ObjectId(id)
    }, function(err, doc) {
        res.json(doc);
    });
});

app.put('/contactList/:id', function(req, res) {
    var id = req.params.id;
    db.contactlist.findAndModify({
            query: {
                _id: mongojs.ObjectId(id)
            },
            update: {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    number: req.body.number
                }
            },
            new: true
        }, function(err, docs) {
            res.json(docs);
        });
});


app.listen(3000);
console.log("Server running on port 3000");