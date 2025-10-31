class AdminUsersPage {
  open() {
    cy.openLeftMenu("Admin");
    cy.url().should("include", "/admin/viewSystemUsers");
    cy.contains("System Users").should("be.visible");
  }

  recordCount() { return cy.getRecordCount(); }

  clickAdd() {
    cy.contains("button", "Add").click();
    cy.contains("Add User").should("be.visible");
  }

  fillAddUser({ role, status, employeeName, username, password }) {
    // Role
    cy.contains("label", "User Role").parent().parent().find(".oxd-select-text").click();
    cy.get(".oxd-select-dropdown").contains(role).click();

    // Employee Name
    cy.contains("label", "Employee Name").parent().parent().find("input").type(employeeName, { delay: 40 });
    cy.get(".oxd-autocomplete-dropdown").first().contains(employeeName.split(" ")[0]).click();

    // Status
    cy.contains("label", "Status").parent().parent().find(".oxd-select-text").click();
    cy.get(".oxd-select-dropdown").contains(status).click();

    // Username + Password
    cy.contains("label", "Username").parent().parent().find("input").clear().type(username);
    cy.contains("label", "Password").parent().parent().find("input").type(password, { log:false });
    cy.contains("label", "Confirm Password").parent().parent().find("input").type(password, { log:false });
  }

  save() {
    cy.contains("button", "Save").click();
    cy.contains("Successfully Saved", { timeout: 15000 }).should("be.visible");
  }

  searchUsername(username) {
    cy.contains("label", "Username").parent().parent().find("input").clear().type(username);
    cy.contains("button", "Search").click();
  }

  deleteFirstRow() {
    cy.get('div[role="row"]').eq(1).within(() => {
      cy.get("i.oxd-icon.bi-trash").click({ force: true });
    });
    cy.contains("button", "Yes, Delete").click();
    cy.contains("Successfully Deleted", { timeout: 15000 }).should("be.visible");
  }
}
export default new AdminUsersPage();
