// this the type definition of the createUsername mutation response
export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}
// this is the type definition of what createUsername mutation will take in
export interface CreateUsernameVariables {
  username: string;
}
