require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it("Teste se fetchProducts é uma função", async () => {
    expect(typeof fetchItem).toBe('function');
  });

  it("Execute a função fetchProducts com o argumento 'computador' e teste se fetch foi chamada;", async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toBeCalled();
  });

  it("Teste se, ao chamar a função fetchProducts com o argumento 'computador', a função fetch utiliza o endpoint;", async () => {
    const url = "https://api.mercadolibre.com/items/MLB1615760527";
    await fetchItem('MLB1615760527')
    expect(fetch).toBeCalledWith(url);
  });

  it("Teste se o retorno da função fetchItem com o argumento do item 'MLB1615760527' é uma estrutura de dados igual ao objeto item que já está importado no arquivo;", async () => {
    const check = await fetchItem('MLB1615760527');
    expect(check).toEqual(item);
  });

  it("Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url", async () => {
    try {
      await fetchItem();
    } catch (e) {
      expect(e.message).toMatch('You must provide an url');
    }
  });
});
