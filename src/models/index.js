// @ts-check
import { initSchema } from "@aws-amplify/datastore";
import { schema } from "./schema";

const { FollowRelationship, User, UserMetrics } = initSchema(schema);

export { FollowRelationship, User, UserMetrics };
