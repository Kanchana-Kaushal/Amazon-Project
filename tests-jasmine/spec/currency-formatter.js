import { formatCurrency } from "../../utilities/utilities.js";

describe("Test Suit: Format Currency", () => {
    it("Converts cents into dollars", () => {
        expect(formatCurrency(2077)).toEqual("20.77");
    });

    it("Works with 0", () => {
        expect(formatCurrency(0)).toEqual("0.00");
    });

    it("Rounds up to the nearest number", () => {
        expect(formatCurrency(2077.2)).toEqual("20.77");
    });
});
