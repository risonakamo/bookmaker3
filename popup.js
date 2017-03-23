window.onload=main;

//raid url:
var raidurl="http://game.granbluefantasy.jp/#event/teamraid028/bookmaker"

function main()
{
    linkSet();

    chrome.storage.local.get("pointsdata",function(d){
        var html="";
        
        d.pointsdata.forEach(function(e){
            html+=genTableEntry(e);
        });

        var ipoint=document.querySelector(".tdata tbody");

        ipoint.innerHTML=ipoint.innerHTML+html;

        // chrome.storage.local.set(d);
    });
}

function genTableEntry(data)
{
    //comment in to enable data correction
    // data.rank=new Array(4);
    // return genPlaces(data);

    return `<tr>
<td>${data.time}</td>
<td class="tc${data.rank[0]}">${data.points[0]}</td>
<td class="tc${data.rank[1]}">${data.points[1]}</td>
<td class="tc${data.rank[2]}">${data.points[2]}</td>
<td class="tc${data.rank[3]}">${data.points[3]}</td>
</tr>\n`;
    
}

function linkSet()
{
    var bookmakerLink=document.querySelector(".blink");

    bookmakerLink.addEventListener("click",function(e){
        e.preventDefault();

        chrome.tabs.create({url:raidurl});
    });
}

function genPlaces(d)
{    
    var ra=[];

    for (var x=0;x<4;x++)
    {
        ra.push({p:d.points[x],r:x});
    }

    ra.sort(rCompare);

    console.log(ra);
    
    for (var x=0;x<4;x++)
    {
        d.rank[ra[x].r]=x;
    }

    return `<tr>
<td>${d.time}</td>
<td class="tc${d.rank[0]}">${d.points[0]}</td>
<td class="tc${d.rank[1]}">${d.points[1]}</td>
<td class="tc${d.rank[2]}">${d.points[2]}</td>
<td class="tc${d.rank[3]}">${d.points[3]}</td>
</tr>\n`;
}

function rCompare(a,b)
{
    if (parseInt(a.p)<parseInt(b.p))
    {
        return -1;
    }

    return 1;
}
