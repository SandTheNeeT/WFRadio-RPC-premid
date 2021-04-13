const presence = new Presence({
    clientId: "831275603428114492"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
let obj;
const now = Date.now();
function httpGet(theUrl) {
    let xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", theUrl, false);
    xmlHttpReq.send(null);
    return xmlHttpReq.responseText;
}
function myOutsideHeavyLiftingFunction() {
    const boofi = httpGet('https://hazel.torontocast.com:1040/api/history/?server=1&limit=1&callback=callback&format=json');
    obj = JSON.parse(boofi);
}
setInterval(myOutsideHeavyLiftingFunction, 10000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "w",
        smallImageKey: "w",
        smallImageText: "Made by boofi!",
        details: "Currently playing: " + obj.objects[0].metadata,
        startTimestamp: now,
        state: "Current DJ: " + obj.objects[0].dj_name,
        buttons: [
            {
                label: "WarfareFM",
                url: "https://wrfmc.eu/fm"
            },
            {
                label: "WarfareMC",
                url: "https://warfaremc.eu"
            }
        ]
    };
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
