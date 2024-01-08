const findCategoryData = "categories";
const findRecipeData = "recipes";
let seletedType = "";
let selectedData = [];

//print a list of category or recipe in the html file
const printList = (dataToPrint, selectDiv) => {
  let htmlStr = "<option selected>Select Category</option>";
  for (const category of dataToPrint) {
    htmlStr +=
      "<option value=" + category._id + ">" + category.name + "</option>";
  }
  selectDiv.innerHTML = htmlStr;
};

//get data list category
const getCategoryData = (selectType) => {
  fetch(`/${selectType}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const categoryData = data;
      // console.log(categoryData);
      //showing category upload block
      document.getElementById("category-upload-block").style.display = "block";
      const selectDiv = document.getElementById("categorySelectDiv");
      printList(categoryData, selectDiv);
    })
    .catch((error) => {
      console.log("error is ", error);
    });
};

//get data list Recipes
const getRecipeData = (selectType) => {
  console.log("recipe data ......");
};

//selecting category or recipes
document.getElementById("select-type").addEventListener("change", (e) => {
  e.preventDefault();
  const selectType = e.target.value;
  console.log(selectType);
  if (selectType == findCategoryData) getCategoryData(selectType);
  if (selectType == findRecipeData) getRecipeData(selectType);
});

// document.addEventListener("DOMContentLoaded", function () {
//   // event.preventDefault();
//   // Get the form element
//   var myForm = document.getElementById("categoryUpdateForm");

//   //Get the selected category's id
//   let dropdown = document.getElementById("categorySelectDiv");
//   var selectedIndex = dropdown.selectedIndex;

//   // Get the selected option's value
//   var selectedValue = dropdown.options[selectedIndex].value;

//   console.log(selectedValue);

//   // Add an event listener for form submission
//   myForm.addEventListener("submit", function (event) {
//     // Prevent the default form submission
//     event.preventDefault();

//     // Get the value of your ID parameter (replace 'your_id_value' with the actual value or source)
//     // var idValue = "your_id_value";

//     // // Set the form action with the ID parameter
//     // myForm.action = "/your-api-endpoint/" + idValue;

//     // // Submit the form
//     // myForm.submit();
//   });
// });

function uploadImageFun() {
  event.preventDefault();
  console.log("image upload fun");
  // Get the form element
  var myForm = document.getElementById("categoryUpdateForm");

  //Get the selected category's id
  let dropdown = document.getElementById("categorySelectDiv");
  var selectedIndex = dropdown.selectedIndex;

  // Get the selected option's value
  var selectedValue = dropdown.options[selectedIndex].value;

  console.log(selectedValue);

  var actionUrl = `/image-upload/upload-category-image/${selectedValue}`;

  // Set the form action with the ID parameter
  myForm.action = actionUrl;
  myForm.submit();
}
