import { ParticipantPopulated } from "../../../backend/src/utils/types";

export function formatUsernames(
  participants: Array<ParticipantPopulated>,
  myUserId: string
): string {
  const usernames = participants
    .filter((p) => p.user.id != myUserId)
    .map((p) => p.user.username);

  return usernames.join(", ");
}
