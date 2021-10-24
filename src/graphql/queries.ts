/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFollowRelationship = /* GraphQL */ `
  query GetFollowRelationship($id: ID!) {
    getFollowRelationship(id: $id) {
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
export const listFollowRelationships = /* GraphQL */ `
  query ListFollowRelationships(
    $filter: ModelFollowRelationshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollowRelationships(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncFollowRelationships = /* GraphQL */ `
  query SyncFollowRelationships(
    $filter: ModelFollowRelationshipFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFollowRelationships(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getUserMetrics = /* GraphQL */ `
  query GetUserMetrics($id: ID!) {
    getUserMetrics(id: $id) {
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
export const listUserMetricss = /* GraphQL */ `
  query ListUserMetricss(
    $filter: ModelUserMetricsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserMetricss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUserMetrics = /* GraphQL */ `
  query SyncUserMetrics(
    $filter: ModelUserMetricsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserMetrics(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
