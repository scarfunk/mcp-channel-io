#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";
import { z } from "zod";
import { getConfig } from "./utils/cli.util.js";
import { listOfUserChatsHandler } from "./tools/list-of-user-chats.js";
import { retrieveListOfMessagesInUserChatsHandler } from "./tools/retrieve-list-of-messages-in-user-chats.js";

dotenv.config();

const { ACCESS_KEY, SECRET_KEY } = getConfig();

// Create server instance
const server = new McpServer({
  name: "mcp-channel-io",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Register tools
server.tool(
  "list_of_user_chats",
  "List of user chats in managed state",
  {
    state: z.enum(["opened", "closed"]),
  },
  async (input: any) => {
    return await listOfUserChatsHandler(input, ACCESS_KEY, SECRET_KEY);
  }
);

server.tool(
  "retrieve_list_of_messages_in_user_chats",
  "Retrieve list of messages in a user chats with parallel request",
  {
    user_chat_ids: z.array(z.string()),
  },
  async (input: any) => {
    return await retrieveListOfMessagesInUserChatsHandler(
      input,
      ACCESS_KEY,
      SECRET_KEY
    );
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Channel.io MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
