/**
 * Created by boooo on 14-3-12.
 */
/**
 * Created by boooo on 14-3-10.
 */
var dataArray=new Array();
$(document).ready(function(){
    //canvas
    //Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#myChart").get(0).getContext("2d");
    //This will get the first returned node in the jQuery collection.
    var myNewChart = new Chart(ctx);


    //socket
    var socket = io.connect(window.location.protocol+'//'+window.location.hostname+':3001');
    socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });

    socket.on('temperature',function(data){
        console.log(data+new Date());
        var t=Math.round(data*10)/10;
        if(/^[0-9]+$/.test(t)){t=t+'.0';}
        $('.t-info').text(t);

    })

    socket.on('AQI',function(data){
//        $($('#AQI').get(0)).text(data.AQI);
//        console.log(data);
        if(data.AQI!=0){
            dataArray.push(Number(data.AQI));
        }
        if(dataArray.length>10){
            dataArray.shift();
        }
    });

    window.setInterval(function(){
        draw(ctx,dataArray)
    },1000);

    /*setInterval(function(){
     socket.emit('get_temperature',{des:'get_temperature'+new Date()});
     },500);*/
});

var draw = function(ctx,dataArray){
    var allNum = 0;
    for(var i = 0;i<dataArray.length;i++){
        allNum+=dataArray[i];
    }
    var preAQI = allNum/dataArray.length;
    var preAQIarray = new Array();
    /*for(var i = 0;i<=dataArray.length;i++){
        preAQIarray.push(preAQI);
    }*/
    $($('#AQI').get(0)).text('preAQI='+preAQI);
    /*var canvasData = {
        labels : dataArray,
        datasets : [
            {
                fillColor : "rgba(46, 204, 113, 0.3)",
                strokeColor : "#27AE60",
                pointColor : "rgba(46, 204, 113, 0)",
                pointStrokeColor : "rgba(46, 204, 113, 0)",
                data : dataArray
            },
            {
                fillColor : "rgba(46, 204, 113, 0)",
                strokeColor : "#34495E",
                pointColor : "rgba(46, 204, 113, 0)",
                pointStrokeColor : "rgba(46, 204, 113, 0)",
                data : preAQIarray
            }
        ]
    }
    var options = {

        //Boolean - If we show the scale above the chart data
        scaleOverlay : true,

        //Boolean - If we want to override with a hard coded scale
        scaleOverride : false,

        /*//** Required if scaleOverride is true **
        //Number - The number of steps in a hard coded scale
        scaleSteps : null,
        //Number - The value jump in the hard coded scale
        scaleStepWidth : null,
        //Number - The scale starting value
        scaleStartValue : null,

        //String - Colour of the scale line
        scaleLineColor : "rgba(0,0,0,.1)",

        //Number - Pixel width of the scale line
        scaleLineWidth : 1,

        //Boolean - Whether to show labels on the scale
        scaleShowLabels : true,

        //Interpolated JS string - can access value
        scaleLabel : "<%=value%>",

        //String - Scale label font declaration for the scale label
        scaleFontFamily : "'Arial'",

        //Number - Scale label font size in pixels
        scaleFontSize : 12,

        //String - Scale label font weight style
        scaleFontStyle : "normal",

        //String - Scale label font colour
        scaleFontColor : "#666",

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - Whether the line is curved between points
        bezierCurve : true,

        //Boolean - Whether to show a dot for each point
        pointDot : true,

        //Number - Radius of each point dot in pixels
        pointDotRadius : 3,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth : 1,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth : 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill : true,

        //Boolean - Whether to animate the chart
        animation : false,

        //Number - Number of animation steps
        animationSteps : 60,

        //String - Animation easing effect
        animationEasing : "easeOutQuart",

        //Function - Fires when the animation is complete
        onAnimationComplete : null

    };
    new Chart(ctx).Line(canvasData,options);*/
}