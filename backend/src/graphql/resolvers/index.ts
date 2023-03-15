import merge from "lodash.merge";

import userResolvers from "./user";
import conversationResolvers from "./conversation";

export default merge({}, userResolvers, conversationResolvers);
