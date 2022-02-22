export function addClass (element, elementClass) {
    element.classList.add(elementClass);
}

export function removeClass (element, elementClass) {
    element.classList.remove(elementClass);
}

export function showMessageValidity (element, message) {
    element.setCustomValidity(message);
}