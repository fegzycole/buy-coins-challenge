import { 
  GraphQLObjectType, 
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList 
} from 'graphql';

import getPrice from '../resolvers/resolver';

import TypeEnumType from './typeSchema';

const CalculatePriceType = new GraphQLObjectType({
  name: 'CalculatePrice',
  fields: () => ({
    price: { type: GraphQLFloat },
    errors: { type: new GraphQLList(ErrorType) }
  })
})

const ErrorType = new GraphQLObjectType({
  name: 'Error',
  fields: () => ({
    field: { type: GraphQLString },
    message: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    calculatePrice: {
      type: CalculatePriceType,
      args: {
        type: { type: new GraphQLNonNull(TypeEnumType) },
        margin: { type: new GraphQLNonNull(GraphQLFloat) },
        exchangeRate: { type: new GraphQLNonNull(GraphQLFloat) }
      },
      resolve: getPrice
    }
  }
})


export default new GraphQLSchema({
  query: RootQuery
});
