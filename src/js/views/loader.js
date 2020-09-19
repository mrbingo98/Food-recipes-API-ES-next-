export const displayLoader = (container)=>{
    const loader = `<div class="loader_container"><div class="loader"></div></div>`
    container.insertAdjacentHTML('afterbegin',loader)
}

export const removeLoader = ()=>{
    const loader =document.querySelector('.loader_container')
    if(loader){
        loader.remove()
    }
}