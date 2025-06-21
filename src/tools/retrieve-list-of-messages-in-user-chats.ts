import { makeOpenApiRequest } from "../utils/api.util.js";

export async function retrieveListOfMessagesInUserChatsHandler(
  input: any,
  accessKey: string,
  secretKey: string
) {
  const results = await Promise.all(
    input.user_chat_ids.map((id: string) =>
      makeOpenApiRequest<any>(
        `/open/v5/user-chats/${id}/messages?sortOrder=desc&limit=10`,
        accessKey,
        secretKey
      )
    )
  );

  const mappedResults = results.map((result: any) => {
    if (!result) {
      return { messages: [] };
    }

    return {
      messages: result.messages
        .filter((m: any) => m.blocks) // 실제 주고받은 메세지만 필터
        .map((m: any) => {
          return {
            chatKey: m.chatKey,
            chatId: m.chatId,
            id: m.id,
            blocks: m.blocks,
          };
        }),
    };
  });

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(mappedResults),
      },
    ],
  };
}
