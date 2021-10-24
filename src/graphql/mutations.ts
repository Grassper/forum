/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const incrementLikePostUserMetrics = /* GraphQL */ `
  mutation IncrementLikePostUserMetrics($id: ID!) {
    incrementLikePostUserMetrics(id: $id) {
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
export const decrementLikePostUserMetrics = /* GraphQL */ `
  mutation DecrementLikePostUserMetrics($id: ID!) {
    decrementLikePostUserMetrics(id: $id) {
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
export const incrementLovePostUserMetrics = /* GraphQL */ `
  mutation IncrementLovePostUserMetrics($id: ID!) {
    incrementLovePostUserMetrics(id: $id) {
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
export const decrementLovePostUserMetrics = /* GraphQL */ `
  mutation DecrementLovePostUserMetrics($id: ID!) {
    decrementLovePostUserMetrics(id: $id) {
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
export const incrementSupportPostUserMetrics = /* GraphQL */ `
  mutation IncrementSupportPostUserMetrics($id: ID!) {
    incrementSupportPostUserMetrics(id: $id) {
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
export const decrementSupportPostUserMetrics = /* GraphQL */ `
  mutation DecrementSupportPostUserMetrics($id: ID!) {
    decrementSupportPostUserMetrics(id: $id) {
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
export const incrementProfileViewUserMetrics = /* GraphQL */ `
  mutation IncrementProfileViewUserMetrics($id: ID!) {
    incrementProfileViewUserMetrics(id: $id) {
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
export const decrementProfileViewUserMetrics = /* GraphQL */ `
  mutation DecrementProfileViewUserMetrics($id: ID!) {
    decrementProfileViewUserMetrics(id: $id) {
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
export const incrementCommentUpvoteUserMetrics = /* GraphQL */ `
  mutation IncrementCommentUpvoteUserMetrics($id: ID!) {
    incrementCommentUpvoteUserMetrics(id: $id) {
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
export const decrementCommentUpvoteUserMetrics = /* GraphQL */ `
  mutation DecrementCommentUpvoteUserMetrics($id: ID!) {
    decrementCommentUpvoteUserMetrics(id: $id) {
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
export const incrementCommentDownvoteUserMetrics = /* GraphQL */ `
  mutation IncrementCommentDownvoteUserMetrics($id: ID!) {
    incrementCommentDownvoteUserMetrics(id: $id) {
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
export const decrementCommentDownvoteUserMetrics = /* GraphQL */ `
  mutation DecrementCommentDownvoteUserMetrics($id: ID!) {
    decrementCommentDownvoteUserMetrics(id: $id) {
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
