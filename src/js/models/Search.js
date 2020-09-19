const axios = require('axios')

export default class Search{
    constructor(query){
        this.query = query
    }
    async searchRequest(){
        const proxy = `https://cors-anywhere.herokuapp.com/`
        try {
            const results = await axios(`${proxy}https://recipesapi.herokuapp.com/api/search?q=${this.query}`)
            this.recipes = results.data.recipes
        } catch (error) {
            alert(error)
        }
        
    }
}