// Função para exibir mensagens de erro
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.style.display = 'block';
        errorElement.textContent = message;
        // Adiciona classe de erro ao campo correspondente
        const inputElement = document.getElementById(elementId.replace('-error', ''));
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }
}

// Função para esconder mensagens de erro
function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.style.display = 'none';
        // Remove classe de erro do campo correspondente
        const inputElement = document.getElementById(elementId.replace('-error', ''));
        if (inputElement) {
            inputElement.classList.remove('error');
        }
    }
}

// Função para validar campos obrigatórios
function validateRequiredField(value, elementId, errorMessage) {
    if (value.trim() === '') {
        showError(elementId, errorMessage);
        return false;
    }
    hideError(elementId);
    return true;
}

// Função para validar e-mail
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email-error', 'Por favor, insira um e-mail válido.');
        return false;
    }
    hideError('email-error');
    return true;
}

// Função para validar telefone
function validateTelefone(telefone) {
    const telefoneRegex = /^\d{9,}$/; // Pelo menos 9 dígitos
    if (!telefoneRegex.test(telefone)) {
        showError('telefone-error', 'Por favor, insira um telefone válido (apenas números).');
        return false;
    }
    hideError('telefone-error');
    return true;
}

// Função para validar senha
function validateSenha(senha) {
    if (senha.length < 6) {
        showError('senha-error', 'A senha deve ter pelo menos 6 caracteres.');
        return false;
    }
    hideError('senha-error');
    return true;
}

// Função para validar confirmação de senha
function validateConfirmarSenha(senha, confirmarSenha) {
    if (senha !== confirmarSenha) {
        showError('confirmar-senha-error', 'As senhas não coincidem.');
        return false;
    }
    hideError('confirmar-senha-error');
    return true;
}

// Função para validar termos
function validateTermos(termos) {
    if (!termos) {
        showError('termos-error', 'Você deve concordar com os termos.');
        return false;
    }
    hideError('termos-error');
    return true;
}

// Função para sanitizar entradas de texto
function sanitizeInput(input) {
    return input.replace(/[<>&"']/g, ''); // Remove caracteres perigosos
}

// Validação do Formulário de Cadastro
document.getElementById('form-cadastro')?.addEventListener('submit', function (e) {
    e.preventDefault();

    // Captura e sanitiza os valores do formulário
    const nome = sanitizeInput(document.getElementById('nome').value);
    const email = sanitizeInput(document.getElementById('email').value);
    const telefone = sanitizeInput(document.getElementById('telefone').value);
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    const termos = document.querySelector('input[name="termos"]').checked;

    // Validações
    const isNomeValid = validateRequiredField(nome, 'nome-error', 'Por favor, insira seu nome completo.');
    const isEmailValid = validateEmail(email);
    const isTelefoneValid = validateTelefone(telefone);
    const isSenhaValid = validateSenha(senha);
    const isConfirmarSenhaValid = validateConfirmarSenha(senha, confirmarSenha);
    const isTermosValid = validateTermos(termos);

    // Se tudo estiver válido, prossegue
    if (isNomeValid && isEmailValid && isTelefoneValid && isSenhaValid && isConfirmarSenhaValid && isTermosValid) {
        alert('Cadastro realizado com sucesso!');
        document.getElementById('form-cadastro').reset();
    }
});

// Adicionar evento de tecla "Enter" no campo de pesquisa
document.getElementById('searchInput')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const searchTerm = document.getElementById('searchInput').value.trim();
        if (searchTerm) {
            window.location.href = `resultados.html?q=${encodeURIComponent(searchTerm)}`;
        } else {
            alert("Por favor, insira um termo de pesquisa.");
        }
    }
});

// Botão "Voltar ao Topo"
const backToTopButton = document.getElementById('backToTop');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}