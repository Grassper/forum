// @ts-check
import { initSchema } from "@aws-amplify/datastore";
import { schema } from "./schema";

const { User, UserMetrics } = initSchema(schema);

export { User, UserMetrics };
