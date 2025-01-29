const form = document.forms['input-button']; //get the form element

const result = document.querySelector('.result'); //get the element to house the results
let resultUl = document.querySelector('.result_list'); //get the ul to house the results

const recipeElement = document.querySelector('.recipe'); //get the element to house the recipes

const shopping = document.querySelector('.shopping'); //get the element to house the shopping
const shoppingList = document.querySelector('.shopping_list')//get the element to hosue the shopping list

let searchUrl = "https://forkify-api.herokuapp.com/api/search?q="; //The url used to search for the food items
const recipeUrl = "https://forkify-api.herokuapp.com/api/get?rId="; //The url for recipe
const documentationUrl = "https://forkify-api.herokuapp.com/"; //The url for documentation

//A submit event, that calls the api function
form.addEventListener('submit', async (e) => {
    e.preventDefault(); //prevents the browser from refreshing
    resultUl.innerHTML = '';
    if (resultUl === "") {
        return;
    }
    const input = form.querySelector('.input').value; //get the input value
    const food = input.toLowerCase(); //converted the input value to lowercase

    const fullUrl = searchUrl + food; //concatinating the url and the value gotton from the user's input
    const results = await searchForkifyApi(fullUrl); //calling the functoion wiith(full url) an arguemnt and putting it inside a variable

    for (const recipe of results.recipes) {
        const li = document.createElement('li'); //created an li element
        createResultDetails(li, recipe);

        //When you click on a list
        li.addEventListener('click', async (e) => {
            e.preventDefault();
            recipeElement.innerHTML = '';

            const recipeFullUrl = recipeUrl + recipe.recipe_id; //concatinating the recipe url and the recipe id
            const recipeDetails = await getRecipeDetails(recipeFullUrl); //calling getRecipeDetails function with the concatinated url

            //recipe figure
            const figure = document.createElement('figure'); //creating a figure element
            figure.className = 'recipe_fig'; //gave it a class

            const img = document.createElement('img'); //created an image element
            img.src = recipeDetails.image_url; //added img scr
            img.alt = recipeDetails.title; //added img alt
            img.className = 'recipe_img'; //added class name

            const h1 = document.createElement('h1'); //created an h1 element
            h1.className = 'recipe_title'; //addded class to the h1 element

            const span = document.createElement('span'); //created a span element
            span.textContent = recipeDetails.title; //gave it text content

            recipeElement.appendChild(figure) //appended the figure element to the recipe Element
            figure.appendChild(img); //appended the img element to the figure element
            figure.appendChild(h1); //appended the h1 element to the figure element
            h1.appendChild(span); //appened the span element to the h1 element

            //recipe details start
            createRecipeDetails();

            //recipe ingredients
            const recipeIngredients = document.createElement('div'); //created a div element for the ingredient recipe
            recipeIngredients.className = 'recipe_ingredients'; //gave it a class

            const recipeIngredientsUl = document.createElement('ul'); //created a ul element
            recipeIngredientsUl.className = 'recipe_ingredients-list'; //gave it a class

            recipeElement.appendChild(recipeIngredients);//appended the recipe ingredient element to the recipe element
            recipeIngredients.appendChild(recipeIngredientsUl);//appended the ul to the recipe ingredient element

            //recipie list
            for (const ingredients of recipeDetails.ingredients) { //loop through the recipe ingredient generated from the api
                createRecipeIngredients(recipeIngredientsUl, ingredients);
            }

            //recipeIngredient button
            const recipeIngredientsButton = document.createElement('button'); //created a button element
            recipeIngredientsButton.className = 'btn-small recipe_btn recipe_btn-add'; // gave it a class
            const recipeIngredientsButtonIcon = document.createElement('i'); //created an icon element
            recipeIngredientsButtonIcon.className = 'bi bi-cart-check'; //gave it a class
            const recipeIngredientsButtonText = document.createElement('span'); //created a span element
            recipeIngredientsButtonText.textContent = 'Add to shopping list'; //added text content to the span element

            recipeIngredients.appendChild(recipeIngredientsButton); //appened the button to the recipe ingredient element
            recipeIngredientsButton.appendChild(recipeIngredientsButtonIcon); //appended the icon to the button element
            recipeIngredientsButton.appendChild(recipeIngredientsButtonText); //appended the span element to the button
            //recipe Direction
            const recipeDirection = document.createElement('div'); //created a div element for the recipe direction
            recipeDirection.className = 'recipe_directions'; //added a class
            const recipeDirectionH2 = document.createElement('h2'); //created an h2 element
            recipeDirectionH2.className = 'heading-2'; //added class
            recipeDirectionH2.textContent = 'How to cook it'; //added text content
            const recipeDirectionsText = document.createElement('div'); //created a div element for text
            recipeDirectionsText.className = 'recipe_direction_text'; //added class
            //i created a text node
            const recipeDirectionsTextNode1 = document.createTextNode('This recipe was carefully designed and tested by ');

            const recipeDirectionsTextBy = document.createElement('span');//created a span element
            recipeDirectionsTextBy.className = 'recipe_by'; //gave it a class
            recipeDirectionsTextBy.textContent = 'Closet Cooking'; //gave it text content
            //created another text node
            const recipeDirectionsTextNode2 = document.createTextNode('. Please check out directions at their website.');

            const directionButton = document.createElement('a'); //created a button using anchor tag
            directionButton.className = 'btn-small recipe_btn'; //gave it  a class name
            directionButton.href = recipeDetails.source_url; //gave it an href
            directionButton.target = '_blank'; //gave it an attribute

            const directonSpan = document.createElement('span'); //created a span element
            directonSpan.textContent = 'Directions'; //gave it text content

            const directonSpanIcon = document.createElement('i'); //created an icon element
            directonSpanIcon.className = 'bi bi-caret-right-fill'; //gave it a class name

            recipeElement.appendChild(recipeDirection); //appended the recipe direction element to the recipe element
            recipeDirection.appendChild(recipeDirectionH2); //appended the h2 element to the recipe direction element
            recipeDirection.appendChild(recipeDirectionsText); //appended the text to the recipe direction element

            recipeDirectionsText.appendChild(recipeDirectionsTextNode1); //appended the text node to the text element
            recipeDirectionsText.appendChild(recipeDirectionsTextBy); // appended the span element to the text element
            recipeDirectionsText.appendChild(recipeDirectionsTextNode2); //appended the second textnode to the text element

            recipeDirection.appendChild(directionButton); //appended the button element to the recipe direction element
            directionButton.appendChild(directonSpan); //appended the span element to the button element
            directionButton.appendChild(directonSpanIcon); //appended the icon element to the button element


            //when you click on the add to shopping list button
            recipeIngredientsButton.addEventListener('click', async (e) => {
                e.preventDefault;
                shoppingList.innerHTML = ''; //empty the shopping element

                recipeDetails.ingredients.forEach((item) => { //loop through the ingredients
                    const shoppingItem = document.createElement('li'); //created an li element
                    shoppingItem.className = 'shopping_item'; //gave it a class name

                    const textElement = document.createElement('span');
                    textElement.className = 'shopping description';
                    textElement.textContent = item;

                    shoppingList.appendChild(shoppingItem);
                    shoppingItem.appendChild(textElement);
                })
            })

        })
    }
})

const createResultDetails = (li, recipe) => {
    li.id = recipe.recipe_id;
    const a = document.createElement('a'); //created an anchor(a) element
    a.className = 'results_link'; //gave the anchor element a class name
    a.href = '#' + recipe.recipe_id; //gave it an href attribute 
    const figure = document.createElement('figure'); //created a figure element
    figure.className = 'results_fig'; //gave the figure element a class name
    const img = document.createElement('img'); //created an img element
    img.src = recipe.image_url; //gave the img element an attribute of src
    img.alt = recipe.title; //gave the img element an attribute of alt     
    const div = document.createElement('div'); //created a div element
    div.className = 'results_data'; //gave the div element a class
    const span = document.createElement('span'); //created an h4 element
    span.className = 'results_name'; //gave the h4 element a class
    span.textContent = recipe.title.slice(0, 13) + '...'; //gave the h4 element a text content
    const p = document.createElement('p'); //created a p element
    p.className = 'result_author'; //gave the p element a class
    p.textContent = recipe.publisher; //gave the p element text content

    resultUl.appendChild(li); //i appended the li element to the ul element
    li.appendChild(a); //i appended the a element to the li element
    a.appendChild(figure); //i appended the figure element to the a element
    figure.appendChild(img); //i appened the img element to the figure element
    a.appendChild(div); //i appened the div element to the a element
    div.appendChild(span); //i appened the h4 element to the div element
    div.appendChild(p); //i appened the p element to the div element
}

const createRecipeDetails = () => {
    const recipeDetails = document.createElement('div'); //created a div element called recipe details 
    recipeDetails.className = 'recipe_details'; //gave it a class

    const firstRecipeInfo = document.createElement('div'); //created a div element called recipe info
    firstRecipeInfo.className = 'recipe_info'; //gave it a class 

    const firstRecipeInfoIcon = document.createElement('i'); //created an icon element
    firstRecipeInfoIcon.className = 'bi bi-stopwatch recipe_info-icon' //gave it a class

    const firstRecipeInfoData = document.createElement('span'); //created a span element
    firstRecipeInfoData.className = 'recipe_info_data recipe_info_data--minutes'; //gave it a class
    firstRecipeInfoData.textContent = 20; //gave it text content

    const firstRecipeInfoText = document.createElement('span'); //created another span element 
    firstRecipeInfoText.className = 'recipe_info_text'; //gave it a class
    firstRecipeInfoText.textContent = 'minutes'; //gave it text content

    const secondRecipeInfo = document.createElement('div'); //created a div element
    secondRecipeInfo.className = 'recipe_info'; //gave it a class name

    const secondRecipeInfoIcon = document.createElement('i'); //created an icon element
    secondRecipeInfoIcon.className = 'bi bi-person-standing recipe_info-icon'; //gave it a class

    const secondRecipeInfoData = document.createElement('span'); //created a span element
    secondRecipeInfoData.className = 'recipe_info-data recipe_info-data--people'; //gave it a class
    secondRecipeInfoData.textContent = 4; //gave it text content

    const secondRecipeInfoText = document.createElement('span'); //created another span element 
    secondRecipeInfoText.className = 'recipe_info_text'; //gave it a class name
    secondRecipeInfoText.textContent = 'servings'; //gave it text content

    const recipeButton = document.createElement('button'); //created a button eleemnt
    recipeButton.className = 'recipe_love'; //gave it a class
    const recipeButtonIcon = document.createElement('i'); //created an icon element
    recipeButtonIcon.className = 'bi bi-heart-fill'; //gave it a class

    recipeElement.appendChild(recipeDetails); //appended the recipe details element to the recipe element
    recipeDetails.appendChild(firstRecipeInfo); //appended the recipe info to the recipe details
    firstRecipeInfo.appendChild(firstRecipeInfoIcon); //appended the icon element to the recipe info element
    firstRecipeInfo.appendChild(firstRecipeInfoData); //appended the span element to the recipe info element
    firstRecipeInfo.appendChild(firstRecipeInfoText); //appended the other span element to the recipe info element
    recipeDetails.appendChild(secondRecipeInfo); //appended the second recipe info to the recipe details
    secondRecipeInfo.appendChild(secondRecipeInfoIcon); //appended the icon element to the second recipe info
    secondRecipeInfo.appendChild(secondRecipeInfoData); //appended the span element to the second recipe info
    secondRecipeInfo.appendChild(secondRecipeInfoText); //appended the other span element to recipe info also
    recipeDetails.appendChild(recipeButton); //appended the button element to the recipe details
    recipeButton.appendChild(recipeButtonIcon); //appended the icon element to the button element
}

//recipie list function
const createRecipeIngredients = (recipeIngredientsUl, ingredients) => {
    const recipe_ingredientsLi = document.createElement('li'); //crated a list element
    recipe_ingredientsLi.className = 'recipe_item'; //gave it a class
    const recipe_ingredientsLiIcon = document.createElement('i'); //created an icon element
    recipe_ingredientsLiIcon.className = 'bi bi-dash-circle-fill'; //gave the icon element a class
    const recipeCount = document.createElement('span'); //created a span element
    recipeCount.className = 'recipe_count'; //gave the span element a class
    recipeCount.textContent = ingredients; //text content of the span element should be the gotten ingredient from the loop

    recipe_ingredientsLi.appendChild(recipe_ingredientsLiIcon); //appended the icon element to the list element
    recipe_ingredientsLi.appendChild(recipeCount); //appended the span element to the list element
    recipeIngredientsUl.appendChild(recipe_ingredientsLi); //appended the list element to the ul element 
}


//function to call recipe
const getRecipeDetails = async (recipeFullUrl) => {
    const response = await fetch(recipeFullUrl);
    const json = await response.json();
    return json.recipe;
}

//function that uses fetch() to retrieve some JSON data from a server i.e the result
const searchForkifyApi = async (fullUrl) => {
    const response = await fetch(fullUrl); //fetch the data using the url
    const json = await response.json(); //get the data as a response in json format 
    return json; //return the data
}


