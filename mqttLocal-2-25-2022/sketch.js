let incoming; // variable for most recent incoming message
let inpt;
let msgs=[]; // array to store all incoming messages

function setup() {
  createCanvas(windowWidth, windowHeight);

  // UI using DOM
  inpt = createInput("Write some thing");
  sendButton = createButton("Enter message");
  inpt.position(20,20);
  sendButton.position(20,40);
  sendButton.mousePressed(submitCode);
  textSize(50);
}

function submitCode(){
  let msg = inpt.value();
  client.publish('escape',msg);
}

function draw() {
  background(255,255,0);
  noStroke();
  fill(0);
  // show all the messages on screen
  for(word in msgs){
    text(msgs[word],30,word*60+100)
  }
}

//// for connecting to Shiftr Cloud Broker:
// const client = mqtt.connect('wss://YOUR-BROKER-INSTANCE.cloud.shiftr.io   :443', {
//   clientId: 'YOUR CLIENT ID',
//   username: 'YOUR USER KEY',
//   password: 'YOUR TOKEN'
// });


// for running locally
// local host for your own computer. Use port 1884
// ip address for another computer on the network.
// for example
// const client = mqtt.connect('ws://10.XX.XX.XXX:1884', {
//   clientId: 'MY COOL Descriptive ID'
// });


const client = mqtt.connect('ws://localhost:1884', {
  clientId: 'p5 Local - RIOS'
});


client.on('connect', function () {
  console.log('connected!');

  client.subscribe('escape');

  setInterval(function () {
    client.publish('alive', 'yes');
  }, 45000);
});

client.on('message', function (topic, message) {
  console.log(topic + ': ' + message.toString());
  incoming = message.toString();
  msgs.splice(0,0,incoming);
});
