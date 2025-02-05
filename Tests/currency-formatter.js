import { formatCurrency } from "../utilities/utilities.js";

console.log("Test Suit: Format Currency");

console.log("converts cents into dollars");
if (formatCurrency(2077) === "20.77") {
    console.log("Passed");
} else {
    console.log("Failed");
}

console.log("works with 0");
if (formatCurrency(0) === "0.00") {
    console.log("Passed");
} else {
    console.log("Failed");
}

console.log("rounds up to the nearest number");
if (formatCurrency(2077.1) === "20.77") {
    console.log("Passed");
} else {
    console.log("Failed");
}
