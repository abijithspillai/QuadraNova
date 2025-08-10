const itemNames = ["Quantum Quiche", "Recursive Risotto", "Polymorphic Pudding", "Singularity Smoothie", "Firewall Fries", "Kernel Panic Coffee", "Byte-Sized Baklava", "Heisen-Burger"];
const itemPrices = [449.99, 699.50, 249.75, 550.00, 199.25, 149.66, 320.00, 599.00];
const imageSets = [
    ['https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200&q=80', 'https://images.unsplash.com/photo-1579583764834-1076f700436d?w=200&q=80'],
    ['https://images.unsplash.com/photo-1595908129324-1a854353a27a?w=200&q=80', 'https://images.unsplash.com/photo-1512058564366-185109098178?w=200&q=80'],
    ['https://images.unsplash.com/photo-1610998460391-3a5f0686576b?w=200&q=80', 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&q=80'],
    ['https://images.unsplash.com/photo-1505252585461-14db0eb44e27?w=200&q=80', 'https://images.unsplash.com/photo-1610970881699-44a5c8a01ecb?w=200&q=80'],
    ['https://images.unsplash.com/photo-1541592106381-b58e7c342795?w=200&q=80', 'https://images.unsplash.com/photo-1598679253544-2c97429994bd?w=200&q=80'],
    ['https://images.unsplash.com/photo-1511920183303-5232ed48d550?w=200&q=80', 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=200&q=80']
];
const botResponses = [ "Anomaly detected. Recalibrating flavor matrix...", "ERROR 418: I'm a teapot.", "The customer is a variable. The coffee is a constant.", "[CONNECTION TERMINATED]", "Did you try turning it off and on again? The universe, I mean.", "Please hold. Your reality is important to us.", "That's not a bug, it's a feature.", "All your base are belong to us." ];
const reviews = [ "5 Stars: The coffee stared back at me. It knew my name. Highly recommend.", "1 Star: My waiter kept clipping through the wall and my fork returned a '404 Not Found' error.", "?? Stars: I don't remember ordering, but I've been here for three days. The risotto is infinite.", "10/10: Tasted like static and forgotten memories.", "WARNING: Do not ask for the Wi-Fi password. Trust me." ];
let comments = [
    { user: "User_404", text: "I think I left my wallet here yesterday. And my sense of self." },
    { user: "Glitch_Fan", text: "The coffee here is great! It tastes like purple." },
    { user: "Anonymous", text: "Help. I am trapped in the coffee machine." }
];

let currentMenuItems = [];
let cart = [];
let menuInterval;

const enterCafeButton = document.getElementById('enter-cafe-button');
const homePage = document.getElementById('home');
const cafePage = document.getElementById('cafe-page');
const menuGrid = document.getElementById('menu-grid');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const modal = document.getElementById('checkout-modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const closeModalButton = document.getElementById('close-modal');
const chatIcon = document.getElementById('chat-icon');
const chatWindow = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSendButton = document.getElementById('chat-send');
const reviewsContent = document.getElementById('reviews-content');
const commentList = document.getElementById('comment-list');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function enterCafe() {
    homePage.classList.add('hidden');
    cafePage.classList.remove('hidden');
    glitchAndRenderMenu();
    renderCart();
    initReviews();
    renderComments();
    menuInterval = setInterval(glitchAndRenderMenu, 3000);
    addChatMessage("Welcome to the Glitch Café. How may I... assist you?", "bot");
}

function glitchAndRenderMenu() {
    currentMenuItems = [];
    const specialIndex = Math.floor(Math.random() * 6);
    for (let i = 0; i < 6; i++) {
        currentMenuItems.push({ id: i, name: getRandom(itemNames), price: getRandom(itemPrices), images: getRandom(imageSets), isSpecial: i === specialIndex });
    }
    renderMenu();
}

function renderMenu() {
    menuGrid.innerHTML = '';
    currentMenuItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card crt-border p-4 flex flex-col';
        
        const buttonHTML = item.isSpecial 
            ? `<button class="glitch-button special font-bold py-1 px-3 rounded">Order Now</button>`
            : `<button class="glitch-button font-bold py-1 px-3 rounded">Add</button>`;

        const nameHTML = item.isSpecial
            ? `<h3 class="text-2xl glitch-font text-red-500 flex-grow">[DAILY SPECIAL]</h3>`
            : `<h3 class="text-2xl glitch-font text-cyan-400 flex-grow">${item.name}</h3>`;

        card.innerHTML = `
            <img id="img-${item.id}" src="${getRandom(item.images)}" alt="${item.name}" class="w-full h-40 object-cover rounded mb-4" onerror="this.onerror=null;this.src='https://placehold.co/200x150/ff0000/ffffff?text=IMG_ERR';">
            ${nameHTML}
            <div class="flex justify-between items-center mt-4">
                <p class="text-xl font-bold">₹${item.price.toFixed(2)}</p>
                ${buttonHTML}
            </div>
        `;
        
        if (item.isSpecial) {
            card.querySelector('button').addEventListener('click', triggerPageGlitch);
        } else {
            card.querySelector('button').addEventListener('click', () => addToCart(item));
        }
        menuGrid.appendChild(card);
    });
}

function addToCart(item) {
    const glitchedItem = { name: getRandom(itemNames), price: getRandom(itemPrices) };
    cart.push(glitchedItem);
    renderCart();
}

function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-400 italic">Cart is empty. Probably.</p>';
        checkoutButton.disabled = true;
    } else {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'flex justify-between items-center bg-green-900/30 p-2 rounded';
            cartItemEl.innerHTML = `
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p class="text-sm">₹${item.price.toFixed(2)}</p>
                </div>
                <button class="text-red-500 font-bold p-1" onclick="removeFromCart(${index})">X</button>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });
        checkoutButton.disabled = false;
    }
    updateCartTotal();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalEl.textContent = `₹${total.toFixed(2)}`;
}

function handleCheckout() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    modalTitle.textContent = "FATAL EXCEPTION IN BILLING.EXE";
    modalText.innerHTML = `Transaction failed. A buffer overflow has occurred.<br>As a result, your account has been <strong class="text-green-400">CREDITED</strong> for the amount of <strong class="text-yellow-300 text-2xl">₹${total.toFixed(2)}</strong>.<br><br>We apologize for the convenience.`;
    modal.style.display = 'flex';
}

function triggerPageGlitch() {
    const glitches = ['flip', 'invert', 'scramble'];
    const chosenGlitch = getRandom(glitches);
    const body = document.body;

    body.classList.add(`page-${chosenGlitch}`);
    
    if (chosenGlitch === 'scramble') {
        scrambleAllText(true);
    }

    setTimeout(() => {
        body.classList.remove(`page-${chosenGlitch}`);
        if (chosenGlitch === 'scramble') {
            scrambleAllText(false);
        }
    }, 3000);
}

function scrambleAllText(shouldScramble) {
    const elements = document.querySelectorAll('#cafe-page h1, #cafe-page p, #cafe-page h2, #cafe-page h3, #cafe-page span, #cafe-page button');
    elements.forEach(el => {
        if (shouldScramble) {
            if (!el.dataset.originalText) {
                el.dataset.originalText = el.textContent;
            }
            el.textContent = el.textContent.split('').map(char => ' ?!*#@$%&'.includes(char) ? char : String.fromCharCode(Math.random() * (126 - 33) + 33)).join('');
        } else {
            if (el.dataset.originalText) {
                el.textContent = el.dataset.originalText;
            }
        }
    });
}

function initReviews() {
    let fullReviewText = "";
    for (let i=0; i<3; i++) {
        fullReviewText += reviews.join(" // ");
    }
    reviewsContent.textContent = fullReviewText;
}

function renderComments() {
    commentList.innerHTML = '';
    comments.forEach(comment => {
        const commentEl = document.createElement('div');
        commentEl.className = 'bg-black/20 p-3 rounded';
        commentEl.innerHTML = `<p><strong class="text-cyan-400">${comment.user}:</strong> ${comment.text}</p>`;
        commentList.appendChild(commentEl);
    });
    commentList.scrollTop = commentList.scrollHeight;
}

function handleCommentSubmit(e) {
    e.preventDefault();
    const commentText = commentInput.value.trim();
    if (commentText) {
        comments.push({ user: `User_${Math.floor(Math.random() * 900) + 100}`, text: commentText });
        commentInput.value = '';
        renderComments();
    }
}

function toggleChat() {
    chatWindow.style.display = (chatWindow.style.display === 'flex') ? 'none' : 'flex';
}

function sendMessage() {
    const input = chatInput.value.trim();
    if (input === '') return;
    addChatMessage(input, 'user');
    chatInput.value = '';
    addChatMessage('...', 'bot');
    setTimeout(() => {
        const botMessage = getRandom(botResponses);
        chatMessages.removeChild(chatMessages.lastChild); 
        addChatMessage(botMessage, 'bot');
    }, 1500);
}

function addChatMessage(text, sender) {
    const messageEl = document.createElement('div');
    messageEl.className = `chat-message ${sender}-message`;
    messageEl.textContent = text;
    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

enterCafeButton.addEventListener('click', enterCafe);
checkoutButton.addEventListener('click', handleCheckout);
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
    cart = [];
    renderCart();
});
chatIcon.addEventListener('click', toggleChat);
chatSendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
commentForm.addEventListener('submit', handleCommentSubmit);