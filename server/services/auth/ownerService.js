export const verifityOwner = (owner, user) => {
  if (owner != user) {
    throw new Error('Access Denied');
  }
};
