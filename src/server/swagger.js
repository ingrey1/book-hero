const swaggerDocument = {
  swagger: '2.0',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/book/': {
      get: {
        summary: 'Lists all the books',
        tags: ['book'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Book',
            },
          },
        },
      },
      post: {
        summary: 'Creates a book',
        tags: ['book'],
        parameters: [
          {
            name: 'book',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateBook',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new book',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateBook',
            },
          },
        },
      },
    },
    '/book/{id}': {
      get: {
        summary: 'Gets a book by its primary key',
        tags: ['book'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'Returns a book with primary key',
            schema: {
              $ref: '#/definitions/Book',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a book by its primary key',
        tags: ['book'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a book',
        tags: ['book'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Book',
            },
          },
          {
            name: 'book',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateBook',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a book',
            schema: {
              $ref: '#/definitions/Book',
            },
          },
        },
      },
      patch: {
        tags: ['book'],
        summary: 'patch a book',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Book',
            },
          },
          {
            name: 'book',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateBook',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a book and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Book',
            },
          },
        },
      },
    },

    '/author/': {
      get: {
        summary: 'Lists all the authors',
        tags: ['author'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Author',
            },
          },
        },
      },
      post: {
        summary: 'Creates a author',
        tags: ['author'],
        parameters: [
          {
            name: 'author',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateAuthor',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new author',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateAuthor',
            },
          },
        },
      },
    },
    '/author/{id}': {
      get: {
        summary: 'Gets a author by its primary key',
        tags: ['author'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'Returns a author with primary key',
            schema: {
              $ref: '#/definitions/Author',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a author by its primary key',
        tags: ['author'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a author',
        tags: ['author'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Author',
            },
          },
          {
            name: 'author',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateAuthor',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a author',
            schema: {
              $ref: '#/definitions/Author',
            },
          },
        },
      },
      patch: {
        tags: ['author'],
        summary: 'patch a author',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Author',
            },
          },
          {
            name: 'author',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateAuthor',
            },
          },
        ],
        responses: {
          200: {
            description:
              'Returns a author and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Author',
            },
          },
        },
      },
    },

    '/genre/': {
      get: {
        summary: 'Lists all the genres',
        tags: ['genre'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Genre',
            },
          },
        },
      },
      post: {
        summary: 'Creates a genre',
        tags: ['genre'],
        parameters: [
          {
            name: 'genre',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateGenre',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new genre',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateGenre',
            },
          },
        },
      },
    },
    '/genre/{id}': {
      get: {
        summary: 'Gets a genre by its primary key',
        tags: ['genre'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'Returns a genre with primary key',
            schema: {
              $ref: '#/definitions/Genre',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a genre by its primary key',
        tags: ['genre'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a genre',
        tags: ['genre'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Genre',
            },
          },
          {
            name: 'genre',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateGenre',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a genre',
            schema: {
              $ref: '#/definitions/Genre',
            },
          },
        },
      },
      patch: {
        tags: ['genre'],
        summary: 'patch a genre',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Genre',
            },
          },
          {
            name: 'genre',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateGenre',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a genre and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Genre',
            },
          },
        },
      },
    },

    '/tag/': {
      get: {
        summary: 'Lists all the tags',
        tags: ['tag'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Tag',
            },
          },
        },
      },
      post: {
        summary: 'Creates a tag',
        tags: ['tag'],
        parameters: [
          {
            name: 'tag',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTag',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new tag',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTag',
            },
          },
        },
      },
    },
    '/tag/{id}': {
      get: {
        summary: 'Gets a tag by its primary key',
        tags: ['tag'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'Returns a tag with primary key',
            schema: {
              $ref: '#/definitions/Tag',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a tag by its primary key',
        tags: ['tag'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a tag',
        tags: ['tag'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Tag',
            },
          },
          {
            name: 'tag',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTag',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a tag',
            schema: {
              $ref: '#/definitions/Tag',
            },
          },
        },
      },
      patch: {
        tags: ['tag'],
        summary: 'patch a tag',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Tag',
            },
          },
          {
            name: 'tag',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTag',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a tag and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Tag',
            },
          },
        },
      },
    },
  },
  definitions: {
    Book: {
      required: ['title', 'about'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        title: {
          type: 'string',
          uniqueItems: true,
          maxLength: 255,
        },
        about: {
          type: 'string',
          maxLength: 2550,
        },
        authors: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
        genres: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
        tags: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
      },
    },

    Author: {
      required: ['firstName', 'age'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        firstName: {
          type: 'string',
          maxLength: 255,
        },
        lastName: {
          type: 'string',
          maxLength: 255,
        },
        age: {
          type: 'integer',
          format: 'int32',
          minimum: 1,
          maximum: 200,
        },
        books: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
      },
    },

    Genre: {
      required: ['name', 'description'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        name: {
          type: 'string',
          uniqueItems: true,
          maxLength: 255,
        },
        description: {
          type: 'string',
          maxLength: 255,
        },
        books: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
      },
    },

    Tag: {
      required: ['name', 'description'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        name: {
          type: 'string',
          uniqueItems: true,
          maxLength: 255,
        },
        description: {
          type: 'string',
          maxLength: 255,
        },
        books: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
      },
    },
  },
  createUpdateDef: {
    CreateUpdateBook: {
      required: ['title', 'about'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        title: {
          type: 'string',
          uniqueItems: true,
          maxLength: 255,
        },
        about: {
          type: 'string',
          maxLength: 2550,
        },
        authors: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
        genres: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
        tags: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
      },
    },

    CreateUpdateAuthor: {
      required: ['firstName', 'age'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        firstName: {
          type: 'string',
          maxLength: 255,
        },
        lastName: {
          type: 'string',
          maxLength: 255,
        },
        age: {
          type: 'integer',
          format: 'int32',
          minimum: 1,
          maximum: 200,
        },
        books: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
      },
    },

    CreateUpdateGenre: {
      required: ['name', 'description'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        name: {
          type: 'string',
          uniqueItems: true,
          maxLength: 255,
        },
        description: {
          type: 'string',
          maxLength: 255,
        },
        books: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
      },
    },

    CreateUpdateTag: {
      required: ['name', 'description'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        name: {
          type: 'string',
          uniqueItems: true,
          maxLength: 255,
        },
        description: {
          type: 'string',
          maxLength: 255,
        },
        books: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
      },
    },
  },
};

export { swaggerDocument };
