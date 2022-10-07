document.getElementById("recomendacion").addEventListener("click", ()=>{
    const contenedorResultado = document.getElementById("resultado-busqueda");
    fetch("./recomendaciones.JSON")
    .then(res=> res.json())
    .then(inversiones => {
        inversiones.forEach(({operacion, currency, monto, plazo, ganancia}) => {
            let div = document.createElement("div");
            div.innerHTML = `
            <hr> 
            ${operacion} - 
            ${currency} - 
            ${monto} monto invertido - 
            ${plazo} plazo en días -
            ${ganancia} ganancia`;
        
        contenedorResultado.appendChild(div);
        });
    })
})