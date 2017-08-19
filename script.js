window.addEventListener("DOMContentLoaded", function () {

    var categories = [];
    //name, expenseTarget, currentExpense
    saveInitial();
    retrieveCategories();
    statusBarsRefresh();
    console.log("Testing: ", categories);
    var toggleAddCategories = document.getElementById('toggleAddCategories');
    var toggleAddExpenses = document.getElementById('toggleAddExpenses');
    var addExpenses = document.getElementById('add-expenses');
    var addCategories = document.getElementById('add-categories');
    var addCategoriesForm = document.getElementById('addCategoriesForm');
    var addExpensesForm = document.getElementById('addExpensesForm');

    var select_category = document.getElementById('select-category');
    refreshCategoryList();

    addExpenses.style.display = 'none';
    addCategories.style.display = 'none';

    toggleAddCategories.addEventListener("click", function () {

        if (addCategories.style.display == 'none') {
            addCategories.style.display = 'block';
        } else {
            addCategories.style.display = 'none';
        }
    });

    toggleAddExpenses.addEventListener("click", function () {
        if (addExpenses.style.display == 'none') {
            addExpenses.style.display = 'block';
        } else {
            addExpenses.style.display = 'none';
        }
    });

    addCategoriesForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        let category = addCategoriesForm.elements[0].value;
        let targetExpense = +addCategoriesForm.elements[1].value;
        console.log(category);
        console.log(targetExpense);
        categories.push({
            name: category,
            expenseTarget: targetExpense,
            currentExpense: 0
        });
        save();
        retrieveCategories();
        refreshCategoryList();
        statusBarsRefresh();

    })


    addExpensesForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        let expense = +addExpensesForm.elements[0].value;
        let categoryName = addExpensesForm.elements[1].value;

        let paymentMethod = addExpensesForm.elements[2].value;
        let expenseName = addExpensesForm.elements[3].value;

        categories.map((category) => {
            if (category.name == categoryName) {
                category.currentExpense += expense;
                if (category.currentExpense >= (0.8 * category.expenseTarget)) {
                    alert("You have spent more than 80% of the target expense for " + category.name);
                }
                return category;
            }
            return category;
        })

        save();
        retrieveCategories();
        statusBarsRefresh();
    })


    function save() {

        localStorage.setItem('category', JSON.stringify(categories));
        console.log('Saving categories into the localStorage');
    }

    function saveInitial() {

        categories = [{
                name: 'Food',
                expenseTarget: 1800,
                currentExpense: 500
            },
            {
                name: 'Travel',
                expenseTarget: 1900,
                currentExpense: 200
            },
            {
                name: 'Clothes',
                expenseTarget: 2000,
                currentExpense: 1100
            },
            {
                name: 'Bills',
                expenseTarget: 3000,
                currentExpense: 2500
            }
        ];

        localStorage.setItem('category', JSON.stringify(categories));
        console.log('Saving categories into the localStorage');
    }

    function retrieveCategories() {
        console.log('Retrieving categories');
        //Convert string into objects and store them in categories
        categories = JSON.parse(localStorage.getItem('category') ? localStorage.getItem('category') : '[]');
    }

    function refreshCategoryList() {


        $('#select-category')
            .empty();


        for (var i = 0; i < categories.length; i++) {
            var opt = document.createElement('option');
            opt.value = categories[i].name;
            opt.innerHTML = categories[i].name;
            select_category.appendChild(opt);
        }
    }

    function statusBarsRefresh() {
        $('#status').empty();

        for (category of categories) {
            var percent = (category.currentExpense / category.expenseTarget) * 100;
            console.log(percent);
            if (percent >= 0 && percent < 40) {

                var progressBar =
                    ' <div class="progress"><label>' + category.name + '</label>' +
                    '<div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar"' +
                    'aria-valuenow="' + percent + '" aria-valuemin="0" aria-valuemax="100" style="width:' + percent + '%">' +
                    Math.round(percent * 100) / 100 + '%' +
                    '</div></div>';
            } else if (percent > 40 && percent < 80) {
                var progressBar =
                    ' <div class="progress"><label>' + category.name + '</label>' +
                    '<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar"' +
                    'aria-valuenow="' + percent + '" aria-valuemin="0" aria-valuemax="100" style="width:' + percent + '%">' +
                    Math.round(percent * 100) / 100 + '%' +
                    '</div></div>';
            } else if (percent > 80) {
                var progressBar =
                    ' <div class="progress"><label>' + category.name + '</label>' +
                    '<div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"' +
                    'aria-valuenow="' + percent + '" aria-valuemin="0" aria-valuemax="100" style="width:' + percent + '%">' +
                    Math.round(percent * 100) / 100 + '%' +
                    '</div></div>';
            }
            $("#status").append(progressBar);

        }

    }

}, false);