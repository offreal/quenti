/**
 * Generates a profile URL for a given username
 * @param username - The username (can be null or undefined)
 * @returns The profile URL with lowercase username
 */
export const getProfileUrl = (username: string | null | undefined): string => {
  return `/u/${(username || "").toLowerCase()}`;
};

/**
 * Generates a folder URL for a given username and folder slug/id
 * @param username - The username (can be null or undefined)
 * @param slugOrId - The folder slug or ID
 * @returns The folder URL with lowercase username
 */
export const getFolderUrl = (
  username: string | null | undefined,
  slugOrId: string,
): string => {
  return `${getProfileUrl(username)}/folders/${slugOrId}`;
};
