
// Form References
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const securityForm = document.getElementById('securityForm');

        // Toggle Links
        document.getElementById('showRegister').addEventListener('click', function (e) {
            e.preventDefault();
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        });

        document.getElementById('showLogin').addEventListener('click', function (e) {
            e.preventDefault();
            registerForm.classList.remove('active');
            loginForm.classList.add('active');
        });

        // Registration Form Submission
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const account = document.getElementById('account').value.trim();
            const pin = document.getElementById('pin').value.trim();
            const question = document.getElementById('question').value;
            const answer = document.getElementById('answer').value.trim();

            if (account.length !== 5 || isNaN(account)) {
                document.getElementById('register-message').textContent = 'Invalid account number.';
                return;
            }

            const user = { account, pin, question, answer: answer.toLowerCase() };
            localStorage.setItem('registeredUser', JSON.stringify(user));
            document.getElementById('register-message').textContent = 'Registration successful! Redirecting...';

            setTimeout(() => {
                registerForm.reset();
                registerForm.classList.remove('active');
                loginForm.classList.add('active');
            }, 1500);
        });

        // Login Button
        document.getElementById('loginBtn').addEventListener('click', function () {
            const pin = document.getElementById('loginPin').value.trim();
            const user = JSON.parse(localStorage.getItem('registeredUser'));

            if (user && user.pin === pin) {
                loginForm.classList.remove('active');
                securityForm.classList.add('active');
                document.getElementById('securityQuestionLabel').textContent = user.question;
            } else {
                document.getElementById('login-message').textContent = 'Invalid PIN.';
            }
        });

        // Security Verification
        document.getElementById('verifyBtn').addEventListener('click', function () {
            const answer = document.getElementById('securityAnswer').value.trim().toLowerCase();
            const user = JSON.parse(localStorage.getItem('registeredUser'));

            if (user && user.answer === answer) {
                document.getElementById('security-message').textContent = 'Login successful! Welcome to your dashboard.';
            } else {
                document.getElementById('security-message').textContent = 'Incorrect answer.';
            }
        });
