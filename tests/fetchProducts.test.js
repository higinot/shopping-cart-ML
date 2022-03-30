require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it("Teste se fetchProducts é uma função", async () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it("Execute a função fetchProducts com o argumento 'computador' e teste se fetch foi chamada;", async () => {
    await fetchProducts('computador')
    expect(fetch).toBeCalled();
  });

  it("Teste se, ao chamar a função fetchProducts com o argumento 'computador', a função fetch utiliza o endpoint;", async () => {
    const url = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    await fetchProducts('computador')
    expect(fetch).toBeCalledWith(url);
  });

  it("Teste se o retorno da função fetchProducts com o argumento 'computador' é uma estrutura de dados igual ao objeto computadorSearch", async () => {
    const check = await fetchProducts('computador')
    expect(check).toEqual(computadorSearch.results); // Por que não funciona ? 
  });

  it("Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.", async () => {
    try {
      await fetchProducts();
    } catch (e) {
      expect(e.message).toMatch('You must provide an url');
    }
  });
});
