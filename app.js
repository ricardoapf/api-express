const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const options = require('./swagger.json');

const specs = swaggerJsDoc(options);
console.log(specs);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
module.exports = app;
