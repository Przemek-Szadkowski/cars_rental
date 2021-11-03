export const getElement = (selector) => {
    const element = document.querySelector(selector);

    if(!element) throw new Error(`Element not found! Element class name: ${selector}`);

    return element;
};
export const getElements = (selector) => {
    const elements = document.querySelectorAll(selector);

    if(!elements) throw new Error(`Elements not found! Elements class name: ${selector}`);

    return elements;
};