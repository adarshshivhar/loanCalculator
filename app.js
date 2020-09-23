document.getElementById('loan-form').addEventListener('submit', function(e){
    //Hide Results 
    document.getElementById('results').style.display = 'none';

    //show loading
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateLoan,2000);

    e.preventDefault();
});

function calculateLoan () {


    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //compute monthly payment 
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

        //Show Results 
        document.getElementById('results').style.display = 'block';

        //hide loading
        document.getElementById('loading').style.display = 'none';
    }else{
        showError('Please check your number');
    }

}

//show error
function showError(error) {
    //hide Results 
    document.getElementById('results').style.display = 'none';

    //hide loading
    document.getElementById('loading').style.display = 'none';

    //create a div
    const errorDiv = document.createElement('div');

    //Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add class
    errorDiv.className = 'alert alert-danger';

    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);

    //clear error after 3 seconds
    setTimeout(clearError,3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}