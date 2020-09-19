export default class Favourite {
    constructor(){
        this.favs = []
    }

    addNewItem(id,img,title,publisher){
        const newFav = { id, img, title, publisher };
        this.favs.push(newFav);
        return newFav;
    }

    deleteItem(id){
        const index = this.favs.findIndex( item => item.id === id )
        if(index > -1){
            this.favs.splice(index, 1)
        }
    }

    liked(id){
        if(this.favs.length >0){
            return (this.favs.findIndex(el => el.id === id) !== -1);
        }
        return false
        
    }
    favNum() {
        return this.favs.length;
    }
}