// Seleciona os elementos do DOM
const items = document.querySelectorAll('.list .item'); // Itens da lista
const prevButton = document.getElementById('prevButton'); // Botão de anterior
const nextButton = document.getElementById('nextButton'); // Botão de próximo
const indicators = document.querySelectorAll('.indicators .indicator'); // Indicadores
const numberElement = document.querySelector('.indicators .number'); // Número do indicador
const body = document.body; // Elemento body para mudar o tema

let currentIndex = 0; // Índice do item atual

// Paleta de cores para cada item
const colorPalettes = [
    { background: '#212121', text: '#EAEAEA' }, // Tema escuro (iPhone XS Max)
    { background: '#424242', text: '#EAEAEA' }, // Tema cinza escuro (iPhone 7 Plus)
    { background: '#212121', text: '#EAEAEA' }  // Tema escuro (iPhone 12)
];

// Função para atualizar o item visível
function updateItem(index) {
    // Remove a classe 'active' de todos os itens e indicadores
    items.forEach(item => item.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Adiciona a classe 'active' ao item e indicador atual
    items[index].classList.add('active');
    indicators[index].classList.add('active');

    // Atualiza o número do indicador
    numberElement.textContent = `0${index + 1}`;

    // Atualiza a paleta de cores do body
    const { background, text } = colorPalettes[index];
    body.style.backgroundColor = background;
    body.style.color = text;

    // Animação de transição suave
    items.forEach(item => {
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
    });

    // Atualiza o item atual com transição
    const currentItem = items[index];
    currentItem.style.opacity = '1';
    currentItem.style.transform = 'translateX(0)';
}

// Função para navegar para o próximo item
function nextItem() {
    currentIndex = (currentIndex + 1) % items.length; // Avança para o próximo item
    updateItem(currentIndex);
}

// Função para navegar para o item anterior
function prevItem() {
    currentIndex = (currentIndex - 1 + items.length) % items.length; // Volta para o item anterior
    updateItem(currentIndex);
}

// Adiciona eventos de clique nas setas
prevButton.addEventListener('click', prevItem);
nextButton.addEventListener('click', nextItem);

// Adiciona eventos de clique nos indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index; // Atualiza o índice atual
        updateItem(currentIndex);
    });
});

// Inicializa o primeiro item como ativo
updateItem(currentIndex);