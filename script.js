const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


let g=0;
// get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let d = [];
            let html = "";
            console.log(data);
            if (data.meals) {

                for (let i = 0; i < data.meals.length; i++) {
                    let n = {
                        img1: undefined,
                        head: undefined,
                        id: undefined,
                    }
                    n.img1 = `${data.meals[i].strMealThumb}`;
                    n.head = `${data.meals[i].strMeal}`;
                    n.id = `${data.meals[i].idMeal}`;
                    d.push(n);
                }
                //src1 = `${meal.strMealThumb}`;
                //r1 = `${meal.strMeal}`;
                data.meals.forEach(meal => {


                    src1 = `${meal.strMealThumb}`;
                    r1 = `${meal.strMeal}`;

                    html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                            <button  class="in" > ADD IN LIST</button>
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {

                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('not1Found');
            }
            console.log(d);
            let count = 0;
            mealList.innerHTML = html;
            //  console.log(d);
            if (!mealList.classList.contains('notFound')) {
                let dd = document.querySelectorAll(".in");
                for (let i = 0; i < dd.length; i++) {
                    dd[i].addEventListener('click', function () {
                        let html1 = `<img class="ss" src="${d[i].img1}" alt="">
                      <h3>${d[i].head}</h3>
                    <button  class="nn" value= "${d[i].id}">VIEW DETAILS</button>
                    `


                        let c = document.querySelectorAll(".item");
                        //     self(d[i].id);
                        
                          if(g>c.length-1)
                          {
                              g=0;
                          }

                            
                            

                                c[g].innerHTML = " ";
                                c[g].innerHTML = html1;
                                handlemo();
                               g++;


                        
                    })
                }
            }
        });
}

function handlemo() {
    let v = document.querySelectorAll(".nn");
      
    for (let i = 0; i < v.length; i++) {
        v[i].addEventListener("click", function () {
            self(v[i].value);
            let c = document.querySelector(".vc");
            
            console.log(c);
        })
    }
}
function fun1(meal) {
    let d = document.querySelector('.selfmodal');
    d.innerHTML = "";
    meal = meal[0];
    let html = `
             <button class="vc" >REMOVE</button>
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "rec ipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    d.innerHTML = html;
    let x = document.querySelector(".selfmodal");
    let c = document.querySelector(".vc");
    c.addEventListener("click", function () {

        x.style.display ="none";
    })
    x.style.display="block";
}

function self(dataid) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dataid}`)
        .then(response => response.json())
        .then(function (data) {
            fun1(data.meals);
        })
}

// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        console.log(e.target.parentElement.parentElement);

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}