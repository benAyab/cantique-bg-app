// Import de Mongoose 
var mongoose = require('mongoose');

const properties = require('./properties');

const {LOCAL_DB, REMOTE_DB} = properties 

module.exports = function(){
    //LOCAL_DB & REMOTE_DB
    mongoose.connect(REMOTE_DB, {useNewUrlParser: true});

    mongoose.connection.on('connected', function(){
        console.log("Connected via url: ",REMOTE_DB)
    });

    mongoose.connection.on('error', function(){
        console.error("an error occured. Detail: ", error.message)
    });

    mongoose.connection.on('disconnected', function(){
        console.log('Disconneted from Mongodb')
    });
    
    process.on('SIGINT', function(){
		mongoose.connection.close(function(){
			console.log('Disconneted from Mongodb due to application exit');
			process.exit(0);
		})  
    })    
}