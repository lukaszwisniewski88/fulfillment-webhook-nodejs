const { expect } = require("chai");
const { getRhymedResponse } = require("../functions/index");

describe("Rhyme response function", () => {
  it("getting good rhymes for every phrase", () => {
    const testPhrases = ["Cześć", "Heja", "Hej", "Witam"];
    const rhymes = ["sześć", "keja", "klej", "hipopotam"];
    const responses = testPhrases.map((phrase) => getRhymedResponse(phrase));
    responses.forEach((response, index) => expect(response).contain(rhymes[index]));
  });
  it("should not repeat user input in some cases", () => {
    const testPhrases = ["co tam słychać?", "czesc", "Witam"];
    const responses = testPhrases.map((phrase) => getRhymedResponse(phrase));
    responses.forEach((response, index) => expect(response).not.include(testPhrases[index]));
  });
  it("Should response with a fallback message when rhyme not found in the map", () => {
    const fallbackMessage = "Witam serdecznie!";
    const testPhrases = ["Siema", "uihdwiu8gkxcua", "Hello"];
    const responses = testPhrases.map((phrase) => getRhymedResponse(phrase));
    responses.forEach((response) => expect(response).equals(fallbackMessage));
  });
});
