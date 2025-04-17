# My First MCP - Weather Server

A simple [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) server that provides weather information for any city.

## Disclaimer

This is a proof-of-concept implementation meant to demonstrate basic MCP server functionality. It does not include data validation, error handling, rate limiting, or other production-ready features. Use it as a learning resource to understand how to build MCP servers.

## Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

## Running the Server

1. Start the server with the [inspector](https://modelcontextprotocol.io/docs/tools/inspector):

```bash
pnpm ins
```

2. The server will be available through the MCP protocol. You can use it with any MCP-compatible client.

## Configuration

The server is configured locally to run with:

```json
{
  "mcpServers": {
    "weather": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "(path-to-the-file)\\index.ts"
      ]
    }
  }
}
```
