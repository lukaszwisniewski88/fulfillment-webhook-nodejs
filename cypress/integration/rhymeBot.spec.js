/// <reference types="Cypress" />
/**
 * Found at https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
 * function to extract from an Iframe which is used on a WebDemo in DialogFlow
 * @returns cypress objkect to interact with
 */
const getIframeBody = () =>
  cy.get("#frame", { log: false }).its("0.contentDocument.body", { log: false }).should("not.be.empty").then(cy.wrap);

describe("Polish rhyme bot", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Should respond with polish rhymes", () => {
    const testPhrases = ["Cześć", "Hej", "Witam", "heja"];
    const rhymes = ["kucharek sześć", "klej", "hipopotam", "keja"];
    testPhrases.forEach((phrase, index) => {
      getIframeBody().find("input").should("exist").type(`${phrase}{enter}`);
      getIframeBody().find(".server-response").last().should("contain.text", rhymes[index]);
    });
  });
  it("Should be non case sensitive", () => {
    const testPhrases = ["cześć", "CZESC", "Cześć"];
    testPhrases.forEach((phrase, index) => {
      getIframeBody().find("input").should("exist").type(`${phrase}{enter}`);
      getIframeBody()
        .find(".server-response")
        .last()
        .should("contain.text", "sześć")
        .should("not.contain.text", "Witam");
    });
  });
});
