//function to get and return one single element

export const getElement = (selector) => {
    const element = document.querySelector(selector);

    if(!element) throw new Error(`Element not found! Element selector: ${selector}`);

    return element;
};

//function to get and return elements in groups

export const getElementsInParentsElement = (parentElement, selector) => {
    const elements = parentElement.querySelectorAll(selector);

    if(!elements) throw new Error(`Elements not found! Elements selector: ${selector}`);

    return elements;
};

//function that return name of a day

export function findDay(value) {
    let day;
    switch (value) {
            case 0:
                    day = "niedziela";
                    break;
            case 1:
                    day = "poniedziałek";
                    break;
            case 2:
                    day = "wtorek";
                    break;
            case 3:
                    day = "środa";
                    break;
            case 4:
                    day = "czwartek";
                    break;
            case 5:
                    day = "piątek";
                    break;
            case 6:
                    day = "sobota"
                    break;
            default:
                    day = undefined;
  }
  return day;
}

//function that cleans all inputs

export function clearInputs(...args) {
    args.forEach(arg => {
        if(arg.type === 'checkbox') {
            arg.checked = false
        } else {
            arg.value = '';
        }
    })
}