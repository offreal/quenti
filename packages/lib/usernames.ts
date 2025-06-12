export const failsPrecondition = (username: string) => {
  // For now, reserve all usernames that are less than 3 characters, we'll do something with them later
  return username.length < 3;
};
