describe("Home page has required elements and functionality", () => {
  it("visits the app root url checks some texts exist", () => {
    cy.visit("/");
    cy.contains("h1", "Account users");
    cy.contains("button", "Connect users");
  });

  it("focusing on search input shows the tooltip text", () => {
    cy.visit("/");
    cy.get("input[type=text]").click();
    cy.contains("span", "Enter at least 3 characters of user name to search");
  });

  it("clicking on select all checkbox shows the correct text", () => {
    cy.visit("/");
    cy.get("input[type=checkbox]").first().click();
    cy.contains("span", "users selected");
  });

  it("clicking on edit button opens the modal", () => {
    cy.visit("/");
    cy.get("td").eq(2).find(".btn").first().click();
    cy.contains("h2", "Edit user");
  });

  it("clicking on delete button removes the user item", () => {
    cy.visit("/");
    cy.get("td").eq(2).find(".btn").eq(1).click();
    cy.get("td").first().should("not.contain", "Gerard");
  });
});
