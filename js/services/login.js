
window.onload = () => {
    window.form = document.querySelector('#form')
    window.errorMessage = document.querySelector('#error-message')
}

const submitLogin = () => {
    obj = {
        email: form.email.value,
        password: form.password.value
    }

    fetch('https://costos-backend.vercel.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    })
    .then((res)=>res.json())
    .then((res)=>{
        sessionStorage.setItem('user-name', res.user)
        sessionStorage.setItem('token', res.token)
        errorMessage.innerText = res.message
        
        if(res.message===''){
            alert('Iniciaste sesion exitosamente')
            location.assign('/')
        }
    })
    .catch(()=>alert('Ocurrio un problema al intentar iniciar sesion'))
}