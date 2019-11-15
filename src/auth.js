const signupForm = document.quarySelector('#sign-up');
signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const email = signupForm['email'].value;
    const password = signupForm['pass'].value;

    console.log(email,password);
})