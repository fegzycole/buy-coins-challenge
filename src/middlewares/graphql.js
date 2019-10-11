// eslint-disable-next-line camelcase
import express_graphql from 'express-graphql';
import schema from '../schemas/schema';


const expressGraphQL = express_graphql({
  schema,
  graphiql: true,
});

export default expressGraphQL;
