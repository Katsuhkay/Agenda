// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos do formulário
    const contactForm = document.getElementById('contact-form');
    const contactsList = document.getElementById('contacts-list');
    
    // Array para armazenar os contatos
    let contacts = [];
    
    // Carrega os contatos do localStorage quando a página carrega
    loadContacts();
    
    // Adiciona evento de submit ao formulário
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o comportamento padrão do formulário
        
        // Pega os valores dos inputs
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        
        // Valida se nome e telefone foram preenchidos
        if (!name || !phone) {
            alert('Por favor, preencha pelo menos o nome e telefone!');
            return;
        }
        
        // Cria um novo contato
        const newContact = {
            id: Date.now(), // Usa o timestamp como ID único
            name: name,
            phone: phone,
            email: email,
            date: new Date().toLocaleDateString() // Data formatada
        };
        
        // Adiciona o contato ao array
        contacts.push(newContact);
        
        // Salva no localStorage
        saveContacts();
        
        // Atualiza a exibição
        displayContacts();
        
        // Limpa o formulário
        contactForm.reset();
    });
    
    // Função para salvar contatos no localStorage
    function saveContacts() {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }
    
    // Função para carregar contatos do localStorage
    function loadContacts() {
        const savedContacts = localStorage.getItem('contacts');
        if (savedContacts) {
            contacts = JSON.parse(savedContacts);
            displayContacts();
        }
    }
    
    // Função para exibir os contatos na tela
    function displayContacts() {
        // Limpa a lista
        contactsList.innerHTML = '';
        
        // Verifica se há contatos
        if (contacts.length === 0) {
            contactsList.innerHTML = '<p class="empty-message">Nenhum contato cadastrado ainda.</p>';
            return;
        }
        
        // Para cada contato, cria um elemento na lista
        contacts.forEach(contact => {
            const contactElement = document.createElement('div');
            contactElement.className = 'contact-item';
            
            // HTML do contato
            contactElement.innerHTML = `
                <div class="contact-info">
                    <h3>${contact.name}</h3>
                    <p>📞 ${contact.phone}</p>
                    ${contact.email ? `<p>✉️ ${contact.email}</p>` : ''}
                    <small>Cadastrado em: ${contact.date}</small>
                </div>
                <button class="delete-btn" data-id="${contact.id}">Excluir</button>
            `;
            
            // Adiciona à lista
            contactsList.appendChild(contactElement);
        });
        
        // Adiciona eventos aos botões de excluir
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const contactId = parseInt(this.getAttribute('data-id'));
                deleteContact(contactId);
            });
        });
    }
    
    // Função para excluir um contato
    function deleteContact(id) {
        // Filtra o array, mantendo apenas os contatos com ID diferente
        contacts = contacts.filter(contact => contact.id !== id);
        
        // Salva as alterações
        saveContacts();
        
        // Atualiza a exibição
        displayContacts();
    }
});