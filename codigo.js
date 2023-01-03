
/**************************************************************************************/

//abrir y cerrar modal producto
let db__add_element_btn_pdct = document.querySelector('.data_base__add_element_btn.product');
let db__pdct__modal__close_btn = document.querySelector('.db__pdct__modal__close_btn');

let db__pdct__modal_background = document.querySelector('.db__pdct__modal_background');

db__add_element_btn_pdct.addEventListener('click', (e)=> {
  db__pdct__modal_background.classList.add('modal_active');
})

db__pdct__modal__close_btn.addEventListener('click', (e)=> {
  db__pdct__modal_background.classList.remove('modal_active');
  //borro los campos
  form_pdct__modal.reset();
});

/**************************************************************************************/

//abrir y cerrar modal recetas
let db__add_element_btn_recipe = document.querySelector('.data_base__add_element_btn.recipe');
let db__recipe__modal__close_btn = document.querySelector('.db__recipe__modal__close_btn');

let db__recipe__modal_background = document.querySelector('.db__recipe__modal_background');

db__add_element_btn_recipe.addEventListener('click', (e)=> {
  db__recipe__modal_background.classList.add('modal_active');
})

db__recipe__modal__close_btn.addEventListener('click', (e)=> {
  db__recipe__modal_background.classList.remove('modal_active');
  
  let db__recipe__modal__recipe_name = document.querySelector("#db__recipe__modal__recipe_name");
  let db__recipe__modal__ingr_name = document.querySelectorAll(".db__recipe__modal__ingr_name");
  let db__recipe__modal__input_servings = document.querySelector("#db__recipe__modal__input_servings");

  //limpio campo
  db__recipe__modal__ingr_name.forEach( (e)=>{e.parentNode.remove()} );
  db__recipe__modal__recipe_name.value = "";
  db__recipe__modal__input_servings.value = "";
  
});

/**************************************************************************************/

//abrir y cerrar modal comidas

let db__meal__modal__close_btn = document.querySelector('.db__meal__modal__close_btn');
let db__meal__modal_background = document.querySelector('.db__meal__modal_background');

var calendar_reference;

function setAddMealBtnFunction(){
  let calendar__add_meal_btn = document.querySelectorAll('.calendar__add_meal_btn');
  calendar__add_meal_btn.forEach(element => {
    element.addEventListener('click', (e)=> {
      db__meal__modal_background.classList.add('modal_active');
      calendar_reference = e.target.parentNode.previousElementSibling;
    });
  })
}

setAddMealBtnFunction();

db__meal__modal__close_btn.addEventListener('click', (e)=> {
  db__meal__modal_background.classList.remove('modal_active');
  
  let db__meal__modal__meal_name = document.querySelector("#db__meal__modal__meal_name");
  let db__meal__modal__ingr_name = document.querySelectorAll(".db__meal__modal__ingr_name");

  //limpio campo
  db__meal__modal__ingr_name.forEach( (e)=>{e.parentNode.remove()} );
  db__meal__modal__meal_name.value = "";
  
});

/**************************************************************************************/

//boton agregar semana
let week_html_structure = document.querySelector(".calendar__week").outerHTML;
const addWeek = document.querySelector(".calendar__add_week_btn");

addWeek.addEventListener("click", (e)=>{
  document.querySelector(".calendar__week_list").innerHTML += week_html_structure;
  setAddMealBtnFunction();
});

/**************************************************************************************/


//declaro algunos elementos:
var data_base__list_pdct = document.querySelector(".data_base__list.product");
var data_base__list_recipe = document.querySelector(".data_base__list.recipe");

/**************************************************************************************/

class Product{
  constructor(id, name, price, qty, unit, unitPrice){
    this.id = id;
    this.name = name;
    this.price = price;
    this.qty = qty;
    this.unit = unitPrice;
  }
  UpdateUnitPrice(){
    //to do
  }
}

//boton agregar producto a la base de datos
var dataBase_products = [
{
  id: 1661581861,
  name : "leche",
  price: 2.05,
  qty: 1,
  unit: "litres",
  unitPrice: 2
},
{
  id: 1661583561,
  name : "arroz",
  price: 1,
  qty: 1,
  unit: "kg",
  unitPrice: 2
},
{
  id: 1663481861,
  name : "papa",
  price: 4,
  qty: 10,
  unit: "unidades",
  unitPrice: 2
}];

var form_pdct__modal = document.querySelector('form[name="form_pdct__modal"]');
var product_name = document.querySelector('#db__pdct__modal__input_name');
var product_price = document.querySelector('#db__pdct__modal__input_price');
var product_qty = document.querySelector('#db__pdct__modal__input_qty');
const getProductUnits = () => document.querySelector('input[class="db__pdct__modal__radio__input"]:checked');


let db__pdct__modal__add_btn = document.querySelector('.db__pdct__modal__add_btn');
let objectToAdd;

db__pdct__modal__add_btn.addEventListener('click', (e)=> {
  //to do: verificar que esten completos todos los campos

  let id = new Date().getTime();

  //agrego el producto a la base de datos
  
  objectToAdd = new Product(id, product_name.value, product_price.value, product_qty.value, (getProductUnits().value), (product_price.value/product_qty.value));
  /*objectToAdd = {
    id: id, 
    name : product_name.value,
    price: product_price.value,
    qty: product_qty.value,
    unit: getProductUnits().value,
    unitPrice: (product_price.value/product_qty.value)
  };*/

  dataBase_products.push(objectToAdd);

  //cierro el modal
  db__pdct__modal_background.classList.remove('modal_active');

  //borro los campos
  form_pdct__modal.reset();

  //cargo el producto al DOM
  data_base__list_pdct.innerHTML += `<div class="data_base__element product">
  <div class="data_base__element_icon"><img class="button" src="img/icon-png24/bx-double-dots-vertical.png"></div>
  <div class="data_base_element_name">${objectToAdd.name}<img class="button" src="img/icon-png24/bx-x.png"></div>
  <div class="data_base_element_price">${objectToAdd.price}</div>
  <div class="data_base_element_qty">${objectToAdd.qty} ${objectToAdd.unit}</div>
  </div>`;

});


/**************************************************************************************/

//search bar modal recetas

// getting all required elements (i use let because once the input is filled, these variables will be recalculated)
let searchWrapper = document.querySelector(".search-input");
let inputBox = searchWrapper.querySelector(".input");
let suggBox = searchWrapper.querySelector(".autocom-box");
let db__recipe__modal__label_box = document.querySelector(".db__recipe__modal__label_box");


function insertIngrToRecipeModal(element){
    let ingr_name_data = element.textContent;
    let ingr_name_id = element.getAttribute("data-id");
    let ingr_name_unitPrice = element.getAttribute("data-unitPrice");

    db__recipe__modal__label_box.innerHTML += `<div class="db__recipe__modal__label_pack">
    <label class="db__recipe__modal__ingr_name" data-id=${ingr_name_id} data-unitPrice=${ingr_name_unitPrice}>${ingr_name_data}</label>
    <input class="db__recipe__modal__label"><img class="button" id="confirm_qty" src="img/icon-png24/plus-regular-24.png">
    </div>`
    
    let confirm_qty = db__recipe__modal__label_box.querySelectorAll("#confirm_qty");
    confirm_qty.forEach(e => {
      e.addEventListener("click", (e)=>{
        let recipe_qty = (e.target).previousElementSibling.value;
        let new_item = document.createElement('label');
        new_item.classList.add("db__recipe__modal__ingr_qty");
        new_item.innerText = recipe_qty;
        (e.target).parentNode.replaceChild(new_item , (e.target).previousElementSibling);
        e.target.remove();
        //to do: aca deberia hacer lo mismo que el replaceChild, y cambiarlo por un img que sea una cruz, y que esa cruz borre el elemento cuando sea clikeada
      })
    });
  
    inputBox.value = "";
    searchWrapper.classList.remove("active");

    //inputBox.value = selectData;
    //searchWrapper.classList.remove("active");
}

function showSuggestions(list, elementToShow){
    let listData;
    /** 
    //este codigo no lo uso porque lo que hace es:
    //si el array de coincidencias esta vacio (es decir el producto que quiero no está), agregar eso que estoy escribiendo
    a la lista de sugeridos, para que aparezca como opcion por mas que no exista, para que el usuario luego lo pueda clickear
    y quede en el input.
    a mi esto no me sirve porque si el priducto no esta, lo tiene que agregar a la base de datos de productos, no puede agregar
    algo que no se encuentre en la base de datos. porque luego al momento de agregar la receta le va a tirar error. 
    
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    */
    listData = list.join('');
    elementToShow.innerHTML = listData;
}

// if user press any key and release
inputBox.onkeyup = (e)=>{
  let userData = e.target.value; //user enetered data
  let emptyArray = [];
  if(userData){
      emptyArray = dataBase_products.filter((data)=>{
          //filtering array object and user characters to lowercase and return only those objects which includes user enetered chars
          return (data.name).toLocaleLowerCase().includes(userData.toLocaleLowerCase());
      });
      emptyArray = emptyArray.map((data)=>{
          //passing return data inside li tag
          return data = `<li data-id=${data.id} data-unitPrice=${data.unitPrice}>${data.name} ${data.price}€/${data.qty}${data.unit} (${data.unitPrice}/1${data.unit})</li>`;
      });
      searchWrapper.classList.add("active"); //show autocomplete box
      showSuggestions(emptyArray, suggBox);
      let allList = suggBox.querySelectorAll("li");
      for (let i = 0; i < allList.length; i++) {
          //adding onclick attribute in all li tag
          allList[i].setAttribute("onclick", "insertIngrToRecipeModal(this)");
      }
  }else{
      searchWrapper.classList.remove("active"); //hide autocomplete box
  }
}


/**************************************************************************************/


//boton agregar receta a la base de datos:

class Recipe{
  constructor(id, name, ingredients, total_price, servings, unit){
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.totalPrice = total_price;
    this.servings = servings;
    this.unit = unit;
  }
  UpdateTotalPrice(){
    //to do
  }
}

var dataBase_recipes = [
  {
    id: 343848617,
    name : "empanadas",
    ingredients: [[dataBase_products.id, 2],[dataBase_products.id, 3],[dataBase_products.id, 4]],
    totalPrice: 20, 
    servings: 1,
    unit: "litres"
  },
  {
    id: 343848616,
    name : "tarta puerro y pollo",
    ingredients: [[dataBase_products.id, 2],[dataBase_products.id, 3],[dataBase_products.id, 4]],
    totalPrice: 20, 
    servings: 1,
    unit: "litres"
  },
  {
    id: 343848619,
    name : "guiso",
    ingredients: [[dataBase_products.id, 2],[dataBase_products.id, 3],[dataBase_products.id, 4]],
    totalPrice: 20,
    servings: 1,
    unit: "litres"
  }
];

/*cosas a tener en cuenta, una receta guarda el puntero a un cierto producto.
ventaja: si cambia el precio, se puede actualizar los precios de las recetas
desventaja: si borro el producto, se caga la receta

otra forma de hacerlo es al momento de crear la receta, que guarde una copia del elemento.
ventaja: puedo borrar el elemento y no pasa nada
desventaja: si cambia el precio del producto, tengo que cambiar mannualmente la receta

*/


let db__recipe__modal__add_btn = document.querySelector(".db__recipe__modal__add_btn");
const getRecipeUnits = () => document.querySelector('input[class="db__recipe__modal__radio__input"]:checked').value;
let arrayToAdd = [];


db__recipe__modal__add_btn.addEventListener("click", (e)=> {

  let db__recipe__modal__recipe_name = document.querySelector("#db__recipe__modal__recipe_name");
  let db__recipe__modal__ingr_name = document.querySelectorAll(".db__recipe__modal__ingr_name");
  let db__recipe__modal__ingr_qty = document.querySelectorAll(".db__recipe__modal__ingr_qty");
  let db__recipe__modal__input_servings = document.querySelector("#db__recipe__modal__input_servings");

  let ingredient_id;
  let totalPrice = 0;
  let ingredient_qty;
  for (let i=0; i<(db__recipe__modal__ingr_name.length); i++){
    ingredient_id = (db__recipe__modal__ingr_name[i]).getAttribute('data-id');
    ingredient_qty = db__recipe__modal__ingr_qty[i].innerHTML;
    totalPrice += ingredient_qty * (db__recipe__modal__ingr_name[i].getAttribute('data-unitPrice'));
    arrayToAdd.push([ingredient_id, ingredient_qty]);
  }

  let id = new Date().getTime();

  objectToAdd = new Recipe(id, db__recipe__modal__recipe_name.value, arrayToAdd, totalPrice, db__recipe__modal__input_servings.value, getRecipeUnits());
  
  /*objectToAdd = {
    id: id,
    name: db__recipe__modal__recipe_name.value,
    ingredients: arrayToAdd,
    totalPrice: totalPrice,
    servings: db__recipe__modal__input_servings.value,
    unit: getRecipeUnits()
  }*/

  arrayToAdd = [];

  dataBase_recipes.push(objectToAdd);


  //limpio campo
  db__recipe__modal__ingr_name.forEach( (e)=>{e.parentNode.remove()} );
  db__recipe__modal__recipe_name.value = "";
  db__recipe__modal__input_servings.value = "";

  //cierro modal
  db__recipe__modal_background.classList.remove('modal_active');


  //cargo el producto al DOM
  data_base__list_recipe.innerHTML += `<div class="data_base__element recipe">
  <div class="data_base__element_icon"><img class="button" src="img/icon-png24/bx-double-dots-vertical.png"></div>
  <div class="data_base_element_name">${objectToAdd.name}<img class="button" src="img/icon-png24/bx-x.png"></div>
  <div class="data_base_element_price">${objectToAdd.totalPrice}</div>
  <div class="data_base_element_qty">${objectToAdd.servings} ${objectToAdd.unit}</div>
  </div>`;



});


/**************************************************************************************/

//search bar comidas

// getting all required elements (i use let because once the input is filled, these variables will be recalculated)
let meal_searchWrapper = document.querySelector(".meal_search-input");
let meal_inputBox = meal_searchWrapper.querySelector(".meal_input");
let mealPdct_suggBox = meal_searchWrapper.querySelector(".meal_pdct_autocom-box");
let mealRecipe_suggBox = meal_searchWrapper.querySelector(".meal_recipe_autocom-box");
let db__meal__modal__label_box = document.querySelector(".db__meal__modal__label_box");


function insertMealToMealModal(element){
  let ingr_name_data = element.textContent;
  let ingr_name_id = element.getAttribute("data-id");

  db__meal__modal__label_box.innerHTML += `<div class="db__meal__modal__label_pack">
  <label class="db__meal__modal__ingr_name" data-id=${ingr_name_id}>${ingr_name_data}</label>
  <input class="db__meal__modal__label"><img class="button" id="confirm_qty" src="img/icon-png24/plus-regular-24.png">
  </div>`
  
  let confirm_qty = db__meal__modal__label_box.querySelectorAll("#confirm_qty");
  confirm_qty.forEach(e => {
    e.addEventListener("click", (e)=>{
      let meal_qty = (e.target).previousElementSibling.value;
      let new_item = document.createElement('label');
      new_item.classList.add("db__meal__modal__ingr_qty");
      new_item.innerText = meal_qty;
      (e.target).parentNode.replaceChild(new_item , (e.target).previousElementSibling);
      e.target.remove();
      //to do: aca deberia hacer lo mismo que el replaceChild, y cambiarlo por un img que sea una cruz, y que esa cruz borre el elemento cuando sea clikeada
    })
  });

  inputBox.value = "";
  meal_searchWrapper.classList.remove("active");

  //inputBox.value = selectData;
  //meal_searchWrapper.classList.remove("active");
}


// if user press any key and release
meal_inputBox.onkeyup = (e)=>{
  let userData = e.target.value; //user enetered data
  let pdct_list = [];
  let recipe_list = [];
  if(userData){
      pdct_list = dataBase_products.filter((data)=>{
        //filtering array object and user characters to lowercase and return only those objects which includes user enetered chars
        return (data.name).toLocaleLowerCase().includes(userData.toLocaleLowerCase());
      });
      recipe_list = dataBase_recipes.filter((data)=>{
        //filtering array object and user characters to lowercase and return only those objects which includes user enetered chars
        return (data.name).toLocaleLowerCase().includes(userData.toLocaleLowerCase());
      });

      pdct_list = pdct_list.map((data)=>{
        //passing return data inside li tag
        return data = `<li data-id=${data.id}>${data.name} (${data.price}€/${data.qty} ${data.unit})</li>`;
      });
      recipe_list = recipe_list.map((data)=>{
        //passing return data inside li tag
        return data = `<li data-id=${data.id}>${data.name} (${data.totalPrice}€/${data.servings} ${data.unit})</li>`;
      });

      meal_searchWrapper.classList.add("active"); //show autocomplete box
      showSuggestions(pdct_list, mealPdct_suggBox);
      showSuggestions(recipe_list, mealRecipe_suggBox);
      let pdctList = mealPdct_suggBox.querySelectorAll("li");
      for (let i = 0; i < pdctList.length; i++) {
          //adding onclick attribute in all li tag
          pdctList[i].setAttribute("onclick", "insertMealToMealModal(this)");
      }
      let recipeList = mealRecipe_suggBox.querySelectorAll("li");
      for (let i = 0; i < recipeList.length; i++) {
          //adding onclick attribute in all li tag
          recipeList[i].setAttribute("onclick", "insertMealToMealModal(this)");
      }
  }else{
      meal_searchWrapper.classList.remove("active"); //hide autocomplete box
  }
}



/**************************************************************************************/


function setExpandMealBtnFunction(){
  let calendar__expand_meal_btn = document.querySelectorAll('.button expand_meal');
  calendar__expand_meal_btn.forEach(element => {
    element.addEventListener('click', (e)=> {
      element.nextElementSibling.classList.add('.active');
      //to do: esto funciona?
    });
  })
}


//agregar comida al calendario

let db__meal__modal__add_btn = document.querySelector(".db__meal__modal__add_btn");

db__meal__modal__add_btn.addEventListener("click", (e)=>{
  let db__meal__modal__meal_name = document.querySelector("#db__meal__modal__meal_name");
  let db__meal__modal__ingr_name = document.querySelectorAll(".db__meal__modal__ingr_name");
  let db__meal__modal__ingr_qty = document.querySelectorAll(".db__meal__modal__ingr_qty");

  let ingredientsList = "";
  //to do: no se que mierda pasa pero cuanod uso el IN me lo lee bien pero tambien me guarda las props, si uso el OF no me puede leer la variable, me 
  //dice que es undefinded
  for(let ingredient in db__meal__modal__ingr_name){
    ingredientsList += `${db__meal__modal__ingr_name[ingredient].innerHTML} --> ${db__meal__modal__ingr_qty[ingredient].innerHTML}`
  };

  calendar_reference.innerHTML += `<div class="calendar__meal_pack">
  <div class="calendar_meal_name">${db__meal__modal__meal_name.value}<img class="button expand_meal" src="img/icon-png24/bx-expand-alt.png"></div>
  <div class="calendar_meal_ingredients">${ingredientsList}</div>
  </div>`

  //cierro modal
  db__meal__modal_background.classList.remove('modal_active');

  //limpio campo
  db__meal__modal__ingr_name.forEach( (e)=>{e.parentNode.remove()} );
  db__meal__modal__meal_name.value = "";

  //tengo que refrescar eventos a los expand meal
  setExpandMealBtnFunction();

});





var week = [
  {
    id: null,
    name : "Observaciones",
    weekNumber: 1,
    requirements: [[dataBase_products.id, 2],[dataBase_products.id, 3],[dataBase_products.id, 4]],
    totalPrice: null
  },
  {
    id: null,
    name : "Lunes",
    weekNumber: null,
    meals: [[dataBase_products.id, 2],[dataBase_products.id, 3],[dataBase_products.id, 4]],
    totalPrice: 20, 
    servings: 1,
    unit: "litres"
  },
];

/*
to do:
crear el objeto day
crear el objeto week, compuesto por varios objetos day
crear el objeto calendario, compuesto por varias weeks

el objeto week tiene que tener un metodo que calcule los requerimientos y el total price
el objeto calendario tiene que tener un metodo que calcule el total price y que saque estadisticas mas generales (ya vere cuales)
*/