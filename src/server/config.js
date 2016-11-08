import dotenv from 'dotenv';

dotenv.config({ silent: true });

const SqlConfig = {
  ConnectionString: process.env.DATABASE_URL,
  Database: process.env.SQL_DATABASE,
  Username: process.env.SQL_USERNAME,
  Password: process.env.SQL_PASSWORD,
  Host: process.env.SQL_HOST,
  Port: process.env.SQL_PORT
};

const Auth = {
  jwt: {
    secret: process.env.JWT_SECRET
  },
  facebook: {
    id: process.env.FACEBOOK_APP_ID,
    secret: process.env.FACEBOOK_APP_SECRET
  }
};

const Analytics = {
  google: {
    trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID
  }
};

const Settings = {
  serverUrl: process.env.SERVER_URL,
  graphqlUrl: process.env.GRAPHQL_URL
};

export {
  SqlConfig,
  Auth,
  Settings,
  Analytics
};
