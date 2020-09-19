export const saveitemsLocally =(fav,cart)=>{
    let items = {
            fav: fav,
            cart: cart
        }
    localStorage.setItem('items', JSON.stringify(items))
}
export const returnitems = ()=>{
    let items
    if(localStorage.getItem('items') === null){
        items = {
            fav: [],
            cart: []
        }
    }else{
        items = JSON.parse(localStorage.getItem('items'))
    }
    return items 
}