import {Strings as DOM} from './DOMStrings'

export const displayItem = item=>{
    const newHTML = 
    `<li class="shopping__item" id="item-${item.id}">
        <div class="shopping__count">
            <input type="number" value="${item.amount}" step="${item.amount}" id="amount-${item.id}">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny" id="delete-${item.id}">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>`
    DOM.cart.insertAdjacentHTML('beforeend',newHTML)
}
export const deleteItem = id=>{
    document.getElementById(`item-${id}`).remove()
}