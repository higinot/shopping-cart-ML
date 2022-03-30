// ### Seletores de DOM ###

// Selecionando a classe cart__items
const olCartItems = document.querySelector('.cart__items');

// Encontrar o botão de adicionar no carrinho na pagina
const getItemAdd = document.querySelector('.items');

// Encontrar o botão de esvaziar 
const btEmpty = document.querySelector('.empty-cart');

async function sumPrices() {
  let total = 0;

  const cartItem = document.querySelectorAll('.cart__item'); // Arraz de elementos li

  cartItem.forEach((element) => {
    const beforeSplit = element.innerText;
    const afterSplit = beforeSplit.split('$');
    
    total += Number((afterSplit[1]));
  });

  const teste1 = document.querySelector('.total-price');
  teste1.innerText = Number(total.toFixed(2));
} // Função que soma os preços

// ###Funções disponibilizadas pela Trybe###
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove(); // Explicação monitoria Tiago
  saveCartItems(olCartItems.innerHTML);
  sumPrices();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Funções implementadas durante o desenvolvimento
const clearList = () => {
  olCartItems.innerHTML = '';
  saveCartItems(olCartItems.innerHTML);
}; // Função que altera o estrutura do olCartItems para "Vazio!"

const clearCartList = () => {
  btEmpty.addEventListener('click', () => {
    clearList();
    sumPrices();
  });
}; // Função que utiliza o botão e chama a função clearList de callback no addEventListener

const putOnWeb = async () => {
  // Criar uma variavel para alocar o retorno da API
  const result = await fetchProducts('computador');

  // Manipular o objeto para retornar o que precisamos
  const arrayList = result.map((element) => ({
    sku: element.id,
    name: element.title,
    image: element.thumbnail,
  }));

  // Por que utilizando o getElementByClassName não funciona ?
  const getFather = document.querySelector('.items');

  arrayList.forEach(({ sku, name, image }) => {
    const inputData = createProductItemElement({ sku, name, image });
    getFather.appendChild(inputData);
  });
}; // Primeira função criada, chama a API, cria um array, seleciona o elemento no DOM, e utiliza uma hof para criar os elementos na HTML junto com a função createProductItemElement

// Utilizando o createCartItemElement
const getID = async (e) => {
  const resultado = await fetchItem(e);
  const { id, title, price } = resultado;

  if (e !== undefined) {
    olCartItems.appendChild(
      createCartItemElement({ sku: id, name: title, salePrice: price }),
    );
    saveCartItems(olCartItems.innerHTML);
    sumPrices();
  }
}; // Função pega o valor SKU com a função getItemInfo e cria os filhos dentro da cart_list

// Ao clicar nesse botão você deve realizar uma requisição que irá retornar todos os dados de um produto (Por que não consigo agregar na minha variavel)
const getItemInfo = () => {
  getItemAdd.addEventListener('click', (e) => {
    const clickElement = e.target;
    if (clickElement.className === 'item__add') {
      getID(clickElement.parentElement.firstElementChild.innerText);
    }
  });
};// Função utiliza o seletor getItemadd com a função addEventListener com o parametro target para selecionar o item que ira para o carrinho de compras.

async function onLocalStorage() {
  const newLi = getSavedCartItems();

  olCartItems.innerHTML = newLi;
}// Essa função traz as informações do localStorage e coloca as informações dentro do seletor olCartItems dentro da HTML

async function useLocalStorage() {
 await onLocalStorage();

  sumPrices();

  const newLi = document.querySelectorAll('.cart__item');

  newLi.forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
} // Essa função chama a onLocalStorage e adiciona a função de apagar também para as newLi

function loadingBeforeAPI() {
  const elementLoading = document.createElement('h1');
  elementLoading.innerText = 'Carregando...';
  elementLoading.className = 'loading';
  getItemAdd.appendChild(elementLoading);
} // Função cria um h1 antes de carregar o fetch

window.onload = async () => {
  loadingBeforeAPI();

  await putOnWeb(); // Retorna a lista de itens

  await getItemInfo(); // Traz o elemento para dentro da função getID

  await useLocalStorage(); // Coloca os itens do carrinho na memoria

  await clearCartList(); // Faz o comando de esvaziar lixeira

  document.querySelector('.loading').remove();
};
