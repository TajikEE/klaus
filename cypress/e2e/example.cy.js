// https://docs.cypress.io/api/introduction/api.html

describe("Page has required elements", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Account users");
  });
});
