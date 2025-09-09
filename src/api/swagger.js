// swagger.js
// Swagger UI setup for displaying API documentation for configuration.js endpoints

import SwaggerUI from 'swagger-ui-dist/swagger-ui-es-bundle.js';
import 'swagger-ui-dist/swagger-ui.css';

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'AlbumD25 API',
    version: '1.0.0',
    description: 'API documentation for configuration.js endpoints',
  },
  servers: [
    {
      url: 'https://albumdigital.up.railway.app',
    },
  ],
  paths: {
    '/api/collections/configurations/records': {
      get: {
        summary: 'Get configuration',
        description: 'Returns configuration data including backgrounds.',
        responses: {
          200: {
            description: 'Configuration object',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    bgs: { type: 'object' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/collections/cards/records': {
      get: {
        summary: 'Get all cards',
        description: 'Returns a list of all cards with image URLs.',
        responses: {
          200: {
            description: 'Array of cards',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { type: 'object' },
                },
              },
            },
          },
        },
      },
    },
    '/api/collections/usercards/records': {
      get: {
        summary: 'Get user cards',
        description: 'Returns user cards for a given userId.',
        parameters: [
            {
                name: 'filter',
                in: 'query',
                required: true,
                schema: { type: 'string' },
                example: '(user="oysif1862q3gp01")'
            }
            ],
        responses: {
          200: {
            description: 'User cards object',
            content: {
              'application/json': {
                schema: { type: 'object' },
              },
            },
          },
        },
      },
    },
    '/api/collections/mutations/records': {
      get: {
        summary: 'Get mutations',
        description: 'Returns a list of mutations.',
        responses: {
          200: {
            description: 'Array of mutations',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { type: 'object' },
                },
              },
            },
          },
        },
      },
    },
    '/api/users/{userId}': {
  get: {
    summary: 'Get user',
    description: 'Returns user data for a given userId.',
    parameters: [
      {
        name: 'userId',
        in: 'path',
        required: true,
        schema: { type: 'string' },
        example: 'oysif1862q3gp01', // 👈 también puedes dar ejemplo al parámetro
      },
    ],
    responses: {
      200: {
        description: 'User object',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                avatar: { type: 'string' },
                collectionId: { type: 'string' },
                collectionName: { type: 'string' },
                created: { type: 'string', format: 'date-time' },
                email: { type: 'string', format: 'email' },
                emailVisibility: { type: 'boolean' },
                id: { type: 'string' },
                name: { type: 'string' },
                updated: { type: 'string', format: 'date-time' },
                verified: { type: 'boolean' },
              },
            },
            example: {
              avatar: "user_5lgm7k1nba.png",
              collectionId: "_pb_users_auth_",
              collectionName: "users",
              created: "2025-07-28 20:30:54.140Z",
              email: "albinrdz@icloud.com",
              emailVisibility: false,
              id: "oysif1862q3gp01",
              name: "Jorge Mario Ruiz",
              updated: "2025-08-12 18:56:29.090Z",
              verified: true
            },
          },
        },
      },
    },
  },
},
    '/api/collections/challenges/records': {
      get: {
        summary: 'Get challenges',
        description: 'Returns a list of challenges.',
        responses: {
          200: {
            description: 'Array of challenges',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { type: 'object' },
                },
              },
            },
          },
        },
      },
    },
  },
};

export function renderSwaggerUI(domId = '#swagger-ui') {
  return SwaggerUI({
    dom_id: domId,
    spec: swaggerSpec,
    deepLinking: true,
  });
}