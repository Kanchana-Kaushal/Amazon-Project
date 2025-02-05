import { isWeekend } from "../utilities/utilities.js";
import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";

console.log("Test Suit: Is Weekend Function");
const Today = dayjs();

console.log("is Today is a weekend day?");
if (isWeekend(Today)) {
    console.log("Yes");
} else {
    console.log("No");
}

console.log("is Saturday a weekend day? (Should manually set to saturday.)");
if (isWeekend(Today.add(3, "d"))) {
    console.log("Yes");
} else {
    console.log("No");
}
