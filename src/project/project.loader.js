import DataLoader from 'dataloader';

export default (projectModel) => new DataLoader(async (userIds) => {
  // Hacer la consulta a la db con los userIds
  const projectsFound = await projectModel
    .find({
      users: {
        $in: userIds,
      },
    }).populate('users');

  // Mapeo de datos!!!
  const projects = userIds.map((userId) => {
    return projectsFound.filter((projectFound) => {
      return projectFound.users.some((user) => String(user._id) === String(userId));
    });
  });

  return projects;
});
