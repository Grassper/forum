/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateFollowRelationshipInput = {
  id?: string | null;
  _version?: number | null;
  followRelationshipFolloweeId?: string | null;
  followRelationshipFollowerId?: string | null;
};

export type ModelFollowRelationshipConditionInput = {
  and?: Array<ModelFollowRelationshipConditionInput | null> | null;
  or?: Array<ModelFollowRelationshipConditionInput | null> | null;
  not?: ModelFollowRelationshipConditionInput | null;
};

export type FollowRelationship = {
  __typename: "FollowRelationship";
  id: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  followee?: User | null;
  follower?: User | null;
};

export type User = {
  __typename: "User";
  id: string;
  username: string;
  email: string;
  coins: number;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
};

export type UpdateFollowRelationshipInput = {
  id: string;
  _version?: number | null;
  followRelationshipFolloweeId?: string | null;
  followRelationshipFollowerId?: string | null;
};

export type DeleteFollowRelationshipInput = {
  id: string;
  _version?: number | null;
};

export type CreateUserInput = {
  id?: string | null;
  username: string;
  email: string;
  coins: number;
  _version?: number | null;
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null;
  email?: ModelStringInput | null;
  coins?: ModelIntInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type UpdateUserInput = {
  id: string;
  username?: string | null;
  email?: string | null;
  coins?: number | null;
  _version?: number | null;
};

export type DeleteUserInput = {
  id: string;
  _version?: number | null;
};

export type CreateUserMetricsInput = {
  id?: string | null;
  postLikes: number;
  postLoves: number;
  postSupports: number;
  postDislikes: number;
  profileViews: number;
  badges?: Array<string | null> | null;
  commentUpvotes: number;
  commentDownvotes: number;
  activeDays: number;
  lastActiveDay: string;
  _version?: number | null;
  userMetricsUserId?: string | null;
};

export type ModelUserMetricsConditionInput = {
  postLikes?: ModelIntInput | null;
  postLoves?: ModelIntInput | null;
  postSupports?: ModelIntInput | null;
  postDislikes?: ModelIntInput | null;
  profileViews?: ModelIntInput | null;
  badges?: ModelStringInput | null;
  commentUpvotes?: ModelIntInput | null;
  commentDownvotes?: ModelIntInput | null;
  activeDays?: ModelIntInput | null;
  lastActiveDay?: ModelStringInput | null;
  and?: Array<ModelUserMetricsConditionInput | null> | null;
  or?: Array<ModelUserMetricsConditionInput | null> | null;
  not?: ModelUserMetricsConditionInput | null;
};

export type UserMetrics = {
  __typename: "UserMetrics";
  id: string;
  postLikes: number;
  postLoves: number;
  postSupports: number;
  postDislikes: number;
  profileViews: number;
  badges?: Array<string | null> | null;
  commentUpvotes: number;
  commentDownvotes: number;
  activeDays: number;
  lastActiveDay: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
  User?: User | null;
};

export type UpdateUserMetricsInput = {
  id: string;
  postLikes?: number | null;
  postLoves?: number | null;
  postSupports?: number | null;
  postDislikes?: number | null;
  profileViews?: number | null;
  badges?: Array<string | null> | null;
  commentUpvotes?: number | null;
  commentDownvotes?: number | null;
  activeDays?: number | null;
  lastActiveDay?: string | null;
  _version?: number | null;
  userMetricsUserId?: string | null;
};

export type DeleteUserMetricsInput = {
  id: string;
  _version?: number | null;
};

export type ModelFollowRelationshipFilterInput = {
  id?: ModelIDInput | null;
  and?: Array<ModelFollowRelationshipFilterInput | null> | null;
  or?: Array<ModelFollowRelationshipFilterInput | null> | null;
  not?: ModelFollowRelationshipFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelFollowRelationshipConnection = {
  __typename: "ModelFollowRelationshipConnection";
  items?: Array<FollowRelationship | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null;
  username?: ModelStringInput | null;
  email?: ModelStringInput | null;
  coins?: ModelIntInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection";
  items?: Array<User | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelUserMetricsFilterInput = {
  id?: ModelIDInput | null;
  postLikes?: ModelIntInput | null;
  postLoves?: ModelIntInput | null;
  postSupports?: ModelIntInput | null;
  postDislikes?: ModelIntInput | null;
  profileViews?: ModelIntInput | null;
  badges?: ModelStringInput | null;
  commentUpvotes?: ModelIntInput | null;
  commentDownvotes?: ModelIntInput | null;
  activeDays?: ModelIntInput | null;
  lastActiveDay?: ModelStringInput | null;
  and?: Array<ModelUserMetricsFilterInput | null> | null;
  or?: Array<ModelUserMetricsFilterInput | null> | null;
  not?: ModelUserMetricsFilterInput | null;
};

export type ModelUserMetricsConnection = {
  __typename: "ModelUserMetricsConnection";
  items?: Array<UserMetrics | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type CreateFollowRelationshipMutationVariables = {
  input: CreateFollowRelationshipInput;
  condition?: ModelFollowRelationshipConditionInput | null;
};

export type CreateFollowRelationshipMutation = {
  createFollowRelationship?: {
    __typename: "FollowRelationship";
    id: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    followee?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    follower?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
};

export type UpdateFollowRelationshipMutationVariables = {
  input: UpdateFollowRelationshipInput;
  condition?: ModelFollowRelationshipConditionInput | null;
};

export type UpdateFollowRelationshipMutation = {
  updateFollowRelationship?: {
    __typename: "FollowRelationship";
    id: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    followee?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    follower?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
};

export type DeleteFollowRelationshipMutationVariables = {
  input: DeleteFollowRelationshipInput;
  condition?: ModelFollowRelationshipConditionInput | null;
};

export type DeleteFollowRelationshipMutation = {
  deleteFollowRelationship?: {
    __typename: "FollowRelationship";
    id: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    followee?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    follower?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
};

export type CreateUserMutationVariables = {
  input: CreateUserInput;
  condition?: ModelUserConditionInput | null;
};

export type CreateUserMutation = {
  createUser?: {
    __typename: "User";
    id: string;
    username: string;
    email: string;
    coins: number;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput;
  condition?: ModelUserConditionInput | null;
};

export type UpdateUserMutation = {
  updateUser?: {
    __typename: "User";
    id: string;
    username: string;
    email: string;
    coins: number;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput;
  condition?: ModelUserConditionInput | null;
};

export type DeleteUserMutation = {
  deleteUser?: {
    __typename: "User";
    id: string;
    username: string;
    email: string;
    coins: number;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateUserMetricsMutationVariables = {
  input: CreateUserMetricsInput;
  condition?: ModelUserMetricsConditionInput | null;
};

export type CreateUserMetricsMutation = {
  createUserMetrics?: {
    __typename: "UserMetrics";
    id: string;
    postLikes: number;
    postLoves: number;
    postSupports: number;
    postDislikes: number;
    profileViews: number;
    badges?: Array<string | null> | null;
    commentUpvotes: number;
    commentDownvotes: number;
    activeDays: number;
    lastActiveDay: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    User?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
};

export type UpdateUserMetricsMutationVariables = {
  input: UpdateUserMetricsInput;
  condition?: ModelUserMetricsConditionInput | null;
};

export type UpdateUserMetricsMutation = {
  updateUserMetrics?: {
    __typename: "UserMetrics";
    id: string;
    postLikes: number;
    postLoves: number;
    postSupports: number;
    postDislikes: number;
    profileViews: number;
    badges?: Array<string | null> | null;
    commentUpvotes: number;
    commentDownvotes: number;
    activeDays: number;
    lastActiveDay: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    User?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
};

export type DeleteUserMetricsMutationVariables = {
  input: DeleteUserMetricsInput;
  condition?: ModelUserMetricsConditionInput | null;
};

export type DeleteUserMetricsMutation = {
  deleteUserMetrics?: {
    __typename: "UserMetrics";
    id: string;
    postLikes: number;
    postLoves: number;
    postSupports: number;
    postDislikes: number;
    profileViews: number;
    badges?: Array<string | null> | null;
    commentUpvotes: number;
    commentDownvotes: number;
    activeDays: number;
    lastActiveDay: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    User?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
};

export type GetFollowRelationshipQueryVariables = {
  id: string;
};

export type GetFollowRelationshipQuery = {
  getFollowRelationship?: {
    __typename: "FollowRelationship";
    id: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    followee?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    follower?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
};

export type ListFollowRelationshipsQueryVariables = {
  filter?: ModelFollowRelationshipFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListFollowRelationshipsQuery = {
  listFollowRelationships?: {
    __typename: "ModelFollowRelationshipConnection";
    items?: Array<{
      __typename: "FollowRelationship";
      id: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
      followee?: {
        __typename: "User";
        id: string;
        username: string;
        email: string;
        coins: number;
        _version: number;
        _deleted?: boolean | null;
        _lastChangedAt: number;
        createdAt: string;
        updatedAt: string;
      } | null;
      follower?: {
        __typename: "User";
        id: string;
        username: string;
        email: string;
        coins: number;
        _version: number;
        _deleted?: boolean | null;
        _lastChangedAt: number;
        createdAt: string;
        updatedAt: string;
      } | null;
    } | null> | null;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncFollowRelationshipsQueryVariables = {
  filter?: ModelFollowRelationshipFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncFollowRelationshipsQuery = {
  syncFollowRelationships?: {
    __typename: "ModelFollowRelationshipConnection";
    items?: Array<{
      __typename: "FollowRelationship";
      id: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
      followee?: {
        __typename: "User";
        id: string;
        username: string;
        email: string;
        coins: number;
        _version: number;
        _deleted?: boolean | null;
        _lastChangedAt: number;
        createdAt: string;
        updatedAt: string;
      } | null;
      follower?: {
        __typename: "User";
        id: string;
        username: string;
        email: string;
        coins: number;
        _version: number;
        _deleted?: boolean | null;
        _lastChangedAt: number;
        createdAt: string;
        updatedAt: string;
      } | null;
    } | null> | null;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetUserQueryVariables = {
  id: string;
};

export type GetUserQuery = {
  getUser?: {
    __typename: "User";
    id: string;
    username: string;
    email: string;
    coins: number;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListUsersQuery = {
  listUsers?: {
    __typename: "ModelUserConnection";
    items?: Array<{
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncUsersQuery = {
  syncUsers?: {
    __typename: "ModelUserConnection";
    items?: Array<{
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetUserMetricsQueryVariables = {
  id: string;
};

export type GetUserMetricsQuery = {
  getUserMetrics?: {
    __typename: "UserMetrics";
    id: string;
    postLikes: number;
    postLoves: number;
    postSupports: number;
    postDislikes: number;
    profileViews: number;
    badges?: Array<string | null> | null;
    commentUpvotes: number;
    commentDownvotes: number;
    activeDays: number;
    lastActiveDay: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    User?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
};

export type ListUserMetricssQueryVariables = {
  filter?: ModelUserMetricsFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListUserMetricssQuery = {
  listUserMetricss?: {
    __typename: "ModelUserMetricsConnection";
    items?: Array<{
      __typename: "UserMetrics";
      id: string;
      postLikes: number;
      postLoves: number;
      postSupports: number;
      postDislikes: number;
      profileViews: number;
      badges?: Array<string | null> | null;
      commentUpvotes: number;
      commentDownvotes: number;
      activeDays: number;
      lastActiveDay: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
      User?: {
        __typename: "User";
        id: string;
        username: string;
        email: string;
        coins: number;
        _version: number;
        _deleted?: boolean | null;
        _lastChangedAt: number;
        createdAt: string;
        updatedAt: string;
      } | null;
    } | null> | null;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncUserMetricsQueryVariables = {
  filter?: ModelUserMetricsFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncUserMetricsQuery = {
  syncUserMetrics?: {
    __typename: "ModelUserMetricsConnection";
    items?: Array<{
      __typename: "UserMetrics";
      id: string;
      postLikes: number;
      postLoves: number;
      postSupports: number;
      postDislikes: number;
      profileViews: number;
      badges?: Array<string | null> | null;
      commentUpvotes: number;
      commentDownvotes: number;
      activeDays: number;
      lastActiveDay: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
      User?: {
        __typename: "User";
        id: string;
        username: string;
        email: string;
        coins: number;
        _version: number;
        _deleted?: boolean | null;
        _lastChangedAt: number;
        createdAt: string;
        updatedAt: string;
      } | null;
    } | null> | null;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type OnCreateFollowRelationshipSubscription = {
  onCreateFollowRelationship?: {
    __typename: "FollowRelationship";
    id: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    followee?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    follower?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
};

export type OnUpdateFollowRelationshipSubscription = {
  onUpdateFollowRelationship?: {
    __typename: "FollowRelationship";
    id: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    followee?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    follower?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
};

export type OnDeleteFollowRelationshipSubscription = {
  onDeleteFollowRelationship?: {
    __typename: "FollowRelationship";
    id: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    followee?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    follower?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
};

export type OnCreateUserSubscription = {
  onCreateUser?: {
    __typename: "User";
    id: string;
    username: string;
    email: string;
    coins: number;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateUserSubscription = {
  onUpdateUser?: {
    __typename: "User";
    id: string;
    username: string;
    email: string;
    coins: number;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteUserSubscription = {
  onDeleteUser?: {
    __typename: "User";
    id: string;
    username: string;
    email: string;
    coins: number;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateUserMetricsSubscription = {
  onCreateUserMetrics?: {
    __typename: "UserMetrics";
    id: string;
    postLikes: number;
    postLoves: number;
    postSupports: number;
    postDislikes: number;
    profileViews: number;
    badges?: Array<string | null> | null;
    commentUpvotes: number;
    commentDownvotes: number;
    activeDays: number;
    lastActiveDay: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    User?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
};

export type OnUpdateUserMetricsSubscription = {
  onUpdateUserMetrics?: {
    __typename: "UserMetrics";
    id: string;
    postLikes: number;
    postLoves: number;
    postSupports: number;
    postDislikes: number;
    profileViews: number;
    badges?: Array<string | null> | null;
    commentUpvotes: number;
    commentDownvotes: number;
    activeDays: number;
    lastActiveDay: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    User?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
};

export type OnDeleteUserMetricsSubscription = {
  onDeleteUserMetrics?: {
    __typename: "UserMetrics";
    id: string;
    postLikes: number;
    postLoves: number;
    postSupports: number;
    postDislikes: number;
    profileViews: number;
    badges?: Array<string | null> | null;
    commentUpvotes: number;
    commentDownvotes: number;
    activeDays: number;
    lastActiveDay: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
    User?: {
      __typename: "User";
      id: string;
      username: string;
      email: string;
      coins: number;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
};
