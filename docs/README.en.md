# Channel.io MCP Tool (mcp-channel-talk, mcp-channel-io)

## Overview

An unofficial Channel.io MCP tool.

This project is a tool that integrates with the Model Context Protocol (MCP) by utilizing the [Channel.io](https://api-doc.channel.io/) OPEN API.
This allows AI assistants to access and utilize Channel.io chat information.

<a href="https://smithery.ai/server/@scarfunk/mcp-channel-io"><img src="https://smithery.ai/badge/@scarfunk/mcp-channel-io" alt="Smithery.ai Downloads" /></a>
<a href="https://www.npmjs.com/package/mcp-channel-io"><img src="https://img.shields.io/npm/v/mcp-channel-io.svg" alt="NPM Version" /></a>

## Description

### Implemented Features

1. Chat list retrieval
2. Message list retrieval for each chat (parallel requests)

### Query Conditions

- Query by chat state, tags, manager name, priority (importance)
- Query by customer's name, email, company name, phone number
- When retrieving chat message lists, only the latest 10 messages are retrieved

### Details

- Only provides a subset of Channel.io OPEN_API
- When response sizes are large, AI operations often don't work smoothly, so response sizes are reduced through intermediate mapping operations. Therefore, only the necessary information from the final response is handled.

## Usage in MCP Client

When using in MCP clients (Claude Desktop, etc.), configure as follows:

#### Using npx (recommended)

```json
{
  "mcpServers": {
    "mcp-channel-io": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-channel-io",
        "--",
        "--access-key",
        "YOUR_ACCESS_KEY",
        "--secret-key",
        "YOUR_SECRET_KEY",
        "--ssl-off" // NODE_TLS_REJECT_UNAUTHORIZED
      ]
    }
  }
}
```

<details>
<summary>Using smithery</summary>

```json
{
  "mcpServers": {
    "channel-io": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest",
        "run",
        "@scarfunk/mcp-channel-io",
        "--key",
        "your-smithery-key...",
        "--profile",
        "your-profile-name..."
      ]
    }
  }
}
```

</details>

## Local Development Setup

### Installation

```bash
# Install packages
npm install

# Build
npm run build
```

```json
// If you want to add to .cursor/mcp.json as a local server, add as follows.
{
  "mcpServers": {
    "channel-io": {
      "command": "node",
      "args": [
        "/path/to/YOUR-PROJECT-DIR/build/index.js",
        "--access-key",
        "YOUR_ACCESS_KEY...",
        "--secret-key",
        "YOUR_SECRET_KEY..."
      ]
    }
  }
}
```

### 1. Running with CLI arguments (recommended)

```bash
# Build and run
npm run build
node build/index.js --access-key YOUR_ACCESS_KEY --secret-key YOUR_SECRET_KEY
```

### 2. Development with environment variables

Create a `.env` file in the project root and set the required API keys:

```env
CHANNEL_TALK_X_ACCESS_KEY=your_access_key_here
CHANNEL_TALK_X_ACCESS_SECRET=your_access_secret_here
```

Then run:

```bash
npm start
```

or

```bash
node build/index.js
```

## Environment

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Tech Stack

- TypeScript
- Model Context Protocol SDK (@modelcontextprotocol/sdk)
- Zod (validation)
- dotenv (environment variable management)

### Getting API Keys

1. Login to [Channel.io Developer Console](https://developers.channel.io/)
2. Create an app and get API keys
3. Securely store your Access Key and Secret Key

## Security Notes

- Do not hardcode API keys in your code
- Do not commit `.env` files to git (already included in .gitignore)
- Use CLI arguments or environment variables in production

## Reference Documentation

- [Channel.io OPEN API Documentation](https://api-doc.channel.io/)
- [Channel.io OPEN API Guide - Chat List](https://developers.channel.io/docs/list-of-userchats-1)
- [Channel.io OPEN API Guide - Chat Message List](https://developers.channel.io/docs/get-a-userchats-messages-1)

- [MCP Guide](https://modelcontextprotocol.io/introduction)
- [MCP Guide - Tools](https://modelcontextprotocol.io/docs/concepts/tools)

## License

ISC

## Contributing

Issues and pull requests are always welcome.
