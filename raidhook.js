function runHook()
{
    console.log("runhook");
    var newData=hook();

    if (newData==-1)
    {
        setTimeout(function(){
            runHook();
        },1000);
        return;
    }

    chrome.storage.local.get("pointsdata",function(d){
        if (!d.pointsdata)
        {
            d.pointsdata=[];
        }

        //if new data point's first point is the same as the last data set's
        //first point (new data is not new data)
        if (d.pointsdata[d.pointsdata.length-1].points[0]==newData.points[0])
        {
            console.log("repeat");
            return;
        }

        d.pointsdata.push(newData);

        chrome.storage.local.set(d);
    });
}

function hook()
{
    var areas=document.querySelectorAll(".point");

    if (areas.length!=4 || areas[0].innerHTML=="")
    {
        return -1;
    }

    var points={points:[]};

    areas.forEach(function(e){
        points.points.push(e.innerHTML);
    });

    points.time=strTime();

    return points;
}

function strTime()
{
    var d=new Date();
    var m=d.getMinutes();

    if (m.length==1)
    {
        m="0"+m;
    }

    return d.getHours()+":"+m;
}

runHook();