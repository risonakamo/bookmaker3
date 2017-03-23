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

        chrome.storage.local.set(d);
    });
}

function genTableEntry(data)
{
    //comment in to enable data correction
    // data.rank=[0,1,2,3];
    // genPlaces(data);  

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

// function main2()
// {
//     chrome.storage.local.get("pointsdata",function(d){
//         console.log(d.pointsdata);

//         var idata=document.querySelector(".data");
//         var datah="";
//         d.pointsdata.forEach(function(e){
//             datah+=`<p>${e.time} ${e.points[0]} ${e.points[1]} ${e.points[2]} ${e.points[3]}</p>`
//         });

//         idata.innerHTML=datah;
//     });
// }