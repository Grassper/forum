import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum CommunityType {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE"
}

export enum PostType {
  TEXT = "TEXT",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
  IMAGE = "IMAGE",
  POLL = "POLL"
}

export declare class Poll {
  readonly id: string;
  readonly content: string;
  readonly votes: number;
  constructor(init: ModelInit<Poll>);
}

type UserMetricsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FollowRelationshipMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserCommunityRelationShipMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommunityMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserCommentMetricsRelationShipMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserPostMetricsRelationShipMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ModeratorCommunityRelationShipMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserChatRoomRelationshipMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ParentChildCommentRelationshipMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TimelineMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class UserMetrics {
  readonly id: string;
  readonly postLikes: number;
  readonly postLoves: number;
  readonly postSupports: number;
  readonly postDislikes: number;
  readonly profileViews: number;
  readonly badges?: (string | null)[];
  readonly commentUpvotes: number;
  readonly commentDownvotes: number;
  readonly activeDays: number;
  readonly lastActiveDay: string;
  readonly User?: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserMetrics, UserMetricsMetaData>);
  static copyOf(source: UserMetrics, mutator: (draft: MutableModel<UserMetrics, UserMetricsMetaData>) => MutableModel<UserMetrics, UserMetricsMetaData> | void): UserMetrics;
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly coins: number;
  readonly followers?: (FollowRelationship | null)[];
  readonly followees?: (FollowRelationship | null)[];
  readonly communities?: (UserCommunityRelationShip | null)[];
  readonly moderatingCommunities?: (ModeratorCommunityRelationShip | null)[];
  readonly posts?: (Post | null)[];
  readonly comments?: (Comment | null)[];
  readonly userPostMetric?: (UserPostMetricsRelationShip | null)[];
  readonly userCommentMetric?: (UserCommentMetricsRelationShip | null)[];
  readonly chatRooms?: (UserChatRoomRelationship | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class FollowRelationship {
  readonly id: string;
  readonly followee: User;
  readonly follower: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<FollowRelationship, FollowRelationshipMetaData>);
  static copyOf(source: FollowRelationship, mutator: (draft: MutableModel<FollowRelationship, FollowRelationshipMetaData>) => MutableModel<FollowRelationship, FollowRelationshipMetaData> | void): FollowRelationship;
}

export declare class UserCommunityRelationShip {
  readonly id: string;
  readonly user: User;
  readonly community: Community;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserCommunityRelationShip, UserCommunityRelationShipMetaData>);
  static copyOf(source: UserCommunityRelationShip, mutator: (draft: MutableModel<UserCommunityRelationShip, UserCommunityRelationShipMetaData>) => MutableModel<UserCommunityRelationShip, UserCommunityRelationShipMetaData> | void): UserCommunityRelationShip;
}

export declare class Community {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly bannerImageUrl: string;
  readonly profileImageUrl: string;
  readonly type: CommunityType | keyof typeof CommunityType;
  readonly creator: User;
  readonly posts?: (Post | null)[];
  readonly members?: (UserCommunityRelationShip | null)[];
  readonly moderators?: (ModeratorCommunityRelationShip | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Community, CommunityMetaData>);
  static copyOf(source: Community, mutator: (draft: MutableModel<Community, CommunityMetaData>) => MutableModel<Community, CommunityMetaData> | void): Community;
}

export declare class Post {
  readonly id: string;
  readonly type: PostType | keyof typeof PostType;
  readonly content: string;
  readonly mediaUrl?: string;
  readonly poll?: (Poll | null)[];
  readonly tags: string[];
  readonly likes?: number;
  readonly loves?: number;
  readonly supports?: number;
  readonly disLikes?: number;
  readonly author: User;
  readonly community: Community;
  readonly comments?: (Comment | null)[];
  readonly userPostMetric?: (UserPostMetricsRelationShip | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}

export declare class Comment {
  readonly id: string;
  readonly content: string;
  readonly upvote: number;
  readonly downvote: number;
  readonly post?: Post;
  readonly author: User;
  readonly community: Community;
  readonly userCommentMetric?: (UserCommentMetricsRelationShip | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Comment, CommentMetaData>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment, CommentMetaData>) => MutableModel<Comment, CommentMetaData> | void): Comment;
}

export declare class UserCommentMetricsRelationShip {
  readonly id: string;
  readonly type: string;
  readonly post?: Post;
  readonly user: User;
  readonly comment: Comment;
  readonly community: Community;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserCommentMetricsRelationShip, UserCommentMetricsRelationShipMetaData>);
  static copyOf(source: UserCommentMetricsRelationShip, mutator: (draft: MutableModel<UserCommentMetricsRelationShip, UserCommentMetricsRelationShipMetaData>) => MutableModel<UserCommentMetricsRelationShip, UserCommentMetricsRelationShipMetaData> | void): UserCommentMetricsRelationShip;
}

export declare class UserPostMetricsRelationShip {
  readonly id: string;
  readonly type: string;
  readonly community: Community;
  readonly post?: Post;
  readonly user: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserPostMetricsRelationShip, UserPostMetricsRelationShipMetaData>);
  static copyOf(source: UserPostMetricsRelationShip, mutator: (draft: MutableModel<UserPostMetricsRelationShip, UserPostMetricsRelationShipMetaData>) => MutableModel<UserPostMetricsRelationShip, UserPostMetricsRelationShipMetaData> | void): UserPostMetricsRelationShip;
}

export declare class ModeratorCommunityRelationShip {
  readonly id: string;
  readonly user: User;
  readonly community: Community;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ModeratorCommunityRelationShip, ModeratorCommunityRelationShipMetaData>);
  static copyOf(source: ModeratorCommunityRelationShip, mutator: (draft: MutableModel<ModeratorCommunityRelationShip, ModeratorCommunityRelationShipMetaData>) => MutableModel<ModeratorCommunityRelationShip, ModeratorCommunityRelationShipMetaData> | void): ModeratorCommunityRelationShip;
}

export declare class UserChatRoomRelationship {
  readonly id: string;
  readonly user: User;
  readonly chatRoom: ChatRoom;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserChatRoomRelationship, UserChatRoomRelationshipMetaData>);
  static copyOf(source: UserChatRoomRelationship, mutator: (draft: MutableModel<UserChatRoomRelationship, UserChatRoomRelationshipMetaData>) => MutableModel<UserChatRoomRelationship, UserChatRoomRelationshipMetaData> | void): UserChatRoomRelationship;
}

export declare class ChatRoom {
  readonly id: string;
  readonly users?: (UserChatRoomRelationship | null)[];
  readonly messages?: (Message | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatRoom, ChatRoomMetaData>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom, ChatRoomMetaData>) => MutableModel<ChatRoom, ChatRoomMetaData> | void): ChatRoom;
}

export declare class Message {
  readonly id: string;
  readonly content: string;
  readonly user: User;
  readonly chatRoom: ChatRoom;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Message, MessageMetaData>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

export declare class ParentChildCommentRelationship {
  readonly id: string;
  readonly parentComment: Comment;
  readonly childComment: Comment;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ParentChildCommentRelationship, ParentChildCommentRelationshipMetaData>);
  static copyOf(source: ParentChildCommentRelationship, mutator: (draft: MutableModel<ParentChildCommentRelationship, ParentChildCommentRelationshipMetaData>) => MutableModel<ParentChildCommentRelationship, ParentChildCommentRelationshipMetaData> | void): ParentChildCommentRelationship;
}

export declare class Timeline {
  readonly id: string;
  readonly user: User;
  readonly post?: Post;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Timeline, TimelineMetaData>);
  static copyOf(source: Timeline, mutator: (draft: MutableModel<Timeline, TimelineMetaData>) => MutableModel<Timeline, TimelineMetaData> | void): Timeline;
}