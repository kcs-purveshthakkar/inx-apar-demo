import { gql } from '@apollo/client';

/**
 * User Service
 */
export const userService = {

  getUserList: gql`
    query GetUsers {
      users {
        name
        id
        timestamp
      }
    }
    `,

  createUser: gql`
    mutation InsertUser($name: String!) {
      insert_users(objects: { name: $name }) {
        returning {
          id
          name
          timestamp
        }
      }
    }
  `,

  updateUser: gql`
    mutation Update_users($where: users_bool_exp!, $set: users_set_input) {
      update_users(where: $where, _set: $set) {
        returning {
          id
          name
          timestamp
        }
      }
    }
  `,

  deleteUser: gql`
  mutation DeleteUser($where: users_bool_exp!) {
    delete_users(where: $where) {
      returning {
        id
        name
        timestamp
      }
    }
  }
`,

}

