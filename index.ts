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
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`);
    const data = await response.json();

    if (data.length === 0) {
      return {
        content: [
          { type: 'text', text: `No weather data found for ${city}` },
        ],
      };
    }

    const { latitude, longitude } = data.results[0];

    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,precipitation,is_day,rain&forecast_days=1`);
    const weatherData = await weatherResponse.json();

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(weatherData, null, 2),
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();
server.connect(transport);
