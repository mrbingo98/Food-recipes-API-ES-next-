export default class Cart {
    constructor(){
        this.items = []
    }
    addNewItem (amount,unit,ingredient){
        const newItem = {
            amount,
            unit,
            ingredient,
            id: this.calcID()
        }
        this.items.push(newItem)
    }
    calcID(){
        let id
        if(this.items.length > 0){
            id = this.items[this.items.length-1].id + 1
        }else{
            id = 0
        }
        return id
    }
    deleteItem(id){
        const index = this.items.findIndex( item => item.id === id )
        if(index > -1){
            this.items.splice(index, 1)
        }
    }
    updateAmount(id,amount){
        const item = this.items.find( item => item.id === id )
        item.amount = amount
    }
    itemsNum() {
        return this.items.length;
    }
}