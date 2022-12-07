let form = document.getElementsByTagName("form")[0];
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let email = document.getElementById("email");
let password1 = document.getElementById("password1");
let password2 = document.getElementById("password2");
let terminos = document.getElementById("terminos");
let validationFeedback01 = document.getElementById("validationFeedback01");
let validationFeedback02 = document.getElementById("validationFeedback02");
let validationFeedback03 = document.getElementById("validationFeedback03");
let validationFeedback04 = document.getElementById("validationFeedback04");
let validationFeedback05 = document.getElementById("validationFeedback05");
let validationFeedback06 = document.getElementById("validationFeedback06");
let btn = document.getElementById("button");
form.noValidate = true
password1.minlength = 6

form.addEventListener("submit", function(e){
    e.preventDefault()
    if(nombre.value.length===0){
        nombre.className = "form-control is-invalid"
        validationFeedback01.innerHTML = "Debe ingresar un nombre"
    } else if(nombre.value.length!=0){
        nombre.className = "form-control is-valid"
        validationFeedback01.innerHTML = ""
    }
    if(apellido.value.length===0){
        apellido.className = "form-control is-invalid"
        validationFeedback02.innerHTML = "Debe ingresar un apellido"
    } else if(apellido.value.length!=0){
        apellido.className = "form-control is-valid"
    }
    if(email.value.length===0 || email.validity.typeMismatch){
        email.className = "form-control is-invalid"
        validationFeedback03.innerHTML = "Debe ingresar un email"
    } else if(email.value.length!=0){
        email.className = "form-control is-valid"
    }
    if(password1.validity.tooShort || password1.value.length===0){
        password1.className = "form-control is-invalid"
        validationFeedback04.innerHTML = "Debe ingresar una contraseña con al menos 6 caracteres"
    } else if(!password1.validity.tooShort){
        password1.className = "form-control is-valid"
    }
    if(password2.value!=password1.value || password1.validity.tooShort || password1.value.length===0){
        password2.className = "form-control is-invalid"
        validationFeedback05.innerHTML = `Debe ser igual a "contraseña" `
    }else if (password2.value===password1.value){
        password2.className = "form-control is-valid"
    }
    if(!terminos.checked){
        btn.style="color:#dc3545"
        btn.className = "btn btn-link ps-0 is-invalid"
        validationFeedback06.innerHTML = "Debe aceptar los términos de servicio"
        terminos.className = "form-check-input is-invalid"
    } else if(terminos.checked){
        btn.style="color:#0d6efd"
        btn.className = "btn btn-link ps-0"
        validationFeedback06.innerHTML = ""
        terminos.className = "form-check-input is-valid"
    }
    if(nombre.value.length!=0 && apellido.value.length!=0 && email.value.length!=0 && !email.validity.typeMismatch && !password1.validity.tooShort && password2.value===password1.value && terminos.checked){
        location.reload()
    }
})

nombre.addEventListener("input", function(){
    if(nombre.value.length===0){
        nombre.className = "form-control is-invalid"
        validationFeedback01.innerHTML = "Debe ingresar un nombre"
    } else if(nombre.value.length!=0){
        nombre.className = "form-control is-valid"
        validationFeedback01.innerHTML = ""
    }
})

apellido.addEventListener("input", function(){
    if(apellido.value.length===0){
        apellido.className = "form-control is-invalid"
        validationFeedback02.innerHTML = "Debe ingresar un apellido"
    } else if(apellido.value.length!=0){
        apellido.className = "form-control is-valid"
    }
})

email.addEventListener("input", function(){
    if(email.value.length===0 || email.validity.typeMismatch){
        email.className = "form-control is-invalid"
        validationFeedback03.innerHTML = "Debe ingresar un email"
    } else if(email.value.length!=0){
        email.className = "form-control is-valid"
    }
})
password1.addEventListener("input", function(){
    if(password1.validity.tooShort || password1.value.length===0){
        password1.className = "form-control is-invalid"
        validationFeedback04.innerHTML = "Debe ingresar una contraseña con al menos 6 caracteres"
    } else if(!password1.validity.tooShort){
        password1.className = "form-control is-valid"
    }
})
password2.addEventListener("input", function(){
    if(password2.value!=password1.value || password1.validity.tooShort || password1.value.length===0){
        password2.className = "form-control is-invalid"
        validationFeedback05.innerHTML = `Debe ser igual a "contraseña" `
    }else if (password2.value===password1.value){
        password2.className = "form-control is-valid"
    }
})
terminos.addEventListener("input", function(){
    if(!terminos.checked){
        btn.style="color:#dc3545"
        btn.className = "btn btn-link ps-0 is-invalid"
        validationFeedback06.innerHTML = "Debe aceptar los términos de servicio"
        terminos.className = "form-check-input is-invalid"
    } else if(terminos.checked){
        btn.style="color:#0d6efd"
        btn.className = "btn btn-link ps-0"
        validationFeedback06.innerHTML = ""
        terminos.className = "form-check-input is-valid"
    }
})

