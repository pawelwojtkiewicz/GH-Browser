export default function createElement(tag, attributes, innerText = ""){
    const element = document.createElement(tag);

    let attributeName;
    let attributeValue;
    for(let i = 0; i < attributes.length; i++){
        attributeName = attributes[i][0];
        attributeValue = attributes[i][1];
        element.setAttribute(attributeName, attributeValue);
    }

    element.innerText = innerText;
    return element
}