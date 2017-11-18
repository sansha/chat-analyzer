const http = require('https');

const options = {
  hostname: 'westcentralus.api.cognitive.microsoft.com',
  path: '/text/analytics/v2.0/sentiment',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '840286916667468a900a9d9907cd6cd1'
  }
};

data = {
  documents: [

  ]
};

messages = ['Also nur C (die Menge)? War schon was komplizierteres, wenn ich mich richtig erinnere. (Falls du nicht raffst, warum ich die Lösung gesehen hab: Hab Alina noch gefunden)',
            'Achso Mittwochs werden die veröffentlicht. Dachte iwie Montags',
            'Hallo?',
            'Geh halt hin man 😂\
Entweder sie sind weg oder noch tief in den Aufgaben',
            'Denke mal, da stimmt was nicht. Mit Lösungsweg könnte man da natürlich mehr zu sagen :D'];

messages.forEach((msg, i) => {
  document = {
    language: 'de',
    id: '' + i,
    text: msg
  }
  data.documents.push(document);
});

console.log(data);

var post = http.request(options, res => {
  res.setEncoding('utf8');
  res.on('data', chunk => {
    //console.log('Response: ' + chunk);
    var resp = JSON.parse(chunk);
    resp.documents.forEach(doc => {
      console.log(messages[doc.id ] + ': ' + doc.score);
    });
  });
});
console.log(JSON.stringify(data))

post.write(JSON.stringify(data));
post.end();
