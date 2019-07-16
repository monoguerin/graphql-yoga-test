import { factoryQueryAll, idResolver } from '../utils';

export default {
  Query: {
    users: factoryQueryAll('User'),
  },
  Mutation: {
    createUser: async (_, { name, email }, ctx) => {
      const alreadyCreated = await ctx.models.User.exists({
        email,
      });

      if (alreadyCreated) {
        throw new Error('Email already exists');
      }

      const userCreated = await ctx.models.User.create({
        name,
        email,
      });

      return userCreated;
    },
  },
  User: {
    id: idResolver
  },
};
