const cartItems = []; 
const cartContainer = document.getElementById('root-cart'); 
const cartItemMessage = document.getElementById('cartItem'); 
const totalElement = document.getElementById('total'); 
function addToCart(event) {
  const button = event.target; 
  const item = button.closest('.flex');
  const itemName = item.querySelector('.item-price p:first-child').textContent;
  const itemPrice = parseFloat(item.querySelector('.item-price p.price').textContent.slice(1));

  const existingItem = cartItems.find(cartItem => cartItem.name === itemName);
  
  if (existingItem) {
    existingItem.quantity++; 
  } else {
    cartItems.push({ name: itemName, price: itemPrice, quantity: 1 }); 
  }

  updateCart(); 
}

function updateCart() {
  let total = 0;
  cartContainer.innerHTML = ''; 

  if (cartItems.length === 0) {
    cartItemMessage.style.display = 'block';
  } else {
    cartItemMessage.style.display = 'none'; 
    cartItems.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <p>${item.name} x ${item.quantity}</p>
        <p>₹${(item.price * item.quantity).toFixed(2)}</p>
      `;
      cartContainer.appendChild(cartItem);
      total += item.price * item.quantity;
    });
  }

  totalElement.textContent = `₹${total.toFixed(2)}`; 
}

const cartButtons = document.querySelectorAll('.cardBtn');
cartButtons.forEach(button => button.addEventListener('click', addToCart));
const Container = document.querySelector('.cart-container');

const headerCartButton = document.querySelector('.header-cart');
headerCartButton.addEventListener('click', () => {
  Container.classList.toggle('show'); 
});
