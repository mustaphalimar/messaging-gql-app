import gql from "graphql-tag";

const typeDefs = gql`
  type SearchedUser {
    id: String
    username: String
  }

  type Query {
    searchUsers(username: String): [SearchedUser]
  }

  type Mutation {
    createUsername(username: String): CreateUsernameReturnType
  }

  type CreateUsernameReturnType {
    success: Boolean
    error: String
  }

  type User {
    id: String
    name: String
    username: String
    email: String
    image: String
    emailVerified: Boolean
  }
`;

export default typeDefs;
