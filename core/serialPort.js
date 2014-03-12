/**
 * Created by boooo on 14-3-9.
 */
var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/ttyUSB1", {
    baudrate: 9600
}, false);
var dataCache = '';
var oldData = '';
module.exports=function(callback){
    serialPort.open(function () {
        console.log('open');
        serialPort.on('data', function(data) {
            var data2buffer=new Buffer(data);
//            console.log(data2buffer.toString('utf8',0));
            var data = data2buffer.toString('utf8',0);
            if(/^[\r\n\t]+$/.test(data)){
                oldData=dataCache;
                dataCache='';
                if(oldData!=''){
                    var voltage = oldData;
                    console.log('voltage==========='+voltage);
                    var AQI = (voltage-0.5)/6.25*1000;
                    if(AQI>0){
                        callback(AQI);
                    }
                    /*if(voltage>(8*5/1024)){
                        var dustnumber=(voltage*1024/5-0.0356)*120000;
                    }else{
                        var dustnumber=voltage*52*1024/5;
                    }

                    if(voltage>(184.5*5/1024)){
//                        console.log('voltage>>>>>>>>>>>>>(184.5*5/1024)');
                        var dustValPM25=0.83984375*voltage*1024/5-99.9;
                    }else{
//                        console.log('voltage<<<<<<<<<<<<<(184.5*5/1024)');
                        var dustValPM25=voltage*0.298373984*1024/5;
                    }

                    console.log('PM2.5>>>>>>>>>>>>>>>>>>>>>>>'+dustValPM25);

                    if(dustValPM25<15.4){
                        AQI=(50-0)/(15.4-0)*(dustValPM25-0)+0;
                    }else if(dustValPM25<40.4){
                        AQI=(100-51)/(40.4-15.5)*(dustValPM25-15.5)+51;
                    }else if(dustValPM25<65.4){
                        AQI=(150-101)/(65.4-40.5)*(dustValPM25-40.5)+101;
                    }else if(dustValPM25<150.4){
                        AQI=(200-151)/(150.4-65.5)*(dustValPM25-65.5)+151;
                    }else if(dustValPM25<250.4){
                        AQI=(300-201)/(250.4-150.5)*(dustValPM25-150.5)+201;
                    }else if(dustValPM25<350.4){
                        AQI=(400-301)/(350.4-250.5)*(dustValPM25-250.5)+301;
                    }else{
                        AQI=(500-401)/(500.4-350.5)*(dustValPM25-350.5)+401;
                    }*/
                }
            }else{
                dataCache+=data;
            }
        });
    });
}
