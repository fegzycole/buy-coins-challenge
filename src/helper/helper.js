// eslint-disable-next-line max-len
export const calculatePrice = (bitCoinPrice, margin, exchangeRate) => Number(((bitCoinPrice + margin) * exchangeRate).toFixed(2));

export const validateInput = (args) => {
  const error = {};
  const errors = [];
  const { margin } = args;
  if (margin > 1 || margin < 0) {
    error.field = 'margin';
    error.message = 'margin can only be a number between 0 and 1';
    errors.push(error);
  }
  if (errors.length > 0) {
    return errors;
  }
  return null;
};
