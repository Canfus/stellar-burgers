import '@4tw/cypress-drag-drop';

describe('App is available', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Should constructor container disabled', () => {
        cy.get('[test-id="constructor"]').should('not.exist');
        cy.get('[test-id="constructor-empty"]').should('exist');
    });

    it('Should show ingredient details modal', () => {
        cy.get('[test-id="ingredient-item"]').first().click();
        cy.get('[id="modals"]').contains('Детали ингредиента');
        cy.get('[id="modals"]').find('[test-id="close-modal"]').click();
    });

    it('Should add new ingredient to constructor with drag&drop', () => {
        cy.get('[test-id="ingredient-item"]').as('ingredient');
        cy.get('[test-id="constructor"]').as('constructor');

        cy.get('@ingredient').eq(0).drag('@constructor');
        cy.get('@ingredient').eq(3).drag('@constructor');
    });

    it('Should log in', () => {
        cy.visit('/login');

        cy.get('[name="email"]').type('canfus69@gmail.com');
        cy.get('[name="password"]').type('Cerfgthljkb123');
        cy.get('button').contains('Войти').click();

        cy.get('[test-id="username"]').contains('Никита');
    });

    it('Should log out', () => {
        cy.visit('/login');

        cy.get('[name="email"]').type('canfus69@gmail.com');
        cy.get('[name="password"]').type('Cerfgthljkb123');
        cy.get('button').contains('Войти').click();

        cy.get('[test-id="username"]').contains('Никита');

        cy.visit('/profile');

        cy.get('p').contains('Выход').click();

        cy.get('[test-id="username"]').contains('Личный кабинет');
    });

    it('Should post new order', () => {
        cy.get('[id="modals"]').as('modal');
        cy.get('[test-id="ingredient-item"]').as('ingredient');
        cy.get('[test-id="constructor"]').as('constructor');

        cy.get('@ingredient').eq(0).drag('@constructor');
        cy.get('@ingredient').eq(3).drag('@constructor');
        
        cy.get('@constructor').find('button').contains('Оформить заказ').click();

        cy.get('[name="email"]').type('canfus69@gmail.com');
        cy.get('[name="password"]').type('Cerfgthljkb123');
        cy.get('button').contains('Войти').click();

        cy.get('@constructor').find('button').contains('Оформить заказ').click();

        cy.get('[test-id="confirm-order"]').should('exist');
        cy.get('[test-id="confirm-order"]').find('button').contains('Оформить заказ').click();

        cy.wait(16000).get('@modal').contains('Ваш заказ начали готовить');
        
        cy.get('@modal').find('[test-id="close-modal"]').eq(1).click();
    });
});