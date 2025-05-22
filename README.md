# loopback-connector-voipms

LoopBack connector for sending SMS messages using [VoIP.ms](https://voip.ms). Designed to be a drop-in replacement for `loopback-connector-twilio`.

## Features
- Compatible `send({ to, body }, cb)` interface
- Uses VoIP.ms REST API
- Easily swappable with Twilio connector

## Installation
```bash
npm install loopback-connector-voipms --save
```

## Setup
### datasources.json
```json
"voipms": {
  "name": "voipms",
  "connector": "loopback-connector-voipms",
  "apiUsername": "your_voipms_username",
  "apiPassword": "your_voipms_api_password",
  "from": "1234567890"
}
```

## Usage
```js
Voipms.send({
  to: "+15551234567",
  body: "Hello from VoIP.ms!"
}, function(err, response) {
  if (err) return console.error(err);
  console.log('SMS sent:', response);
});
```

## License
MIT