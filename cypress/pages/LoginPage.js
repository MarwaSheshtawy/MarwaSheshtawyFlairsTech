class LoginPage {
  visit() { cy.visit("/"); }
  username() { return cy.get('input[name="username"]'); }
  password() { return cy.get('input[name="password"]'); }
  submit()   { return cy.get('button[type="submit"]'); }

  loginAs(user, pass) {
    this.visit();
    this.username().clear().type(user);
    this.password().clear().type(pass, { log: false });
    this.submit().click();
    cy.contains("Dashboard", { timeout: 10000 }).should("be.visible");
  }
}
export default new LoginPage();
