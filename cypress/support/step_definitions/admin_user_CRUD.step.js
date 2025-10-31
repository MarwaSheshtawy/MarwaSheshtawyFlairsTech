import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/LoginPage";
import AdminUsersPage from "../../pages/AdminUsersPage";


let beforeCount = 0;
let createdUsername = "";
let data = {};

Given("I login as admin", () => {
  const user = Cypress.env("adminUsername");
  const pass = Cypress.env("adminPassword");
  LoginPage.loginAs(user, pass);
});

Given("I open the Admin Users page", () => {
  AdminUsersPage.open();
});

When("I note the number of records", () => {
  AdminUsersPage.recordCount().then(n => { beforeCount = n; });
});

When("I add a new user from test data", () => {
  cy.fixture("orangehrm").then(fx => {
    data = fx;
    const rand = Math.floor(Math.random() * 1e6);
    createdUsername = `${fx.newUser.usernamePrefix}${rand}`;

    AdminUsersPage.clickAdd();
    AdminUsersPage.fillAddUser({
      role: fx.newUser.role,
      status: fx.newUser.status,
      employeeName: fx.employeeName,
      username: createdUsername,
      password: fx.newUser.password
    });
    AdminUsersPage.save();
  });
});

Then("the records count increases by 1", () => {
  AdminUsersPage.recordCount().should(after => {
    expect(after).to.eq(beforeCount + 1);
  });
});

When("I search for the created user", () => {
  AdminUsersPage.searchUsername(createdUsername);
});

Then("at least one result is shown", () => {
  cy.get('[role="row"]').its('length').should('be.gte', 2);
});

When("I delete the first result", () => {
  AdminUsersPage.deleteFirstRow();
});

Then("the records count decreases by 1", () => {
  AdminUsersPage.recordCount().should(after => {
    expect(after).to.eq(beforeCount);
  });
});
