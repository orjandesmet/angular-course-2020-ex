const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

const mockClients = [{
  id: 327,
  firstName: 'Bobby',
  lastName: 'Tables',
  birthday: '10/10/2007',
  city: '',
  email: 'bobby.tables@xkcs.com',
  zip: '',
}];

const mockProducts = [
  { id: 'J1', name: 'My Product', description: 'My first product', productCode: 'jworks-0001' },
  { id: 'J2', name: 'Tim\'s Product', description: 'Tim his first product', productCode: 'jworks-0002' }
];

server.get('/products', (req, res) => {
  if (req.query.productCode) {
    res.send(mockProducts.filter(p => p.productCode === req.query.productCode));
  }
  res.send(mockProducts);
});

server.get('/products/:id', (req, res) => {
  const id = req.params.id;
  const product = mockProducts.find(p => p.id == id);
  if (!product) {
    res.sendStatus(404);
  } else {
    res.status(200).send(product);
  }
});

server.post('/products', (req, res) => {
  if (!req.body || !req.body.name) {
    res.sendStatus(400);
  } else {
    const id = `J${mockProducts.map(p => parseInt(p.id.slice(1))).reduce((highest, current) => Math.max(highest, current), -1) + 1}`
    const product = {
      id,
      name: req.body.name,
      description: req.body.description,
      productCode: req.body.productCode
    }
    mockProducts.push(product);
    res
      .header('Access-Control-Expose-Headers', 'Location')
      .header('Location', `http://localhost:8080/products/${id}`)
      .status(201)
      .send(product);
  }
});

server.put('/products/:id', (req, res) => {
  const id = req.params.id;
  const product = mockProducts.find(p => p.id == id);
  if (!product) {
    res.sendStatus(404);
  } else if (!req.body || !req.body.name) {
    res.sendStatus(400);
  } else {
    product.name = req.body.name;
    product.description = req.body.description;
    product.productCode = req.body.productCode;
    res
      .header('Access-Control-Expose-Headers', 'Location')
      .header('Location', `http://localhost:8080/products/${id}`)
      .status(200)
      .send(product);
  }
});
server.delete('/products/:id', (req, res) => {
  const id = req.params.id;
  const productIndex = mockProducts.findIndex(p => p.id == id);
  if (productIndex === -1) {
    res.sendStatus(404);
  } else {
    mockProducts.splice(productIndex, 1);
    res.sendStatus(204);
  }
});

server.get('/clients', (req, res) => {
  res.send(mockClients);
});

server.get('/clients/:id', (req, res) => {
  const id = req.params.id;
  const client = mockClients.find(p => p.id == id);
  if (!client) {
    res.sendStatus(404);
  } else {
    res.status(200).send(client);
  }
});

server.post('/clients', (req, res) => {
  if (!req.body || !req.body.firstName) {
    res.sendStatus(400);
  } else {
    const id = mockClients.map(c => c.id).reduce((highest, current) => Math.max(highest, current), -1) + 1;
    const client = {
      id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
      city: req.body.city,
      email: req.body.email,
      zip: req.body.zip,
    }
    mockClients.push(client);
    res
      .header('Access-Control-Expose-Headers', 'Location')
      .header('Location', `http://localhost:8080/clients/${id}`)
      .status(201)
      .send(client);
  }
});

server.put('/clients/:id', (req, res) => {
  const id = req.params.id;
  const client = mockClients.find(p => p.id == id);
  if (!client) {
    res.sendStatus(404);
  } else if (!req.body || !req.body.firstName) {
    res.sendStatus(400);
  } else {
    client.firstName = req.body.firstName;
    client.lastName = req.body.lastName;
    client.birthday = req.body.birthday;
    client.city = req.body.city;
    client.email = req.body.email;
    client.zip = req.body.zip;
    res
      .header('Access-Control-Expose-Headers', 'Location')
      .header('Location', `http://localhost:8080/clients/${id}`)
      .status(200)
      .send(client);
  }
});
server.delete('/clients/:id', (req, res) => {
  const id = req.params.id;
  const clientIndex = mockClients.find(p => p.id == id);
  if (clientIndex === -1) {
    res.sendStatus(404);
  } else {
    mockClients.splice(clientIndex, 1);
    res.sendStatus(204);
  }
});

const port = 8080;
server.listen(port, () => {
  console.log('JSON Server is running on port ' + port);
});
