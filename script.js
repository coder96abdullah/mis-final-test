document.addEventListener('DOMContentLoaded', () => {
    // Load initial meals when the page is loaded
    searchMeal();
});


document.getElementById('searchButton').addEventListener('click', searchMeal);

async function searchMeal() {
    const searchText = document.getElementById('searchInput').value.trim();
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    const response = await fetch(url);
    const data = await response.json();
    displayMeals(data.meals);
}

function displayMeals(meals) {
    const mealResults = document.getElementById('mealResults');
    mealResults.innerHTML = '';
    const showAllBtnContainer = document.getElementById('showAllBtnContainer');
    showAllBtnContainer.innerHTML = '';

    if (!meals) {
        mealResults.innerHTML = '<p class="col-md-12 text-center">No meals found</p>';
        return;
    }

    const mealSlice = meals.slice(0, 5);

    mealSlice.forEach(meal => {
        const mealItem = createMealItem(meal);
        mealResults.appendChild(mealItem);
    });

    if (meals.length > 5) {
        const showAllButton = createShowAllButton(meals);
        showAllBtnContainer.appendChild(showAllButton);
    }
}

function createMealItem(meal) {
    const mealItem = document.createElement('div');
    mealItem.classList.add('col-md-6', 'mb-5');
    mealItem.innerHTML = `
        <div class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text"><strong>Meal ID:</strong> ${meal.idMeal}</p>
                <p class="card-text"><strong>Cooking Instructions:</strong> ${meal.strInstructions}</p>
            </div>
        </div>
    `;
    return mealItem;
}

function createShowAllButton(meals) {
    const showAllButton = document.createElement('button');
    showAllButton.textContent = 'SHOW ALL';
    showAllButton.classList.add('btn', 'btn-dark');
    showAllButton.addEventListener('click', () => displayAllMeals(meals));
    return showAllButton;
}

function displayAllMeals(meals) {
    const mealResults = document.getElementById('mealResults');
    mealResults.innerHTML = '';
    const showAllBtnContainer = document.getElementById('showAllBtnContainer');
    showAllBtnContainer.innerHTML = '';

    meals.forEach(meal => {
        const mealItem = createMealItem(meal);
        mealResults.appendChild(mealItem);
    });
}
