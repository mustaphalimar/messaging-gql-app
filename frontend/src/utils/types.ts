import { ConversationPopulated } from "../../../backend/src/utils/types";

/************************************************************
 * ? - User Types
 *  */

// this the type definition of the createUsername mutation response
export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}
// this is the type definition of what createUsername mutation will take in
export interface CreateUsernameVariables {
  username: string;
}

export interface SearchUsersInput {
  username: string;
}

export interface SearchedUser {
  id: string;
  username: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}

/**********************************************************
 * ? -  Conversation Types
 *  */

export interface CreateConversationData {
  createConversation: {
    conversationId: string;
  };
}

export interface CreateConversationInput {
  participantsIds: string[];
}

export interface ConversationsData {
  conversations: [ConversationPopulated];
}

/*** ****************************************** */
