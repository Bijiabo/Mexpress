/**
 * Created by boooo on 14-3-10.
 */
var jade = require('jade'),
    fs = require('co-fs');
var jadeOptions = function(){};
    jadeOptions.prototype.filename = 'jade/index.jade';
    jadeOptions.prototype.pretty = true;
    jadeOptions.prototype.self = false;
    jadeOptions.prototype.debug = false;
    jadeOptions.prototype.compileDebug = false;
    jadeOptions.prototype.author = 'Bijiabo';
    jadeOptions.prototype.data = {};
module.exports=function(app){
    app.get('/',function*(next){
        var options = new jadeOptions();
        options.data = {
            title:'Mexpress Homepage',
            name:'Boooo',
            age:22,
            email:'hu@cafa.me'
        };
        //cookie sessions
        this.cookies.set('user','Bijiabo',{
            signed:true
        });
        this.cookies.set('email','hu@cafa.me',{
            signed:true
        });
        this.body = jade.renderFile('jade/index.jade',options);
    });

    //static
    /*app.get(/^\/static\/[\w\.\/]+/,function*(next){
        var path = this.request.path;
        var pathArray = path.split('/');
        var dir = '.';
        for(var i=0;i<pathArray.length-1;i++){
            if(pathArray[i]!==''){
                dir+='/'+pathArray[i];
            }
        }
        var files = yield fs.readdir(dir);
        var hasFile=false;
        for(var i=0;i<files.length;i++){
            if(pathArray[pathArray.length-1]===files[i]){
                hasFile=true;
            }
        }
        if(hasFile){
            var stat = yield fs.stat('.'+path);
            if (stat.isFile()) {
                var file= yield fs.readFile('.'+path, 'utf8');
                this.body=file;
            }else{
                console.log('is not a file');
            }
        }else{
            console.log('there no this file');
        }
    });*/

    //AQI
    app.get('/AQI',function*(next){
        var options = new jadeOptions();
        options.data = {
            title:'AQI',
            email:'hu@cafa.me'
        };
        this.body = jade.renderFile('jade/AQI.jade',options);
    });

    app.get('/AQI_MOBI',function*(next){
        var options = new jadeOptions();
        options.data = {
            title:'AQI',
            email:'hu@cafa.me'
        };
        this.body = jade.renderFile('jade/AQI_MOBI.jade',options);
    });
}