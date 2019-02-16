// Listen for the submit

document.getElementById('loan-form').addEventListener('submit', function(a){
// hide results
document.getElementById('results').style.display = 'none';


//show the loader gif
document.getElementById('loading').style.display = 'block';


setTimeout(calculateResults, 1000);


a.preventDefault();
});

// Calculate the Results

function calculateResults(){

    // UI vers the <The Dom only gets the value in a string format>

    const UIamount = document.getElementById('amount');
    const UIinterest = document.getElementById('interest');
    const UIyears = document.getElementById('years');
    const UImonthly = document.getElementById('monthly-payment');
    const UItotal = document.getElementById('total-payment');
    const UItotalInterest = document.getElementById('total-interest')

    // so you need to convert it, with parseFloat() converts the amount into a decimal
    const principal = parseFloat(UIamount.value);
    const calculateInterest = parseFloat(UIinterest.value) / 100 / 12;
    const calculatePayments = parseFloat(UIyears.value) * 12;

    // compute the monthly payment
    const y = Math.pow(1 + calculateInterest, calculatePayments);
    const monthly = (principal*y*calculateInterest)/(y-1);

    // To test the validation Check whether a number is a finite, legal number:

    if(isFinite(monthly)){
        UImonthly.value = monthly.toFixed(2);
        UItotal.value = (monthly * calculatePayments).toFixed(2);
        // operator precedence
        UItotalInterest.value = ((monthly * calculatePayments)-principal).toFixed(2);

        // show resualts
        document.getElementById('results').style.display = 'block';

        // hide the loader
        document.getElementById('loading').style.display = 'none';

    }else{

        showError('Check your number Bro');

    }

}

// show error function

function showError(error){
// create a div 
const errorDiv = document.createElement('div');


// hide resualts
document.getElementById('results').style.display = 'none';

// hide the loader
document.getElementById('loading').style.display = 'none';


// Get the elements

const card = document.querySelector('.card');
const heading = document.querySelector('.heading');


errorDiv.className = 'alert alert-danger';

// Create test node and append to div

errorDiv.appendChild(document.createTextNode(error));

// insert error above heading, insert the errorDiv element in the perant
card.insertBefore(errorDiv, heading);
 
// claer error after 3 seconds

setTimeout(clearError, 3000);
}

// Clear Error

function clearError(){
    document.querySelector('.alert').remove();
}