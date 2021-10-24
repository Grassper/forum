/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFollowRelationship = /* GraphQL */ `
  mutation CreateFollowRelationship(
    $input: CreateFollowRelationshipInput!
    $condition: ModelFollowRelationshipConditionInput
  ) {
    createFollowRelationship(input: $input, condition: $condition) {
      id
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      followee {
        id
        username
        email
        coins
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      follower {
        id
        username
        email
        coins
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateFollowRelationship = /* GraphQL */ `
  mutation UpdateFollowRelationship(
    $input: UpdateFollowRelationshipInput!
    $condition: ModelFollowRelationshipConditionInput
  ) {
    updateFollowRelationship(input: $input, condition: $condition) {
      id
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      followee {
        id
        username
        email
        coins
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      follower {
        id
        username
        email
        coins
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteFollowRelationship = /* GraphQL */ `
  mutation DeleteFollowRelationship(
    $input: DeleteFollowRelationshipInput!
    $condition: ModelFollowRelationshipConditionInput
  ) {
    deleteFollowRelationship(input: $input, condition: $condition) {
      id
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      followee {
        id
        username
        email
        coins
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      follower {
        id
        username
        email
        coins
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      email
      coins
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      email
      coins
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      email
      coins
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createUserMetrics = /* GraphQL */ `
  mutation CreateUserMetrics(
    $input: CreateUserMetricsInput!
    $condition: ModelUserMetricsConditionInput
  ) {
    createUserMetrics(input: $input, condition: $condition) {
      id
      postLikes
      postLoves
      postSupports
      postDislikes
      profileViews
      badges
      commentUpvotes
      commentDownvotes
      activeDays
      lastActiveDay
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      User {
        id
        username
        email
        coins
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateUserMetrics = /* GraphQL */ `
  mutation UpdateUserMetrics(
    $input: UpdateUserMetricsInput!
    $condition: ModelUserMetricsConditionInput
  ) {
    updateUserMetrics(input: $input, condition: $condition) {
      id
      postLikes
      postLoves
      postSupports
      postDislikes
      profileViews
      badges
      commentUpvotes
      commentDownvotes
      activeDays
      lastActiveDay
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      User {
        id
        username
        email
        coins
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteUserMetrics = /* GraphQL */ `
  mutation DeleteUserMetrics(
    $input: DeleteUserMetricsInput!
    $condition: ModelUserMetricsConditionInput
  ) {
    deleteUserMetrics(input: $input, condition: $condition) {
      id
      postLikes
      postLoves
      postSupports
      postDislikes
      profileViews
      badges
      commentUpvotes
      commentDownvotes
      activeDays
      lastActiveDay
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      User {
        id
        username
        email
        coins
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
