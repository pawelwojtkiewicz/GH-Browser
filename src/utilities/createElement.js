export default function createElement(tag, attributes, innerText){
    const element = document.createElement(tag);
    for(let i; i < attributes.length; i++){
        element.setAttribute(attributes[i][0], attributes[i][1]);
    }
    element.innerText = innerText;
    return element
}