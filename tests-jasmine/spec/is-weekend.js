import { isWeekend } from "../../utilities/utilities.js";
import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";
const today = dayjs();

describe("Test Suit: Is Weekend Function", () => {
    it("Is today a weekend day?", () => {
        expect(isWeekend(today)).toEqual(false);
    });
});
