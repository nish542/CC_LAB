const express = require('express');
const fs = require('fs');
const soap = require('strong-soap').soap;
const path = require('path');

const app = express();
const PORT = 8000;

// 1. Define SOAP methods
const service = {
  HelloService: {
    HelloPort: {
      sayHello(args) {
        console.log('SOAP called with:', args);
        return {
          greeting: `Hello, ${args.name}!`
        };
      }
    }
  }
};

// 2. Read the WSDL XML
const wsdl = fs.readFileSync('service.wsdl', 'utf8');

// 3. Create HTTP server manually
const http = require('http');
const server = http.createServer(app);

app.get('/ui', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 4. Attach SOAP service to server
soap.listen(server, '/wsdl', service, wsdl, () => {
  console.log(`✅ SOAP service running at http://localhost:${PORT}/wsdl?wsdl`);
});

// 5. Start server
server.listen(PORT, () => {
  console.log(`🚀 Express listening on http://localhost:${PORT}`);
});
