const assert = require('assert');



exports.insertDocument = (db, document, collection, callback) => {
    
    const coll = db.collection(collection);
    return coll.insertOne(document);
    // coll.insertOne(document, (err, result) => {

    //     assert.equal(err, null);
    //     console.log("document inserted"+result.insertedId);
    //     callback(result);
    // });
};



exports.findDocuments = (db, collection, callback) => {

    const coll = db.collection(collection);
    return coll.find({}).toArray();
    // coll.find({}).toArray((err, docs) => {
        
    //     assert.equal(err, null);
    //     console.log("documents found ");
    //     callback(docs);
    // });
};



exports.removeDocument = (db, document, collection, callback) => {

    const coll = db.collection(collection);
    return coll.deleteOne(document);
    // coll.deleteOne(document, (err, result) => {

    //     assert.equal(err, null);
    //     console.log("document deleted");
    //     callback(result);
    // });
};

exports.updateDocument = (db, document, update, collection, callback) => {

    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update}, null);
    // coll.updateOne(document, { $set: update}, null, (err, result) => {

    //     assert.equal(err, null);
    //     console.log("document updated",update);
    //     callback(result);
    // });
};
