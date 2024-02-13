let menuWidth = $("#menu").width();
let bars = document.getElementById("bars");
let close = document.getElementById("close");
let search = document.getElementById("search");
let row = document.getElementById("row");
let submitBtn;
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;


$(document).ready(() => {
  searchByName("").then(() => {
      $(".spiner").fadeOut(500)
      $("body").css("overflow", "visible")
  })
})

// Start SideBar
function closeMenu() {
  let menuWidth = $("#header #menu").outerWidth();
  $("#header").animate({ left: -menuWidth }, 500);
  $("#bars").css("display", "block");
  $("#close").css("display", "none");
  $(".menu .list li").animate({ top: 300 }, 500);
}
close.addEventListener("click", closeMenu);
bars.addEventListener("click", () => {
  $("#header").animate({ left: 0 }, 500);
  $("#bars").css("display", "none");
  $("#close").css("display", "block");
  for (let i = 0; i < 5; i++) {
    $(".menu .list li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
});
// End SideBar

// Start Body
async function searchByName(name) {
  let xhr = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  xhr = await xhr.json();
  displayMeals(xhr.meals);
}
searchByName("");
function displayMeals(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div onclick="getMealDetails('${arr[i].idMeal}')" class="col-md-3 my-2 col-sm-6 cartona overflow-hidden" id="cartona" onclick="detailsById('${arr[i].idMeal}')"">
          <img src="${arr[i].strMealThumb}" alt="" class="w-100">
          <div class="layer d-flex align-items-center fs-4 fw-bold">${arr[i].strMeal}</div>
      </div>
      `;
  }
  row.innerHTML = cartona;
}
displayMeals();
// ================================================================================================
// ================================================================================================
async function getMealDetails(mealID) {
  $(".spiner").fadeIn(300)
  search.innerHTML = "";
  closeMenu();
  row.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  respone = await respone.json();
  displayMealDetails(respone.meals[0]);
  $(".spiner").fadeOut(300)

}
function displayMealDetails(meal) {
  search.innerHTML = "";
  let ingredients = ``;
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
      <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartoona = `
    <div class="col-md-4 text-white my-3">
      <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
      <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8 text-white my-3">
      <h2 class="head">Instructions</h2>
      <p>${meal.strInstructions}</p>
      <h3><span class="fw-bolder head">Area : </span>${meal.strArea}</h3>
      <h3><span class="fw-bolder head">Category : </span>${meal.strCategory}</h3>
      <h3 class="head">Recipes :</h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${ingredients}
      </ul>
      <h3 class="head">Tags :</h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${tagsStr}
      </ul>
      <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
      <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`;
  row.innerHTML = cartoona;
}
// ================================================================================================
// ================================================================================================
async function getCategory() {
  $(".spiner").fadeIn(300)

  search.innerHTML = "";
  row.innerHTML = "";
  let xhr = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  xhr = await xhr.json();
  displayCategory(xhr.categories);
  $(".spiner").fadeOut(300)

}
function displayCategory(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div onclick="getCategoryMeals('${
        arr[i].strCategory
      }')" class="col-md-3 my-2 col-sm-6 cartona overflow-hidden" id="cartona"">
          <img src="${arr[i].strCategoryThumb}" alt="" class="w-100">
          <div class="layer text-center fw-bold">
            <h3>${arr[i].strCategory}</h3>
            <p class="p-2">${arr[i].strCategoryDescription
              .split(" ")
              .slice(0, 20)
              .join(" ")}</p>
          </div>
      </div>
      `;
  }
  row.innerHTML = cartona;
}
// ================================================================================================
// ================================================================================================
async function getArea() {
  $(".spiner").fadeIn(300)

  search.innerHTML = "";
  row.innerHTML = "";
  let xhr = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  xhr = await xhr.json();
  displayArea(xhr.meals);
  $(".spiner").fadeOut(300)

}
function displayArea(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div class="col-md-3 col-sm-6 mt-2" id="cartona"">
        <div onclick="getAreaMeals('${arr[i].strArea}')"  class="my-2 areaDiv d-flex align-items-center justify-content-between text-black p-2 bg-body-tertiary">
          <i class="fas fa-solid fa-globe fs-5"></i>
          <h3">${arr[i].strArea}</h3>
        </div>
      </div>
      `;
  }
  row.innerHTML = cartona;
}
// ================================================================================================
// ================================================================================================
async function getIngredients() {
  $(".spiner").fadeIn(300)

  search.innerHTML = "";
  row.innerHTML = "";
  let xhr = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  xhr = await xhr.json();
  displayIngredients(xhr.meals.slice(0, 20));
  $(".spiner").fadeOut(300)

}

function displayIngredients(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div class="col-md-3 col-sm-6 mt-4" id="cartona">
        <div onclick="getIngrediantsMeals('${
          arr[i].strIngredient
        }')" class="areaDiv ingradients text-white p-2 bg-transparent h-100">
          <h3>${arr[i].strIngredient}</h3>
          <p class="p-2">${arr[i].strDescription
            .split(" ")
            .slice(0, 20)
            .join(" ")}</p>
        </div>
      </div>
      `;
  }
  row.innerHTML = cartona;
}
// ================================================================================================
// ================================================================================================
async function getCategoryMeals(category) {
  $(".spiner").fadeIn(300)

  row.innerHTML = "";
  let xhr = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  xhr = await xhr.json();
  displayMeals(xhr.meals.slice(0, 20));
  $(".spiner").fadeOut(300)

}
// ================================================================================================
// ================================================================================================
async function getAreaMeals(area) {
  $(".spiner").fadeIn(300)

  row.innerHTML = "";
  let xhr = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  xhr = await xhr.json();
  displayMeals(xhr.meals.slice(0, 20));
  $(".spiner").fadeOut(300)

}
// ================================================================================================
// ================================================================================================
async function getIngrediantsMeals(ingrad) {
  $(".spiner").fadeIn(300)

  row.innerHTML = "";
  let xhr = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrad}`
  );
  xhr = await xhr.json();
  displayMeals(xhr.meals.slice(0, 20));
  $(".spiner").fadeOut(300)

}
// ================================================================================================
// ================================================================================================
function searchInputs() {

  search.innerHTML = `
    <div class="row py-4 d-flex justify-content-center">
      <div class="col-md-8 my-2">
        <input onkeyup="searchByName(this.value)" type="text" class="form-control bg-transparent text-white" placeholder="Search By Name">
      </div>
    </div>
  `;
  row.innerHTML = "";

}
// ================================================================================================
// ================================================================================================
async function searchByName(item) {
  $(".spiner").fadeIn(300)

  let xhr = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`
  );
  xhr = await xhr.json();
  xhr.meals ? displayMeals(xhr.meals) : displayMeals([]);
  $(".spiner").fadeOut(300)

}
// ================================================================================================
// ================================================================================================
function showContacts() {

  row.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control bg-transparent text-white" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control bg-transparent text-white " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control  bg-transparent text-white" placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control  bg-transparent text-white" placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control  bg-transparent text-white" placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password at least 8 character
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control bg-transparent text-white " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `
  submitBtn = document.getElementById("submitBtn")


  document.getElementById("nameInput").addEventListener("focus", () => {
      nameInputTouched = true
  })

  document.getElementById("emailInput").addEventListener("focus", () => {
      emailInputTouched = true
  })

  document.getElementById("phoneInput").addEventListener("focus", () => {
      phoneInputTouched = true
  })

  document.getElementById("ageInput").addEventListener("focus", () => {
      ageInputTouched = true
  })

  document.getElementById("passwordInput").addEventListener("focus", () => {
      passwordInputTouched = true
  })

  document.getElementById("repasswordInput").addEventListener("focus", () => {
      repasswordInputTouched = true
  })
}
function inputsValidation() {
  if (nameInputTouched) {
      if (nameValidation()) {
          document.getElementById("nameAlert").classList.replace("d-block", "d-none")

      } else {
          document.getElementById("nameAlert").classList.replace("d-none", "d-block")

      }
  }
  if (emailInputTouched) {

      if (emailValidation()) {
          document.getElementById("emailAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("emailAlert").classList.replace("d-none", "d-block")

      }
  }

  if (phoneInputTouched) {
      if (phoneValidation()) {
          document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

      }
  }

  if (ageInputTouched) {
      if (ageValidation()) {
          document.getElementById("ageAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("ageAlert").classList.replace("d-none", "d-block")

      }
  }

  if (passwordInputTouched) {
      if (passwordValidation()) {
          document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

      }
  }
  if (repasswordInputTouched) {
      if (repasswordValidation()) {
          document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
      } else {
          document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

      }
  }


  if (nameValidation() &&
      emailValidation() &&
      phoneValidation() &&
      ageValidation() &&
      passwordValidation() &&
      repasswordValidation()) {
      submitBtn.removeAttribute("disabled")
  } else {
      submitBtn.setAttribute("disabled", true)
  }
}

function nameValidation() {
  return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
  return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
  return (/^[a-zA-Z@_#0-9]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
  return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}