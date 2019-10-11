import axios from 'axios';
import dotenv from 'dotenv';
import { calculatePrice, validateInput } from '../helper/helper';

dotenv.config();

const { URL } = process.env;

/**
 *
 * @param {Object} args {type, margin, exchangeRate}
 * @returns {Float} price
 */
const getPrice = async (parent, args) => {
  const { type, margin, exchangeRate } = args;
  const errors = validateInput(args);
  if (errors) return { errors };
  const marginToPercent = margin / 100;
  try {
    const { data } = await axios.get(URL);
    const priceOfBitcoin = data.bpi.USD.rate_float;
    const price = type === 0 ? calculatePrice(priceOfBitcoin, marginToPercent, exchangeRate)
      : calculatePrice(priceOfBitcoin, -marginToPercent, exchangeRate);
    return { price };
  } catch (error) {
    return { field: 'server', message: error.message };
  }
};


export default getPrice;
