const express = require(`express`);
const app = express();
const PORT = process.env.PORT || 3000;
const client = require('prom-client');

const register = new client.Registry()
register.setDefaultLabels({
  app: 'example-nodejs-app'
});
client.collectDefaultMetrics({ register })


app.get(`/metrics`, async (req, res) => {
  res.set('Content-Type', register.contentType);
    let metrics = await register.metrics();
    res.send(metrics);
  res.send(register.metrics()).status(200);
});

app.get(`/health`, (req, res) => {
  res.send({
    healthy: true
  }).status(200);
});

app.get(`/add/:num1/:num2`, (req, res) => {
  let num1 = parseInt(req.params.num1, 10);
  let num2 = parseInt(req.params.num2, 10);
  console.log(`Adding ${num1} + ${num2}`);
  console.log(`Result is ${num1 + num2}`);
  res.send({
    num1: num1,
    num2: num2,
    result: num1 + num2
  }).status(200);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;