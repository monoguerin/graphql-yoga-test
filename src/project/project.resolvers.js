import { idResolver } from '../utils';

export default {
  Query: {
    projects: (_, __, ctx) => ctx.models.Project
      .find({})
      .populate('users'),
  },
  Mutation: {
    createProject: (_, { project }, ctx) => ctx.models.Project.create(project),
    addUserToProject: async (_, { projectId, userId }, ctx) => {
      const userToAdd = await ctx.models.User.exists({
        _id: userId,
      });

      if (!userToAdd) {
        throw new Error(`User with ${userId} was not found`);
      }

      const projectToAdd = await ctx.models.Project.findOne({
        _id: projectId,
      });

      if (!projectToAdd) {
        throw new Error(`Project with ${projectId} was not found`);
      }

      projectToAdd.users.push(userId);


      return projectToAdd.save();
    }
  },
  Project: {
    id: idResolver
  }
};
