const presence = new Presence({
    clientId: "831275603428114492" //The client ID of the Application created at https://discordapp.com/developers/applications
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
    //You can use this to get translated strings in their browser language
  });

  let obj;


const now = Date.now();

function httpGet(theUrl) {
  let xmlHttpReq = new XMLHttpRequest();
  xmlHttpReq.open("GET", theUrl, false);
  xmlHttpReq.send(null);
  return xmlHttpReq.responseText;
}


function myOutsideHeavyLiftingFunction(){
  const boofi = httpGet('https://hazel.torontocast.com:1040/api/history/?server=1&limit=1&callback=callback&format=json');
  obj = JSON.parse(boofi);
}




setInterval(myOutsideHeavyLiftingFunction, 10000);


//Run the function separate from the UpdateData event every 10 seconds to get and set the variables which UpdateData picks up
presence.on("UpdateData", async () => {



  const presenceData: PresenceData = {
    largeImageKey:
      "w" /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
    smallImageKey:
      "boofi" /*The key (file name) of the Large Image on the presence. These are uploaded and named in the Rich Presence section of your application, called Art Assets*/,
    smallImageText: "Made by boofi!",  //The text which is displayed when hovering over the small image
    details: obj.objects [0] .metadata,
    startTimestamp: now, //The upper section of the presence text
    state: "DJ: " + obj.objects [0] .dj_name,
    buttons: [
   {
           label: "WarfareFM",
           url: "https://wrfmc.eu/fm"
       },
       {
           label: "WarfareMC",
           url: "https://warfaremc.eu"
       }
   ] //The lower section of the presence text
   //If you want to show Time Left instead of Elapsed, this is the unix epoch timestamp at which the timer ends
  }; /*Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceSata.type = "blahblah"; type examples: details, state, etc.*/

  if (presenceData.details == null) {
    //This will fire if you do not set presence details
    presence.setTrayTitle(); //Clears the tray title for mac users
    presence.setActivity(); /*Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name*/
  } else {
    //This will fire if you set presence details
    presence.setActivity(presenceData); //Update the presence with all the values from the presenceData object
  }
});
