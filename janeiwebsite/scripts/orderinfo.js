    //add input field
    var inputCount = 0; 

document.getElementById('addInput').addEventListener('click', function() {
    if (inputCount < 4) {
        var inputContainer = document.getElementById('inputContainer');

        var inputField = document.createElement('div');
        inputField.className = 'flex items-center';

        var newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.className = 'w-full bg-slate-300 shadow-sm shadow-slate-900 md:p-2 p-1 rounded-md';
        inputField.appendChild(newInput);

        //cancel the inputted field
        var cancelButton = document.createElement('button');
        cancelButton.className = 'ml-2 md:px-2 md:py-2 p-1  text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white';
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', function(event) {
            var inputField = this.parentNode; 
            inputField.parentNode.removeChild(inputField);  
            inputCount--;   
        });
        inputField.appendChild(cancelButton);

        inputContainer.appendChild(inputField);
        inputCount++; 
    } else {
        const errorContainer5 = document.getElementById('errorContainer5');
            errorContainer5.style.display = 'block';
            setTimeout(() => {
                errorContainer5.style.display = 'none';
        }, 3000);
       
    }
});

        // default input cliked cancel laman
        document.getElementById('inputContainer').addEventListener('click', function(event) {
            if (event.target.classList.contains('border-red-500')) {
                var fileInput = event.target.parentNode.querySelector('input[type=file]');
                fileInput.value = ''; 
            }
        });

        //counter
        document.addEventListener("DOMContentLoaded", function() {
            const countElement = document.getElementById("count");
            const incrementBtn = document.getElementById("incrementBtn");
            const decrementBtn = document.getElementById("decrementBtn");
            let count = 0;

            function updateCount() {
                countElement.value = count;
            }
            updateCount(); 
            incrementBtn.addEventListener("click", function() {
                count++;
                updateCount();
            });

            decrementBtn.addEventListener("click", function() {
                count--;
                updateCount();
            });
        });

        //modal order
        const orderButton = document.getElementById('orderButton');
        const modal = document.getElementById('myModal');

        orderButton.addEventListener('click', function() {
        modal.classList.remove('hidden');
        });

        modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
        });

        