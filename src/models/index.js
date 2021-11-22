// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const CommunityType = {
  "PUBLIC": "PUBLIC",
  "PRIVATE": "PRIVATE"
};

const PostType = {
  "TEXT": "TEXT",
  "AUDIO": "AUDIO",
  "VIDEO": "VIDEO",
  "IMAGE": "IMAGE",
  "POLL": "POLL"
};

const { UserMetrics, User, FollowRelationship, UserCommunityRelationShip, Community, Post, Comment, UserCommentMetricsRelationShip, UserPostMetricsRelationShip, ModeratorCommunityRelationShip, UserChatRoomRelationship, ChatRoom, Message, ParentChildCommentRelationship, Timeline, Poll } = initSchema(schema);

export {
  UserMetrics,
  User,
  FollowRelationship,
  UserCommunityRelationShip,
  Community,
  Post,
  Comment,
  UserCommentMetricsRelationShip,
  UserPostMetricsRelationShip,
  ModeratorCommunityRelationShip,
  UserChatRoomRelationship,
  ChatRoom,
  Message,
  ParentChildCommentRelationship,
  Timeline,
  CommunityType,
  PostType,
  Poll
};