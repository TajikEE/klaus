// https://docs.cypress.io/api/introduction/api.html

describe("Home page has required elements", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Account users");
    cy.contains("button", "Connect users");
  });
});
