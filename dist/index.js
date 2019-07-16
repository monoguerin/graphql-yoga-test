'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _graphqlYoga = require('graphql-yoga');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _graphql = require('./graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;

_mongoose2.default.connect('mongodb+srv://' + DB_USER + ':' + DB_PASSWORD + '@workshop-cb7vf.mongodb.net/workshop').then(function (db) {
  var server = new _graphqlYoga.GraphQLServer({
    typeDefs: _graphql.typeDefs,
    resolvers: _graphql.resolvers,
    context: {
      models: _graphql.models,
      db: db
    }
  });

  server.start(function () {
    return console.log('Server is running on localhost:4000');
  });
}).catch(function (error) {
  console.log('ERROR?', error);
});