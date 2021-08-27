import { sequelize } from '../../data/models';

const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');

AdminBro.registerAdapter(AdminBroSequelize);
const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [
    {
      resource: sequelize.models.Book,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['id', 'title', 'about'],
      },
    },
    {
      resource: sequelize.models.Author,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['id', 'firstName', 'lastName', 'age'],
      },
    },
    {
      resource: sequelize.models.Genre,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['id', 'name', 'description'],
      },
    },
    {
      resource: sequelize.models.Tag,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['id', 'name', 'description'],
      },
    },
  ],
  branding: {
    companyName: 'Database dashboard',
    softwareBrothers: false,
    logo: false,
    favicon: 'https://imagine.ai/img/favicon.ico',
  },
});
const router = AdminBroExpress.buildRouter(adminBro);

export { router as adminbroRouter };
