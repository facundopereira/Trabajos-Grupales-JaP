const url = "https://636d939791576e19e32b2c15.mockapi.io/users/";
const container = document.getElementById("results");
const inputSearch = document.getElementById("inputGet1Id");
const btnSearch = document.getElementById("btnGet1");
const inputPostNombre = document.getElementById("inputPostNombre");
const inputPostApellido = document.getElementById("inputPostApellido");
const btnPost = document.getElementById("btnPost");
const inputPutId = document.getElementById("inputPutId");
const btnPut = document.getElementById("btnPut");
const inputPutNombre = document.getElementById("inputPutNombre");
const inputPutApellido = document.getElementById("inputPutApellido");
const btnSendChanges = document.getElementById("btnSendChanges");
const dataModal = document.getElementById("dataModal");
const inputDelete = document.getElementById("inputDelete");
const btnDelete = document.getElementById("btnDelete");
const alertError = document.getElementById("alert-error");

async function fetchear(url) {
  let respuesta = await fetch(url);
  let datos = await respuesta.json();
  console.log(respuesta);
  console.log(datos);
}
fetchear(url);

async function listar() {
  let respuesta = await fetch(url);
  let datos = await respuesta.json();
  let content = ""
  for (let users of datos) {
    content += `
      <li class="m-2 border-bottom">
        <span class="d-block">ID: ${users.id}</span class="d-block">
        <span class="d-block">Name: ${users.name}</span class="d-block">
        <span class="d-block">Lastname: ${users.lastname}</span class="d-block">
      </li> 
    `
  } container.innerHTML = content
}

//GET 

//evento que busca el id que se introduzca en el input y si no se pone nada muestra todos los registros y si un registro es eliminado salta error al buscarlo 
btnSearch.addEventListener("click", async function () {
  let respuesta = await fetch(url + inputSearch.value);
  let datos = await respuesta.json();
  console.log(respuesta);
  console.log(datos);
  if (respuesta.status === 200 && inputSearch.value.length === 0) {
    listar();
    alertError.classList.add("fade")
  }
  if (inputSearch.value.length != 0 && respuesta.status === 200) {
    container.innerHTML = `
        <div class="m-2 border-bottom">
          <span class="d-block">ID: ${datos.id}</span class="d-block">
          <span class="d-block">Name: ${datos.name}</span class="d-block">
          <span class="d-block">Lastname: ${datos.lastname}</span class="d-block">
        </div> 
      `
    alertError.classList.add("fade")
    inputSearch.value = ""
  }
  if (respuesta.status === 500) {
    alertError.classList.remove("fade")
    container.innerHTML = ``
    inputSearch.value = ""
  }
})

//POST

//en este evento lo que hace es habilitar el boton de agregar cuando los 2 campos de nombre y apellido tienen un input.value.length > 0 
inputPostApellido.addEventListener("input", function () {
  if (inputPostNombre.value.length > 0 && inputPostApellido.value.length != 0) {
    btnPost.disabled = false
  } else {
    btnPost.disabled = true
  }
})
//en este evento lo que hace es habilitar el boton de agregar cuando los 2 campos de nombre y apellido tienen un value > 0 los tuve que hacer independientes porque si yo lo hacia solo en 1 cuando borraba el que no tenia evento no se desabilitaba el boton solo se desabilitaba si escribia en el otro input en el que si tenia el evento pero creando 2 eventos hago que los dos input tengan la funcionalidad de desactivar el boton si no tiene un input.value.length = 0 
inputPostNombre.addEventListener("input", function () {
  if (inputPostNombre.value.length > 0 && inputPostApellido.value.length != 0) {
    btnPost.disabled = false
  } else {
    btnPost.disabled = true
  }
})
//este evento ejecuta el method POST agregando al servidor los datos ingresados en los input
btnPost.addEventListener("click", async function () {
  if (inputPostNombre.value.length != 0 && inputPostApellido.value.length != 0) {
    await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${inputPostNombre.value}`,
        lastname: `${inputPostApellido.value}`
      })
    })
    inputPostNombre.value = ""
    inputPostApellido.value = ""
    btnPost.disabled = true
    listar()
  }
})
//PUT

//este evento habilita el boton de modificar si el input.value.length > 0 
inputPutId.addEventListener("input", function () {
  if (inputPutId.value.length > 0) {
    btnPut.disabled = false;
  } else {
    btnPut.disabled = true
  }
})
//este evento lo que hace es avisar antes de abrir el modal de que el valor que desea modificar no existe saltandole la alerta de "alertError" igualmente le abre el modal
btnPut.addEventListener("click", async function () {
  let respuesta = await fetch(url + inputPutId.value);
  let datos = await respuesta.json();
  console.log(respuesta);
  console.log(datos);
  if (respuesta.status === 500) {
    alertError.classList.remove("fade")
    inputPutNombre.value = ""
    inputPutApellido.value = ""
  }
  if (respuesta.status === 200) {
    inputPutNombre.value = datos.name
    inputPutApellido.value = datos.lastname
    alertError.classList.add("fade")
  }
})
// estos 2 siguientes eventos input lo que hacen es habilitar el boton de "guardar"  
inputPutNombre.addEventListener("input", function () {
  if (inputPutNombre.value.length > 0 && inputPutApellido.value.length > 0) {
    btnSendChanges.disabled = false
  } else {
    btnSendChanges.disabled = true
  }
})

inputPutApellido.addEventListener("input", function () {
  if (inputPutNombre.value.length > 0 && inputPutApellido.value.length > 0) {
    btnSendChanges.disabled = false
  } else {
    btnSendChanges.disabled = true
  }
})
// este evento es el que ejecuta el method "PUT" verificando que exista el elemento que quiere modificar, si el id que quiere modificar no existe entonces le deja los 2 campos vacios y al momento de guardarlo le salta la "alertError" en el caso contrario se modifican correctamente los cambios y se muestra en la pantalla el cambio 
btnSendChanges.addEventListener("click", async function () {
  let respuesta = await fetch(url + inputPutId.value, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${inputPutNombre.value}`,
      lastname: `${inputPutApellido.value}`
    })
  })
  if (respuesta.status === 404) {
    alertError.classList.remove("fade")
    inputPutId.value = ""
    btnPut.disabled = true
  }
  if (respuesta.status === 200) {
    alertError.classList.add("fade")
    listar();
    inputPutId.value = ""
    btnPut.disabled = true
  }
})
//DELETE
//este evento lo que hace es habilitar el boton de "Borrar" si el input.value.length es mayor a 0 
inputDelete.addEventListener("input", function () {
  if (inputDelete.value.length > 0) {
    btnDelete.disabled = false;
  } else {
    btnDelete.disabled = true
  }
})
// este evento se ejecuta el method "DELETE" que elimina un registro dependiendo del id que le den en el input  y muestra en pantalla el registro completo sin el elemento borrado
btnDelete.addEventListener("click", async function () {
  let respuesta = await fetch(url + inputDelete.value, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    host: {
      id: inputDelete
    }
  })
  if (respuesta.status === 404) {
    alertError.classList.remove("fade")
    inputDelete.value = ""
    btnDelete.disabled = true
  }
  if (respuesta.status === 200) {
    alertError.classList.add("fade")
    listar();
    inputDelete.value = ""
    btnDelete.disabled = true
  }
})



