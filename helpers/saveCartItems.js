const saveCartItems = (itemList) => {
  localStorage.setItem('cartItems', itemList);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
