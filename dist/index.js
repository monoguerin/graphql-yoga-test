'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _graphqlYoga = require('graphql-yoga');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('./user.model');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;

var models = {
  User: _user2.default
};

var typeDefs = '\ntype User {\n  id: ID!\n  name: String!\n  email: String!\n}\ntype Query {\n  hello(name: String): String!\n  user: User!\n  users: [User]!\n}\ntype Mutation {\n  hello(name: String!): Boolean\n  createUser(name: String!, email: String!): User!\n}\n';

var resolvers = {
  Query: {
    hello: function hello(_, _ref) {
      var name = _ref.name;
      return 'Hello ' + (name || 'World');
    },
    user: function user() {
      console.log('USER RESOLVER');

      return {
        id: 456,
        email: 'mono@zemoga.com'
      };
    },
    users: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_, __, ctx) {
        var users;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return ctx.models.User.find({});

              case 2:
                users = _context.sent;
                return _context.abrupt('return', users);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      function users(_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return users;
    }()
  },
  Mutation: {
    hello: function hello(root, args, ctx) {
      return true;
    },
    createUser: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_, args, ctx) {
        var alreadyCreated, userCreated;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return ctx.models.User.exists({ email: args.email });

              case 2:
                alreadyCreated = _context2.sent;

                if (!alreadyCreated) {
                  _context2.next = 5;
                  break;
                }

                throw new Error('Email already exists');

              case 5:
                _context2.next = 7;
                return ctx.models.User.create(args);

              case 7:
                userCreated = _context2.sent;
                return _context2.abrupt('return', userCreated);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      function createUser(_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return createUser;
    }()
  },
  User: {
    id: function id(root) {
      return root._id;
    }
  }
};

_mongoose2.default.connect('mongodb+srv://' + DB_USER + ':' + DB_PASSWORD + '@workshop-cb7vf.mongodb.net/workshop').then(function (db) {
  var server = new _graphqlYoga.GraphQLServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: {
      models: models,
      db: db
    }
  });

  server.start(function () {
    return console.log('Server is running on localhost:4000');
  });
}).catch(function (error) {
  console.log('ERROR?', error);
});