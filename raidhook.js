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

    var points={points:[],rank:[0,1,2,3]};

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

//use on points object to sort rank data
function genPlaces(d)
{
    cswap(d,0,1);
    cswap(d,2,3);
    cswap(d,0,2);
    cswap(d,1,3);
    cswap(d,1,2);
}

function cswap(d,i1,i2)
{
    if (d.points[d.rank[i1]]<d.points[d.rank[i2]])
    {
        return;
    }

    var a=d.rank[i1];
    d.rank[i1]=d.rank[i2];
    d.rank[i2]=a;
}

runHook();