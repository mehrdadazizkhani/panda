import Weather from "./Weather";

describe("<Weather />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Weather />);
  });
});
