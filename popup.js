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
    });
}

function genTableEntry(data)
{
    return `<tr>
<td>${data.time}</td>
<td>${data.points[0]}</td>
<td>${data.points[1]}</td>
<td>${data.points[2]}</td>
<td>${data.points[3]}</td>
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