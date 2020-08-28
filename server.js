/*

This module creates an HTTPS web server and serves static content
from a specified directory on a specified port.

To generate a new cert:

  openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365

To remove the passphrase requirement:

  openssl rsa -in key.pem -out newkey.pem && mv newkey.pem key.pem

Or just include the "passphrase" option when configuring the HTTPS server.

Sources:
- http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/
- https://expressjs.com/en/starter/static-files.html

*/

const fs = require('fs');
const https = require('https');
const express = require('express');

const app = express();
app.use(express.static(__dirname + "/public"));

const options = {
  key: fs.readFileSync('/etc/letsencrypt/archive/webrtctestkit.tk/privkey1.pem', 'utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/archive/webrtctestkit.tk/cert1.pem', 'utf8'),
  passphrase: process.env.HTTPS_PASSPHRASE || '',
  port:443
};
const server = https.createServer(options, app);

server.listen(process.env.SERVER_PORT || 443,()=>console.log(`Server is running on port ${port}`));
