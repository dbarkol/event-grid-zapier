var obj = JSON.parse(inputData.rawBody);

if (inputData.eventType === 'SubscriptionValidation') {     
  
  fetch(obj[0].data.validationUrl)
    .then(function(res) {
      return res.text();
    })
    .then(function(body) {
      var output = {eventType: inputData.eventType};
      callback(null, output);
    })
    .catch(callback);  
  
} else if (inputData.eventType === 'Notification'){

  var artist = obj[0].data.artist;
  var song = obj[0].data.song; 
  var body = {"text": artist + " - " + song, "icon_emoji": ":musical_note:"};
  var slackUrl = "https://hooks.slack.com/services/{{slack-key}}";

  fetch(slackUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers:{'Content-Type':'application/json'}
    })
      .then(function(res) {
        return res.text();
      })
      .then(function(body) {
        var output = {eventType: inputData.eventType};
        callback(null, output);
      })
      .catch(callback);   
}
