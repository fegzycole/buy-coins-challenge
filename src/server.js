import express from 'express';
import '@babel/polyfill';
import dotenv from 'dotenv';
import expressGraphQl from './middlewares/graphql';

const app = express();

dotenv.config();

app.use('/graphql', expressGraphQl);

const PORT = process.env.PORT || 5100;

app.listen(PORT, () => console.log(`GraphQL app listening on port ${PORT}`));
