API.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    window.location.href = 'index.html';
  });
const elAuthForm = document.getElementById('auth-form');
const elFormMessage =document.getElementById('formMessage');
const elName = document.getElementById('name');
const elEmail = document.getElementById('email');
const elPassword = document.getElementById('password');
const elPhone = document.getElementById('phone');
const elAddress = document.getElementById('address');

elAuthForm.addEventListener('submit', function(e){
    e.preventDefault();

    const name = elName.value.trim();
    const email = elEmail.value.trim();
    const password = elPassword.value.trim();
    const phone = elPhone.value.trim();
    const address = elAddress.value.trim();

    const data = { name, email, password, phone, address };

    API.post('/users/register', data)
    .then(function (responseRegister){
        API.post('/auth/login', { email, password }).then(function (responseLogin){
            window.location.href = 'index.html';
        });
    })
    .catch(function (err) {
        const errors = err.response.data.errors;
        console.log('errors', errors);

        let errString = '';

        for (const properly in errors) {
            errString += `<li>${errors[properly]}</li>`
        }

        elFormMessage.innerHTML = `
        <div class="alert alert-danger" role="alert">
        <ul></ul>
        </div> `;
    });
});