import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";
import { isWeekend } from "../utilities/utilities.js";

export function findDeliveryOption(cartItem) {
    let matchingDeliveryOption;
    deliveryOption.forEach((option) => {
        if (option.id === cartItem.deliveryOptionId) {
            matchingDeliveryOption = option;
        }
    });

    return matchingDeliveryOption || deliveryOption[0];
}

export const deliveryOption = [
    {
        id: 1,
        deliverydays: 7,
        priceCents: 0,
    },
    {
        id: 2,
        deliverydays: 3,
        priceCents: 499,
    },
    {
        id: 3,
        deliverydays: 1,
        priceCents: 999,
    },
];

export default deliveryOption;

export function calculateDeliveryDate(deliveryOption) {
    let deliveryDays = deliveryOption.deliverydays;
    let today = dayjs();
    while (1 <= deliveryDays) {
        if (isWeekend(today.add(1, "d"))) {
            today = today.add(1, "d");
        } else {
            today = today.add(1, "d");
            deliveryDays--;
        }
    }

    return today.format("dddd, MMMM DD");
}
