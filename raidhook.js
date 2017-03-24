function runHook()
{
    //raid hash:
    if (window.location.hash!="#event/teamraid028/bookmaker")
    {
        return;
    }

    console.log("raidhook...");
    var newData=hook();

    if (newData==-1)
    {
        setTimeout(function(){
            runHook();
        },1000);
        return;
    }

    chrome.storage.local.get("pointsdata",function(d){
        console.log("hooked");

        if (!d.pointsdata)
        {
            d.pointsdata=[];
        }

        //if new data point's first point is the same as the last data set's
        //first point (new data is not new data)
        if (d.pointsdata[d.pointsdata.length-1].points[0]==newData.points[0])
        {
            console.log("repeat data");
            return;
        }

        console.log("new data");
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

    genPlaces(points);
    return points;
}

function strTime()
{
    var d=new Date();
    var m=d.getMinutes();

    if (m<10)
    {
        m="0"+m;
    }

    return d.getHours()+":"+m;
}

function genPlaces(d)
{
    d.rank=new Array(4);
    var ra=[];

    for (var x=0;x<4;x++)
    {
        ra.push({p:d.points[x],r:x});
    }

    ra.sort(rCompare);

    for (var x=0;x<4;x++)
    {
        d.rank[ra[x].r]=x;
    }    
}

function rCompare(a,b)
{
    if (parseInt(a.p)<parseInt(b.p))
    {
        return -1;
    }

    return 1;
}
runHook();
