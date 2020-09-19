import {Strings as DOM} from './DOMStrings'

export const input = ()=>DOM.searchField.value
export const clearinput = ()=>{
    DOM.searchField.value = ''
}
export const clearResults = ()=>{
    DOM.resultCardContainer.innerHTML = ''
    DOM.pagination.innerHTML = ''
}
const displayResult = recipe=>{
    const newHTML = `<div class="card">
        <div class="card_img">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </div>
        <div class=" card_content">
            <h2>${recipe.title}</h2>
            <p>${recipe.publisher}</p>
            <a href="#${recipe.recipe_id}"><span>Full Recipe</span></a>
        </div>
    </div>`
    DOM.resultCardContainer.insertAdjacentHTML('beforeend',newHTML)
}
const creatpaginationBTNS = (page, type)=>`<button class="btn-inline results__btn--${type}" data-goto="${type==='prev'?page-1:page+1}">
                                            <span>Page ${type==='prev'?page-1:page+1}</span>
                                            <svg class="search__icon">
                                                <use href="img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
                                            </svg>
                                        </button>`
const paginationBTNS = (page, resNum, resPerPage)=>{
    let pagination
    const pages = Math.ceil(resNum / resPerPage)
    if(page===1 && pages>1){
        pagination = creatpaginationBTNS(page,'next')
    }else if(page<pages){
        pagination = `${creatpaginationBTNS(page,'next')}${creatpaginationBTNS(page,'prev')}`
    }else if(page===pages && pages>1){
        pagination = creatpaginationBTNS(page,'prev')
    }
    DOM.pagination.insertAdjacentHTML('beforeend',pagination)
}
export const displayResults = (recipes, page = 1, results = 9)=>{
    const start = (page - 1) * results,
        end = page * results
    recipes.slice(start,end).forEach (displayResult)
    paginationBTNS(Number(page),recipes.length,results)
}
export const selectedRecipe = (id)=>{
    if(document.querySelector('.active_card')){document.querySelector('.active_card').classList.remove('active_card')}
    document.querySelector(`a[href="#${id}"]`).parentNode.parentNode.classList.add('active_card')
}