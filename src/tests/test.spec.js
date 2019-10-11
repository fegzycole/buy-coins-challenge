'use strict'

import { expect } from 'chai';
import EasyGraphQLTester from 'easygraphql-tester';
import schema from '../schemas/schema';
 
describe('Test my queries, mutations and subscriptions', () => {
  let tester
  before(() => {
    tester = new EasyGraphQLTester(schema)
  })
 
  describe('Test suites for the calculatePrice query', () => {
    it('Should pass if the query is valid', () => {
      try {
        const validQuery = `
        {
          calculatePrice(type: buy, margin: 0.2, exchangeRate: 300.50) {
            price,
            errors{
              field, message
            }
          }
        }
        `
      tester.test(true, validQuery);
      const response = tester.mock(validQuery);
      expect(response.data.calculatePrice.price).to.be.a(Number);
      expect(response.data.calculatePrice.errors).to.be.eql(null);
      } catch (err) {
        return err;
      }
    })
    it('Should throw an error if the any of the required parameters is missing', () => {
      let error
      try {
        const invalidQuery = `
        {
          calculatePrice(margin: 0.2, exchangeRate: 300.50) {
            price,
            errors{
              field, message
            }
          }
        }
        `
        tester.mock(invalidQuery)
      } catch (err) {
        error = err
      }

      expect(error).to.be.an.instanceOf(Error)
      expect(error.message).to.not.be.eql(undefined)
    })
    it('Should throw an error if the type is neither buy nor sell', () => {
      let error
      try {
        const invalidQuery = `
        {
          calculatePrice(type: 'fake data', margin: 0.2, exchangeRate: 300.50) {
            price,
            errors{
              field, message
            }
          }
        }
        `
        tester.mock(invalidQuery)
      } catch (err) {
        error = err
      }

      expect(error).to.be.an.instanceOf(Error)
      expect(error.message).to.not.be.eql(undefined)
    })
    it('Should throw an error if the margin is less than 0 or greater than 1', () => {
      let error
      try {
        const invalidQuery = `
        {
          calculatePrice(type: buy, margin: 1.2, exchangeRate: 300.50) {
            price,
            errors{
              field, message
            }
          }
        }
        `
        const response = tester.mock(invalidQuery);
        expect(response.data.calculatePrice.errors).to.be.an(Array);
        expect(response.data.calculatePrice.price).to.not.be.eql(null);
      } catch (err) {
        error = err
      }
    })
  })
})