const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var MongoDB = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'nrf2020';
const client = new MongoClient(url, {useNewUrlParser: true});
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
});

const init = function(data, callback) {
    const db = client.db(dbName);
    const collection = db.collection('tags');
    collection.drop()
    collection.ensureIndex("epc", function(err, result) {
        collection.insertMany(data, function(err, res) {
            callback(res, err)
        })
    });
}
const getTags = function(params, callback) {
    const db = client.db(dbName);
    const collection = db.collection('tags');
    collection.find(params).toArray(function(err, result) {
        callback(result, err)
    });
}

const updateTag = function(data, callback) {
    const db = client.db(dbName);
    const collection = db.collection('tags');
    console.log('updating data', data.epc);
    collection.update({"epc": data.epc}, data, function(err, result) {
        callback(result, err);
    })
}

const updatePickList = function(data, callback){
  // Use connect method to connect to the server
    const db = client.db(dbName);
    const collection = db.collection('tags');
    collection.update({"epc": data.epc}, {"$set": {"pickList": data.pickList}}, function(err, result) {
        callback(result, err);
    })
};



module.exports = {
    updatePickList: updatePickList,
    updateTag: updateTag,
    getTags: getTags,
    init: init
 };


