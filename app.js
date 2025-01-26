const form = document.forms['input-button']; //get the form element

const result = document.querySelector('.result'); //get the elelment to house the results
let resultUl = document.querySelector('.result_list') //get the ul to house the results


const recipe = document.querySelector('.recipe'); //get the element to house the recipes
const shopping = document.querySelector('.shopping'); //get the element to house the shopping

let searchUrl = "https://forkify-api.herokuapp.com/api/search?q="; //The url used to search for the food items
const recipeUrl = "https://forkify-api.herokuapp.com/api/get?rId=46956"; //The url for recipe
const documentationUrl = "https://forkify-api.herokuapp.com/"; //The url for documentation



//A submit event, that calls the api function
form.addEventListener('submit', async (e) => {
    e.preventDefault(); //prevents the browser from refreshing
    resultUl.innerHTML = '';
    if (resultUl === "") {
        return 
    }
    const input = form.querySelector('.input').value; //get the input value
    const food = input.toLowerCase() //converted the input value to lowercase

    const fullUrl = searchUrl + food; //concatinating the url and the value gotton from the user's input
    const results = await mySearch(fullUrl); //calling the functoion wiith(full url) an arguemnt and putting it inside a variable
    
    for(const result of results.recipes) {
        const li = document.createElement('li'); //created an li element
        const a = document.createElement('a'); //created an anchor(a) element
        a.className = 'results_link'; //gave the anchor element a class name
        a.href = '#' + result.recipe_id; //gave it an href attribute 
        const figure = document.createElement('figure'); //created a figure element
        figure.className = 'results_fig'; //gave the figure element a class name
        const img = document.createElement('img'); //created an img element
        img.src = result.image_url; //gave the img element an attribute of src
        img.alt = result.title; //gave the img element an attribute of alt     
        const div = document.createElement('div'); //created a div element
        div.className = 'results_data'; //gave the div element a class
        const span = document.createElement('span'); //created an h4 element
        span.className = 'results_name'; //gave the h4 element a class
        span.textContent = result.title + '...'; //gave the h4 element a text content
        const p = document.createElement('p'); //created a p element
        p.className = 'result_author' ; //gave the p element a class
        p.textContent = result.publisher; //gave the p element text content

        resultUl.appendChild(li); //i appended the li element to the ul element
        li.appendChild(a); //i appended the a element to the li element
        a.appendChild(figure); //i appended the figure element to the a element
        figure.appendChild(img); //i appened the img element to the figure element
        a.appendChild(div); //i appened the div element to the a element
        div.appendChild(span); //i appened the h4 element to the div element
        div.appendChild(p); //i appened the p element to the div element
        
        console.log(result); 

       
    }
})






//function that uses fetch() to retrieve some JSON data from a server
const mySearch = async (fullUrl) => {
    const response = await fetch(fullUrl); //fetch the data using the url
    
    const json = await response.json(); //get the data as a response in json format 
    return json; //return the data
}


