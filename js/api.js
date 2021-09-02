$(()=>{

    const urlDolar = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"

    $(".cotizacion__info").append('<button id="consultaDolar" class="botonAzul">Consultar</button>');
    $("#consultaDolar").click(()=> {
        $.get(urlDolar, function(respuesta, estado){
            if(estado==="success"){
                let datos = respuesta;
                    $(".modal__valores").html(`<div>
                                        <p>OFICIAL Compra: <span class="valor">$${datos[0].casa.compra}</span> / Venta: <span class="valor">$${datos[0].casa.venta}</span><p>
                                        <p>BLUE Compra: <span class="valor">$${datos[1].casa.compra}</span> / Venta: <span class="valor">$${datos[1].casa.venta}</span></p>
                                    </div>`)
                
            }
        });
        $("#modal").css("display", "flex")
    });

    $("#cerrarModal").click(()=>{
        $("#modal").css("display", "none")
    });
});

