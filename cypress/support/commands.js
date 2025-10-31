//Parse Records Found
Cypress.Commands.add("getRecordCount", () => {
  return cy.contains("Records Found").should("be.visible").then($el => {
    const text = $el.text();
    const m = text.match(/\((\d+)\)/);
    const n = m ? parseInt(m[1], 10) : 0;
    return n;
  });
});

//Opening left menu item
Cypress.Commands.add("openLeftMenu", (label) => {
  cy.get("nav").contains(label).click({ force: true });
});
