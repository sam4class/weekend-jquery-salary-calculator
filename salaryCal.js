console.log('Here We Go . . .');

let employee = [];
let budget = [];

$(document).ready(onReady);

function onReady() {
    //are we in?
    console.log('DOM is loaded');
    //create an action when submit button is pressed
    $('#submitNewEmployeeBtn').on('click', addNewEmployeeInfo);
    let nowBudget = $('#budgetNeeded');
    nowBudget.empty();
    nowBudget.append(budget);
    //listener for delete button- I can do this!
    $('#addedEmployee').on('click', '#deleteBtn', deleteEmployee);

}

function deleteEmployee() {
    console.log('Inside deleteEmployee()');
    //make a variable to store the new array
    let newEmployee = [];
    /*target the first property to grab the iformation to delete from 
        the array we have been pushing into 'employee'*/
    let employeeToDeleteName = $(this).parent().siblings().first().text();
    console.log('Name to delete:', employeeToDeleteName);
    //loop through emplyee for name
    for (let person of employee) {
        if (person['First Name'] !== employeeToDeleteName) {
            newEmployee.push(person);
        }
    }
    //replace old array with new array because it contains it all but the deleted item
    employee = newEmployee;
    render();
}

function addNewEmployeeInfo() {
    //are we in?
    console.log('Inside addNewEmployeeInfo');

    //add values to each input box
    const firstNameInputValue = $('#firstNameInput').val();
    const lastNameInputValue = $('#lastNameInput').val();
    const idNumberInputValue = $('#idNumberInput').val();
    const jobTitleInputValue = $('#jobTitleInput').val();
    const annualSalaryInputValue = Number($('#annualSalaryInput').val());
    //making sure the values were added
    console.log(`Input Values:
        ${firstNameInputValue},
        ${lastNameInputValue},
        ${idNumberInputValue},
        ${jobTitleInputValue},
        ${annualSalaryInputValue}`);

    //Create an object to hold the inputed values

    const newEmployeeAdd = {
        'First Name': firstNameInputValue,
        'Last Name': lastNameInputValue,
        'ID Number': idNumberInputValue,
        'Job Title': jobTitleInputValue,
        'Annual Salary': annualSalaryInputValue
    }

    //Add to array
    employee.push(newEmployeeAdd);
    console.log('List with added employee', employee);

    //calculate addingbudget
    addingBudget();

    //add render here
    render();
    //place function that clears feilds here
    resetForm();
}

//Create a function that clears the input fields
function resetForm() {
    console.log("Inside of resetForm()");
    // Setter: making the .val a setter not a getter
    $('#firstNameInput').val('');
    $('#lastNameInput').val('');
    $('#idNumberInput').val('');
    $('#jobTitleInput').val('');
    $('#annualSalaryInput').val('');
}

function addingBudget() {
    //are you in?
    console.log('Inside addingBudget');
    let totalCost = 0;
    console.log(employee);
    //loop through each salary and grab the annual salary
    for (let i = 0; i < employee.length; i++) {
        totalCost += Number(employee[i]['Annual Salary']);
        //    console.log(employee[i].annualSalaryInputValue);
    }
    console.log('totalCost:', totalCost);
    //find the monthly budget by dividing the annual by 12 and epmty that value to get the next
    let monthlyCost = totalCost / 12;
    let nowBudget = $('#budgetNeeded');
    nowBudget.empty();
    nowBudget.append(Math.round(monthlyCost));


    /*If the total monthly cost exceeds $20,000, add a 
    red background color to the total monthly cost.*/

    if (monthlyCost >= 20000) {
        console.log('Current total budget', monthlyCost);
        $('#budgetNeeded').css('background-color', 'red');
    }
}


function render() {
    //am i here?
    console.log('Render that!')
    //reset the employee form
    $('#addedEmployee').empty();
    //Loop over the employee list and add the new input of each value
    for (person of employee) {
        $('#addedEmployee').append(`   
    <tr>
        <td>${person['First Name']}</td> 
        <td>${person['Last Name']}</td>
        <td>${person['ID Number']}</td>
        <td>${person['Job Title']}</td> 
        <td>${person['Annual Salary']}</td> 
        <td><button id="deleteBtn">Delete</button></td>
    </tr>
    `);
    }
}
