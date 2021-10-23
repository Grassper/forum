import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from "@aws-amplify/datastore";

type UserMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type UserMetricsMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly UserMetrics?: UserMetrics;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(
    source: User,
    mutator: (
      draft: MutableModel<User, UserMetaData>
    ) => MutableModel<User, UserMetaData> | void
  ): User;
}

export declare class UserMetrics {
  readonly id: string;
  readonly postLikes: number;
  readonly postLoves: number;
  readonly postSupport: number;
  readonly postDislike: number;
  readonly profileViews: number;
  readonly badges?: (string | null)[];
  readonly coins: number;
  readonly user: string;
  readonly commentUpvotes: number;
  readonly commentDownvotes: number;
  readonly activeDays: number;
  readonly lastActiveDay: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserMetrics, UserMetricsMetaData>);
  static copyOf(
    source: UserMetrics,
    mutator: (
      draft: MutableModel<UserMetrics, UserMetricsMetaData>
    ) => MutableModel<UserMetrics, UserMetricsMetaData> | void
  ): UserMetrics;
}
