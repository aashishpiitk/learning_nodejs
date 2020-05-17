const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboperations = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = "conFusion";

MongoClient.connect(url).then((client) => {
    //assert.equal(err,null);

    console.log("Connected correctly to mongodb server");

    const db = client.db(dbname);
    //const dishes = db.collection("dishes");
    
    dboperations.insertDocument(db, {name:"uthapizza",description:"uthappam+pizza"}, 
        "dishes")
        .then((result) => {

        console.log("Insert Document\n",result.ops);

        return dboperations.findDocuments(db, "dishes")
        })
        .then((docs) => {

            console.log("Found documents\n",docs);

            return dboperations.updateDocument(db, {name:"uthapizza"}, {name:"uthappizza"}, "dishes")
        })
        .then((update) => {
            console.log("updated documetns",update.result);

            return dboperations.findDocuments(db, "dishes")
        })
        .then((docs) => {
            console.log("found documents",docs);

            return dboperations.removeDocument(db, {name:"uthappizza"}, "dishes")
        })
        .then((result) => {

            console.log("removed the document",result);
            return client.close();
        })
        .catch((err) => console.log(err));
})
.catch((err) => console.log(err));
