import express from 'express';
import dotenv from 'dotenv';
import expressGraphQl from './middlewares/graphql';

const app = express();

dotenv.config();

app.use('/graphql', expressGraphQl);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`GraphQL app listening on port ${PORT}`));
