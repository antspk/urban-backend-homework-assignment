import 'dotenv/config';

export const config = {
  app: {
    port: Number(process.env.PORT) || 9000,
  },
};
