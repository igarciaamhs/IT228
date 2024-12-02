// Product data
const products = [
  { id: 1, name: "Fried Green Tomatoes", price: 5.99, image: "images/food-img-1.webp", description: "Crispy green tomatoes with a tangy twist."  },
  { id: 2, name: "Fried Catfish", price: 8.99, image: "images/food-img-2.webp", description: "Freshly caught catfish with a golden crust." },
  { id: 3, name: "Fish Tacos", price: 7.49, image: "images/food-img-3.webp", description: "Grilled fish nestled in warm tortillas, topped with a zesty slaw and a drizzle of creamy lime sauce." },
  { id: 4, name: "Poke", price: 9.99, image: "images/food-img-4.webp", description: "Fresh, marinated fish cubes served over a bed of rice, garnished with vibrant veggies and a sprinkle of sesame seeds." },
];

// Shopping cart array to store added products
let cart = [];

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    // Check if product is already in cart
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}


// Function to update the cart UI
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; 
    let total = 0;

    cart.forEach(product => {
        total += product.price * product.quantity;
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${product.name} x ${product.quantity} - $${(product.price * product.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart(${product.id})">Remove</button>
        `;
        cartItems.appendChild(itemElement);
    });

    document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
}


// Function to remove a product from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}
// Function to handle the checkout process
function checkout() {
    const checkoutSummary = document.getElementById('checkout-summary');
    const summaryItems = document.getElementById('summary-items');
    summaryItems.innerHTML = ''; // Clear previous summary

    if (cart.length === 0) {
        alert("Your cart is empty! Please add items before checking out.");
        return;
    }

    let total = 0;

    cart.forEach(product => {
        total += product.price;
        const itemElement = document.createElement('div');
        itemElement.classList.add('summary-item');
        itemElement.innerHTML = `<p>${product.name} - $${product.price.toFixed(2)}</p>`;
        summaryItems.appendChild(itemElement);
    });

    document.getElementById('summary-total').textContent = `Total: $${total.toFixed(2)}`;

    // Show checkout summary
    checkoutSummary.style.display = 'block';

    // Optionally, clear the cart after checkout
    cart = [];
    updateCart(); // Update cart UI after checkout
}

// Product search functionality
function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    displayProducts(filteredProducts);
}

// Function to display products on the page
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('card');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="displayProductDetails(${product.id})">View Details</button>
        `;
        productList.appendChild(productElement);
    });
}

// Display product details dynamically
function displayProductDetails(productId) {
    const product = products.find(item => item.id === productId);
    if (product) {
        alert(`Product: ${product.name}\nPrice: $${product.price}\nDescription: ${product.description}`);
    }
}
// Show the login modal
function showLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
}

// Handle the login process
function login(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        alert(`Welcome, ${username}! Proceeding to checkout.`);
        closeLoginModal();
    } else {
        alert('Please enter both username and password.');
    }
}

// Close the modal after successful login
function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}


// Form validation for the contact page
function validateContactForm() {
    const name = document.querySelector('.fullname').value;
    const email = document.querySelector('.email-input').value;

    if (name === "" || email === "") {
        alert("Please fill out all required fields.");
        return false;
    }

    alert("Message sent successfully!");
    return true;
}

// On document load, display all products initially and add event listener for checkout
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    document.getElementById('checkout-button').addEventListener('click', checkout);
});
