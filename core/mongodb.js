/**
 * Created by boooo on 14-3-12.
 */
//mongodb
var mongo = require('mongodb');
var host = "localhost";
var mongo_port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('Mexpress', new mongo.Server(host, mongo_port,{}), {});

module.exports={
    insert:function(arg){
        console.log('call insert func');
        doArrayInsert.push(arg);
        if(!InsetState){
            doInsert();
        }
    }
}

var InsetState = false;
var doArrayInsert = new Array();
var doInsert = function(){
    InsetState = true;
    console.log('doInsert!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    var collection = doArrayInsert[0].collection;
    var data = doArrayInsert[0].data;
    db.close();
        db.open(function(err,db) {
            db.collection(collection, function(err,collection) {
                collection.insert(data, function(err,docs) {
                    doArrayInsert.shift();
                    db.close();
                    if(doArrayInsert.length>0){
                        doInsert();
                    }else{
                        InsetState = false;
                    }
                });
            });
        });
}