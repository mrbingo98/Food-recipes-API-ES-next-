// Global app controller
import Search from './models/Search'
import * as searchView from './views/search'
import {Strings} from './views/DOMStrings'
import {displayLoader,removeLoader} from './views/loader'
import Recipe from './models/Recipe'
import * as recipeView from './views/recipe'
import * as favView from './views/favourites'
import Cart from './models/Shopping'
import * as shoppingView from './views/shopping'
import * as ls from './models/LocalStorage'
import Favourite from './models/Favourites'


let state = {}
Strings.form.addEventListener('submit',e=>{
    e.preventDefault()
    searchController()
})

const searchController = async ()=>{
    const query = searchView.input()

    if (query) {
        state.search = new Search(query)

        //prepare ui for results
        searchView.clearinput()
        searchView.clearResults()
        displayLoader(Strings.resultCardContainer)
        try {
            await state.search.searchRequest()
            removeLoader()
            searchView.displayResults(state.search.recipes)
        } catch (error) {
            Strings.resultCardContainer.insertAdjacentHTML('afterbegin',`<h2 style="color: #060C14;">Error Searching Recipes</h2>`)
        }
        removeLoader()
    }
}
Strings.pagination.addEventListener('click',(e)=>{
    const paginationBTN = e.target.closest('.btn-inline')
    if(paginationBTN){
        const page = paginationBTN.dataset.goto
        searchView.clearResults()
        searchView.displayResults(state.search.recipes, page)
    }
})

const recipeController = async ()=>{
    const id = window.location.hash.replace('#','')
    if(id){
        state.recipe = new Recipe(id)
        recipeView.clearRecipe()
        displayLoader(Strings.recipeContainer)
        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients()
            state.recipe.calcTime();
            state.recipe.calcServ()
            removeLoader()
            recipeView.displayRecipe(state.recipe,state.favourites.liked(id))
            searchView.selectedRecipe(state.recipe.id)
        } catch (error) {
            Strings.recipeContainer.insertAdjacentHTML('afterbegin',`<div class="loader_container"><h2 style="color: #060C14;">Error Getting Recipe</h2></div>`)
        }
        removeLoader()
    }
}
Strings.recipeContainer.addEventListener('click',(e)=>{
    ['#plus','#minus'].forEach(el=>{
        const BTN = e.target.closest(el)
        if(BTN){
            const type = BTN.id
            state.recipe.updateTimeServIng(type)
            recipeView.updateInfo(state.recipe.time,state.recipe.serving)
            recipeView.displayIngredients(state.recipe.ingredients)
        }
    })
    
})
window.addEventListener('hashchange',recipeController)
window.addEventListener('load',recipeController)

const favController = ()=>{
    const id = state.recipe.id;
    if(!state.favourites.liked(id)){
        const newLike = state.favourites.addNewItem(id, state.recipe.img, state.recipe.title, state.recipe.publisher)
        favView.toggleHeart(true)
        favView.displayFavourite(newLike)
    }else{
        state.favourites.deleteItem(id)
        favView.toggleHeart(false)
        favView.deleteFav(id)
    }
    ls.saveitemsLocally(state.favourites.favs, state.cart.items)
}
Strings.recipeContainer.addEventListener('click',e=>{
    const BTN = e.target.closest('.recipe__love')
    if(BTN){
        favController()
    }
})

const cartController = (ingredients)=>{
    state.cart = new Cart()
    ingredients.forEach(ing=>{
        state.cart.addNewItem (ing.amount,ing.unit,ing.ingredient)
    })
    state.cart.items.forEach(shoppingView.displayItem)
    ls.saveitemsLocally(state.favourites.favs, state.cart.items)
}
Strings.recipeContainer.addEventListener('click',e=>{
    const BTN = e.target.closest('#addToCart')
    if(BTN){
        cartController(state.recipe.ingredients)
    }
})
Strings.cart.addEventListener('click',e=>{
    const BTN = e.target.closest('.shopping__delete').id
    if(BTN){
        const id = BTN.split('-')[1]
        shoppingView.deleteItem(id)
        state.cart.deleteItem(id)
    }
})
window.addEventListener('load',()=>{
    const items = ls.returnitems()
    state.favourites = new Favourite()
    state.favourites.favs = items.fav
    state.cart = new Cart()
    state.cart.items = items.cart
    cartController(state.cart.items)
    state.favourites.favs.forEach(el=>favView.displayFavourite(el))
})


