//Mensaje de bienvenida
const wrapper = document.getElementById('welcome');
wrapper.innerHTML = '<h1>Bienvenidos a Finance</h1>'


//Agrego libreria para que cuando ingrese recuerde llenar formulario para registrarse.
Toastify({
    text: "Bienvenidos, no se olvide de llenar el formulario para que un agente se contacte y pueda comenzar a invertir",
    duration: 3000,
    newWindow: true,
    close: true, 
    gravity: "top", 
    position: "center", 
    stopOnFocus: true, 
    style: {
        background: "linear-gradient(to right, #005681, #111111)",
    },
    onClick: function(){
        
    } 
}).showToast(); 

//Creo un array  con las distintas alternativas de inversión
let listaInversion = ["Plazo Fijo en $", "Plazo Fijo en USD", "Bonos", "Acciones"];

//Utilizo select para que el cliente vea que tipos de inversiones puede realizar

let select = document.createElement("select"); 
for (let i=0; i<listaInversion.length; i++){ 
    select.innerHTML += `<option value='${i}'> ${listaInversion[i]}</option>`;
}

select.addEventListener('change', function (e) {
    const h3 = document.createElement('h3');
    h3.innerHTML = listaInversion[e.target.value];
    // document.getElementById('tipo').appendChild(h3);
})
document.getElementById('tipo').appendChild(select); 

//Comienzo de aplicacion de inversion
class Inversion{
    constructor(operacion, currency, monto, plazo){
        this.operacion = operacion;
        this.currency = currency;
        this.monto = monto;
        this.plazo = plazo;
    }
} 

let inversiones = JSON.parse(localStorage.getItem("inversiones")) ?? [];
document.getElementById("formulario-inversion").addEventListener("submit", handlerAgregaInversion);


function handlerAgregaInversion(e) {
    e.preventDefault();

    const formulario = new FormData(e.target);
    const operacion = formulario.get("operacion");
    const currency = formulario.get("currency");
    const monto = formulario.get("monto");
    const plazo = formulario.get("plazo");

    const inversion = new Inversion(operacion, currency, monto, plazo);

    agregarInversion(inversion)
    e.target.reset();
}

        
function agregarInversion(inversion) {
    if(camposCorrectos(inversion)) {
        inversiones.push(inversion)
        localStorage.setItem("inversiones", JSON.stringify(inversiones));
        mostrarInversiones();
    }
}

function mostrarInversiones() {
    let listadodeInversiones = document.getElementById("listadodeInversiones");
    listadodeInversiones.innerHTML = "";
    
    inversiones.forEach(({operacion, currency,monto, plazo}) => {
        let li = document.createElement("li");
        li.innerHTML = `
        <hr> 
        ${operacion} - 
        ${currency} - ${monto} -
        ${plazo}`;
    

    const botonBorrar = document.createElement("button");
    botonBorrar.innerText = "Borrar";

    botonBorrar.addEventListener("click", () => {
        eliminarInversion(operacion);
    })
    li.appendChild(botonBorrar);

    listadodeInversiones.appendChild(li);
    });
}

function eliminarInversion(operacion) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            inversiones = inversiones.filter(item => item.operacion != operacion);
            localStorage.setItem("inversiones", JSON.stringify(inversiones));
            mostrarInversiones();
            Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
            )
        }
    })
}

mostrarInversiones();

//Realizo gráfico de como fluctuaron los bonos en los últimos meses
const labels = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
];

const data = {
    labels: labels,
    datasets: [{
        label: 'Fluctuación de bonos 2022',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 10, 15, 18, 20],
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {}
};

const myChart = new Chart(
    document.getElementById('bono'),
    config
);

