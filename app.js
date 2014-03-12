/**
 * Created by boooo on 14-3-3.
 */
var serve = require('koa-static'),
    koa = require('koa'),
    router = require('koa-router'),
    jade = require('jade'),
    io = require('socket.io'),
    fs = require('co-fs'),
    socket = require('./core/socket'),
    coreRouter = require('./core/router'),
    db = require('./core/mongodb');

//koa
var app = koa();
var port = '3000';
/*var jadeOptions = function(){};
    jadeOptions.prototype.filename = 'jade/index.jade';
    jadeOptions.prototype.pretty = true;
    jadeOptions.prototype.self = false;
    jadeOptions.prototype.debug = false;
    jadeOptions.prototype.compileDebug = false;
    jadeOptions.prototype.author = 'Bijiabo';
    jadeOptions.prototype.data = {};*/
app.keys = ['Changeit','biubiubiu'];

app.use(serve('.'));
app.use(router(app));
coreRouter(app);
/*app.use(function *(next){
    console.log('this.request.query='+this.request.query);
    console.log('this.request.method='+this.request.method);
    console.log('this.request.host='+this.request.host);
    console.log('this.request.path='+this.request.path);
    var path = this.request.path;
    if(/^\/static\/.+/.test(path)){
        var file= yield fs.readFile('./'+path, 'utf8');
        this.body=file;
    }else{
        yield next;
    }
});*/

// response
/*app.use(function *(){
//    this.body = 'Hello World';
    var options = new jadeOptions();
    options.data = {
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
});*/

//error
app.on('error', function(err, ctx){
    log.error('server error', err, ctx);
});


io=io.listen(3001);
socket(io.sockets);

app.listen(port);