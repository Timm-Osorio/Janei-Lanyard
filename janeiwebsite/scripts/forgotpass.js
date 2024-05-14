document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forgotPasswordForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;

        fetch('/forgot_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageDiv.textContent = 'Temporary password sent to your email. Please check your inbox.';
            } else {
                messageDiv.textContent = 'Email address not found. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}); 
