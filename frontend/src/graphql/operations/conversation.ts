import { gql } from "@apollo/client";

const conversationFields = `
  conversations{
  id 
      participants {
        user {
          id 
          username 
        }
        hasSeenLatestMessage
      }
      latestMessage {
        id
        sender {
          id
          username
        }
        body
        createdAt
      }
      updatedAt
}
`;

export default {
  Queries: {
    conversations: gql`
      query Conversations{
          ${conversationFields}
      } 
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participantsIds: [String]!) {
        createConversation(participantsIds: $participantsIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {},
};
