const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsServices } = require('../../../src/services');
const { allProducts, invalidId } = require('./mocks/products.service.mock');

describe('Verificando service produtos', function () {
  beforeEach(sinon.restore);

  describe('listagem de produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      sinon.stub(productsModel, 'findAll').resolves(allProducts);
      
      const result = await productsServices.findAll();

      expect(result.message).to.deep.equal(allProducts);
    });
  });

  describe('busca de um produto pelo ID', function () {
    it('retorna um erro caso a o produto não exista', async function () {
      const result = await productsServices.findById(invalidId);
      
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    
    it('retorna o produto caso ID exista', async function () {
      sinon.stub(productsModel, 'findById').resolves(allProducts[0]);
      
      const result = await productsServices.findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
  });
});