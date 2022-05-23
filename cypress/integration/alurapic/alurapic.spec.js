describe('Login e registro de usuários alura pic', () => {

    beforeEach(() => {
        cy.visit('https://alura-fotos.herokuapp.com');
    })

    it('verifica mensagens de campos obrigatórios no registro', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Email is required!').should('be.visible');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Full name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'User name is required!').should('be.visible');
        cy.contains('ap-vmessage', 'Password is required!').should('be.visible');
    })

    it('verifica mensagem de email invalido', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="email"]').type('Henrique');
        cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible');
    })

    it ('verifica mensagem de nome completo com mais de 60 caracteres', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="fullName"]').type('Pedro de Alcântara Francisco Antônio João Carlos Xavier de Paula Miguel Rafael Joaquim José Gonzaga Pascoal Cipriano Serafim de Bragança e Bourbon');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Maximun length is 40').should('be.visible');     
    })

    it('verifica mensagem de user name com caracter maiúsculo', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="userName"]').type('HenriqueLazzarini');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Must be lower case').should('be.visible');        
    })

    it('verifica mensagem de senha com menos de 8 caracteres', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="password"]').type('123');
        cy.contains('button', 'Register').click();
        cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible');        
    })
    
    it('fazer login de usuário válido', () => {
        cy.login('flavio', '123');
        cy.contains('a', '(Logout)').should('be.visible');
    })

    it('fazer login de usuário inválido', () => {
        cy.login('henrique', '1234');
        cy.on('window:alert', (str) => {
        expect(str).to.equal('Invalid user name or password')
        })
    })

    const usuarios = require('../../fixtures/usuarios.json');
    usuarios.forEach(usuario => {
        it.only('registra novo usuário' + usuario.userName, () => {
            cy.contains('a', 'Register now').click();
            cy.contains('button', 'Register').click();
            cy.get('input[formcontrolname="email"]').type(usuario.email);
            cy.get('input[formcontrolname="fullName"]').type(usuario.fullName);
            cy.get('input[formcontrolname="userName"]').type(usuario.userName);
            cy.get('input[formcontrolname="password"]').type(usuario.password);
            cy.contains('button', 'Register').click();
        })
    })

    
    /* Anterior a utilização de massa de dados 
    it.only('registra novo usuário', () => {
        cy.contains('a', 'Register now').click();
        cy.contains('button', 'Register').click();
        cy.get('input[formcontrolname="email"]').type('henrique.viciedo@gmail.com');
        cy.get('input[formcontrolname="fullName"]').type('Henrique Lazzarini Viciedo');
        cy.get('input[formcontrolname="userName"]').type('henriquelazzarini');
        cy.get('input[formcontrolname="password"]').type('12345678');
        cy.contains('button', 'Register').click();
    }) */

} )