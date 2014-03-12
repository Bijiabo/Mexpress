/**
 * Created by boooo on 14-3-9.
 */
var uno = require('./serialPort'),
    db = require('./mongodb');
var AQI = 0;
uno(function(x){
    console.log('run uno func');
    AQI = Math.round(Number(x));
    insertOK = db.insert({
        collection:'AQI',
        data:{
            AQI:AQI,
            time:new Date()
        }
    });
})
module.exports=function(io){
    io.on('connection', function (socket) {
        setInterval(function(){
           socket.emit('AQI',{AQI:AQI});
        },1000);
//        socket.emit('news', { hello: 2014 });
        socket.on('my other event', function (data) {
//            console.log(data);
        });
        socket.on('get_temperature',function(data){
//            console.log(data);
            socket.emit('temperature',2014);
        })
    });
}
