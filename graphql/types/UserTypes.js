export default `
  type User {
    _id: String
    id: String!
    name: String!
    email: String!
    password: String!
  }
  type Query {
    user(id: String!): User
    users: [User]
  }
  type Mutation {
    addUser(id: String!, name: String!, email: String!, password: String!): User
    editUser(id: String!, name: String!, email: String!, password: String!): User
    editUserPassword(id: String!, password: String!): User
    editUserName(id: String!, name: String!): User
    editUserEmail(id: String!, email: String!): User
    deleteUser(id: String, name: String, email: String): User
  }
`;