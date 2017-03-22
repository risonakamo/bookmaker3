window.onload=main;

function main()
{
    chrome.storage.local.get("pointsdata",function(d){
        console.log(d.pointsdata);

        var idata=document.querySelector(".data");
        var datah="";
        d.pointsdata.forEach(function(e){
            datah+=`<p>${e.time} ${e.points[0]} ${e.points[1]} ${e.points[2]} ${e.points[3]}</p>`
        });

        idata.innerHTML=datah;
    });
}