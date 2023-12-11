const findCategoryData = "categories";
const findRecipeData = "recipes";
let seletedType = "";
let selectedData = [];

//print a list of category or recipe in the html file
const printList = () => {};

//get data list category
const getCategoryData = (selectType) => {
  fetch(`/${selectType}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      selectedData = data;
      console.log(selectedData);
    })
    .catch((error) => {
      console.log("error is ", error);
    });
};

//get data list Recipes
const getRecipeData = (selectType) => {
  console.log("recipe data ......");
};

document.getElementById("select-type").addEventListener("change", (e) => {
  e.preventDefault();
  const selectType = e.target.value;
  console.log(selectType);
  if (selectType == findCategoryData) getCategoryData(selectType);
  if (selectType == findRecipeData) getRecipeData(selectType);
});
