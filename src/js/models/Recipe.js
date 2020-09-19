const axios = require('axios')

export default class Recipe{
    constructor(id){
        this.id = id
    }
    async getRecipe(){
        const proxy = `https://cors-anywhere.herokuapp.com/`
        try {
            const result = await axios(`${proxy}https://recipesapi.herokuapp.com/api/get?rId=${this.id}`)
            this.ingredients = result.data.recipe.ingredients
            this.img = result.data.recipe.image_url
            this.publisher = result.data.recipe.publisher
            this.url = result.data.recipe.source_url
            this.publisherURL = result.data.recipe.publisher_url
            this.title = result.data.recipe.title
        } catch (error) {
            console.log(error)
        }
        
    }
    calcTime(){
        this.time = this.ingredients.length * 4
    }
    calcServ(){
        this.serving = 4
    }
    updateTimeServIng(type){
        let newserving,newAmount
        if(this.time>1 && this.serving>1 && type==='minus'){
            const incAmount = Math.round(this.time / this.serving)
                this.time -= incAmount
                newserving = this.serving - 1   
        }else if(this.time>=1 && this.serving>=1 && type==='plus'){
            const incAmount = Math.round(this.time / this.serving)
            this.time += incAmount
            newserving = this.serving + 1
        }
        this.ingredients.forEach(el=>{
            newAmount = el.amount * (newserving / this.serving)
            if(newAmount && newAmount > 0){
                el.amount = Math.floor(newAmount * 100) / 100
            }
        })
        if(newserving >= 1){
            this.serving = newserving
        }
    }
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) Parse ingredients into amount, unit and ingredient
            const ingArray = ingredient.split(' ');
            const unitIndex = ingArray.findIndex(el2 => units.includes(el2));

            let parsedIng;
            if (unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = ingArray.slice(0, unitIndex);
                
                let amount;
                if (arrCount.length === 1) {
                    amount = eval(ingArray[0].replace('-', '+'));
                } else {
                    amount = eval(ingArray.slice(0, unitIndex).join('+'));
                }

                parsedIng = {
                    amount,
                    unit: ingArray[unitIndex],
                    ingredient: ingArray.slice(unitIndex + 1).join(' ')
                };

            } else if (parseInt(ingArray[0], 10)) {
                // There is NO unit, but 1st element is number
                parsedIng = {
                    amount: parseInt(ingArray[0], 10),
                    unit: '',
                    ingredient: ingArray.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                parsedIng = {
                    amount: 1,
                    unit: '',
                    ingredient
                }
            }

            if(! parsedIng.ingredient || parsedIng.ingredient =='' || parsedIng.ingredient ==' ' || parsedIng.ingredient == '&nbsp;'){
                parsedIng = null
            }

            return parsedIng;
        });
        this.ingredients = newIngredients;
    }
}
