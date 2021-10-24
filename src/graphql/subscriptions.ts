/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFollowRelationship = /* GraphQL */ `
  subscription OnCreateFollowRelationship {
    onCreateFollowRelationship {
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
export const onUpdateFollowRelationship = /* GraphQL */ `
  subscription OnUpdateFollowRelationship {
    onUpdateFollowRelationship {
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
export const onDeleteFollowRelationship = /* GraphQL */ `
  subscription OnDeleteFollowRelationship {
    onDeleteFollowRelationship {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateUserMetrics = /* GraphQL */ `
  subscription OnCreateUserMetrics {
    onCreateUserMetrics {
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
export const onUpdateUserMetrics = /* GraphQL */ `
  subscription OnUpdateUserMetrics {
    onUpdateUserMetrics {
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
export const onDeleteUserMetrics = /* GraphQL */ `
  subscription OnDeleteUserMetrics {
    onDeleteUserMetrics {
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
