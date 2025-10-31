import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let candidateId;

function uiLoginAsAdmin() {
  const user = Cypress.env("adminUsername");
  const pass = Cypress.env("adminPassword");

  cy.visit("/");
  cy.get('input[name="username"]').type(user);
  cy.get('input[name="password"]').type(pass, { log: false });
  cy.get('button[type="submit"]').click();
  cy.contains("Dashboard", { timeout: 15000 }).should("be.visible");
}

Given("I am logged into OrangeHRM as admin", () => {
  uiLoginAsAdmin();
});


When('I create a candidate via API from fixture {string}', (fixtureName) => {
  cy.fixture(fixtureName).then(({ candidate }) => {
    const email = `${candidate.emailPrefix}${Date.now()}${candidate.emailDomain}`;

    cy.request({
      method: "POST",
      url: "/web/index.php/api/v2/recruitment/candidates",
      headers: {

        "X-Requested-With": "XMLHttpRequest",
        "Accept": "application/json"
      },
      body: {
        firstName: candidate.firstName,
        middleName: "",
        lastName: candidate.lastName,
        email: email,
        contactNumber: "",

        vacancyId: null,
        keywords: "",
        comment: candidate.notes,

      },
      failOnStatusCode: false
    }).then((res) => {

      expect(res.status, "create candidate status").to.be.oneOf([200, 201]);

      candidateId = res.body?.data?.id || res.body?.id;
    });
  });
});

Then('the candidate is created and has an id', () => {
  expect(candidateId, "candidate id").to.exist;
});

When('I delete the candidate via API', () => {
  cy.request({
    method: "DELETE",
    url: `/web/index.php/api/v2/recruitment/candidates/${candidateId}`,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Accept": "application/json"
    },
    failOnStatusCode: false
  }).then((res) => {
    expect(res.status, "delete candidate status").to.be.oneOf([200, 204]);
  });
});

Then('the candidate is deleted successfully', () => {
  cy.request({
    method: "GET",
    url: `/web/index.php/api/v2/recruitment/candidates?candidateId=${candidateId}`,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Accept": "application/json"
    },
    failOnStatusCode: false
  }).then((res) => {

    if (res.status === 200 && Array.isArray(res.body?.data)) {
      const found = res.body.data.find(x => String(x.id) === String(candidateId));
      expect(found, "candidate still present").to.be.undefined;
    } else {
      expect([200, 404]).to.include(res.status);
    }
  });
});
