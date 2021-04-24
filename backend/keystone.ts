import 'dotenv/config';
import { config, createSchema, list } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';

const databaseURL = process.env.DATABASEURL;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 365, // How long should they stay signed in
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // add data seeding
  },
  lists: createSchema({
    // scheme items go in here
    User,
  }),
  ui: {
    // change this for roles
    isAccessAllowed: () => true,
  },
  // Add session values here
});
