/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
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
      postSupport
      postDislike
      profileViews
      badges
      coins
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
        postSupport
        postDislike
        profileViews
        badges
        coins
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
        postSupport
        postDislike
        profileViews
        badges
        coins
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
