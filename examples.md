# Setting up client

```js
//Import package
const Turtle = require("turtle-api");
//Create client
const TurtleClient = new Turtle();
//Set configs
TurtleClient.setWebhook("https://discord.com/api/webhooks/924836154619072533/Vg-UAJE0j3Lhg3ogcDbUlJJEYTzr-o99d7HgKTMyoUO4TfqKlxXqrEc-iQrk4hynmPpv")
.setColor("DARK_GREEN")
.init(86400000);
```