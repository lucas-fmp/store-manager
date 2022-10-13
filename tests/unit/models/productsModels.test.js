const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const products = require('./mocks/products.model.mock');

describe('Testes de unidade do model de produtos', () => {
  beforeEach(sinon.restore);

  it('Recuperando a lista de produtos', async () => {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productsModel.findAll();
    expect(result).to.be.deep.equal(products);
  });

  it('Recuperando um produto a partir do seu id', async () => {
    sinon.stub(connection, 'execute').resolves([[products[1]]]);
    const result = await productsModel.findById(1);
    expect(result).to.be.deep.equal(products[1]);
  });
});