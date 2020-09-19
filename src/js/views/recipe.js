import {Strings as DOM} from './DOMStrings'

export const displayRecipe = (recipe,liked)=>{
    const newHTML = 
    `<figure class="recipe__fig">
        <img src="${recipe.img}" alt="Tomato" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>

    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.serving}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny" id="minus">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny" id="plus">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>
        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${liked ? '' : '-outlined'}"></use>
            </svg>
        </button>
    </div>
    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
        </ul>
        <button class="btn-small recipe__btn" id="addToCart">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>`
    DOM.recipeContainer.insertAdjacentHTML('beforeend',newHTML + displayDetailes(recipe.publisher,recipe.url))
    displayIngredients(recipe.ingredients)
}
export const displayIngredients = ingredients=>{
    document.querySelector('.recipe__ingredient-list').innerHTML = ''
    ingredients.forEach(el=>{
        const item=`
        <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${el.amount}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${el.unit}</span>
                ${el.ingredient}
            </div>
        </li>`
        document.querySelector('.recipe__ingredient-list').insertAdjacentHTML('beforeend',item)
    })
}

export const updateInfo = (time,serving)=>{
    document.querySelector('.recipe__info-data--people').textContent = serving
    document.querySelector('.recipe__info-data--minutes').textContent = time
}


const displayDetailes = (publisher,recipeURL)=>
`<div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${publisher}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${recipeURL}" target="_blank">
            <span>Source</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>`

export const clearRecipe = ()=>{
    DOM.recipeContainer.innerHTML = ''
}