const presence = new Presence({
    clientId: "831275603428114492"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
const now = Date.now();
function myOutsideHeavyLiftingFunction() {
}
setInterval(myOutsideHeavyLiftingFunction, 10000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "w",
        smallImageKey: "w",
        smallImageText: "Made by boofi!",
        details: "https://wrfmc.eu/fm",
        startTimestamp: now,
        state: "Rádio WarfareFM",
        buttons: [
            {
                label: "WarfareFM",
                url: "https://wrfmc.eu/fm"
            },
            {
                label: "WarfareMC",
                url: "https://Warfaremc.eu"
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
