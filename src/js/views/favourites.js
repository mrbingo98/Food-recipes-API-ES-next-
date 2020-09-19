import {Strings as DOM} from './DOMStrings'
export const displayFavourite = recipe=>{
    const newFav = `             
    <li>
        <a class="likes__link" href="#${recipe.id}" id="like-${recipe.id}">
            <figure class="likes__fig">
                <img src="${recipe.img}" alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${recipe.title}</h4>
                <p class="likes__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`
DOM.favourites.insertAdjacentHTML('beforeend',newFav)
}
export const deleteFav = id=>{
    const item = document.getElementById(`like-${id}`)
    if(item){
        item.remove()
    }
}
export const toggleHeart = liked=>{
    const icon = liked ? 'icon-heart' : 'icon-heart-outlined'
    if(document.querySelector('.recipe__love use')){
        document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${icon}`)
    }
}