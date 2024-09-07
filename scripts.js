function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

const button = document.getElementById('darkModeToggle');
        let darkModeEnabled = false;

        button.addEventListener('click', () => {
            darkModeEnabled = !darkModeEnabled;
            document.body.classList.toggle('dark-mode', darkModeEnabled);
            button.textContent = darkModeEnabled ? 'Disable Dark Mode' : 'Enable Dark Mode';
        });

        const cart = [];
        const cartItemsContainer = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
        
        const products = [
            { id: 1, name: 'WASD', price: 2.99 },
            { id: 2, name: 'Anti Cheat', price: 4.99 },
            { id: 3, name: 'Computer System', price: 6.99 }
        ];
        
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.product.id === productId);
        
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ product, quantity: 1 });
            }
        
            updateCart();
        }
        
        function removeFromCart(productId) {
            const index = cart.findIndex(item => item.product.id === productId);
        
            if (index !== -1) {
                cart.splice(index, 1);
            }
        
            updateCart();
        }
        
        function changeQuantity(productId, quantity) {
            const item = cart.find(item => item.product.id === productId);
        
            if (item) {
                item.quantity = quantity;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    updateCart();
                }
            }
        }
        
        function updateCart() {
            cartItemsContainer.innerHTML = '';
        
            let total = 0;
        
            cart.forEach(item => {
                const itemTotal = item.product.price * item.quantity;
                total += itemTotal;
        
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <h3>${item.product.name}</h3>
                    <p>Price: $${item.product.price.toFixed(2)}</p>
                    <p>Quantity: <input type="number" min="1" value="${item.quantity}" onchange="changeQuantity(${item.product.id}, this.value)" /></p>
                    <p>Total: $${itemTotal.toFixed(2)}</p>
                    <button onclick="removeFromCart(${item.product.id})">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        
            totalPriceElement.textContent = total.toFixed(2);
        }
        
        document.getElementById("checkout-button").addEventListener("click", () => {
    window.location.href = 'https://www.yourcheckoutlink.com';
});

        
        document.querySelectorAll('.product button').forEach((button, index) => {
            button.addEventListener('click', () => addToCart(index + 1));
        });
        
