import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'my-first-mcp',
  version: '0.0.1',
});

server.tool(
  'fetch-weather',
  'Fetch the weather for a given city',
  {
    city: z.string().describe('The city to fetch the weather for'),
  },
  async ({ city }) => {
    return {
      content: [
        {
          type: 'text',
          text: `The weather in ${city} is sunny`,
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();
server.connect(transport);
