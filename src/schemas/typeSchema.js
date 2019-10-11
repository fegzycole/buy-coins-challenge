import {
  GraphQLEnumType,
} from 'graphql';

const typeEnumType = new GraphQLEnumType({
  name: 'TypeEnum',
  values: {
    buy: {
      value: 0,
    },
    sell: {
      value: 1,
    },
  },
});

export default typeEnumType;
