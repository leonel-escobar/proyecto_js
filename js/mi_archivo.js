$(() => {

    class PlazoFijo {
        constructor(banco, plazo, monto, interesAnual, interesGanado){
            this.banco = banco;
            this.plazo = plazo;
            this.monto = monto;
            this.interesAnual = interesAnual;
            this.interesGanado = interesGanado;
        }
    }

    function obtenerBanco() {
        let banco = $("#bancoUsuario option:selected").val()
        return banco
    }
    
    function obtenerMonto() {
        let monto = $("#montoDepositar").val()
        return monto
    }

    function obtenerPlazo() {
        let plazo = $("#plazoDepositar").val()
        return plazo
    }

    function obtenerInteresAnual() {

        const listadoDeBancos = [
            {banco:"SELECCION", interes:0},
            {banco:"SANTANDER", interes:37},
            {banco:"GALICIA", interes:37},
            {banco:"BBVA", interes:37},
            {banco:"HSBC", interes:37},
            {banco:"PROVINCIA", interes:37},
            {banco:"HIPOTECARIO", interes:34},
            {banco:"REBANKING", interes:37.5},
            {banco:"NACION", interes: 37},
        ]
        
        let seleccionarBanco = listadoDeBancos.find(e => e.banco == obtenerBanco())
        interesAnual = parseFloat(seleccionarBanco.interes)
        return interesAnual
    }

    function calcularTasaAnual() {
        let tasaEfectivaAnual = obtenerInteresAnual() / 100;
        return tasaEfectivaAnual
    }

    function calcularInteresesGanados() {

        let interesGanado = obtenerMonto() * (calcularTasaAnual() * obtenerPlazo() / 365);
        return interesGanado
    }

    function mostrarResultado() {
        const plazoFijo = new PlazoFijo (obtenerBanco(), obtenerPlazo(), obtenerMonto(), obtenerInteresAnual(), calcularInteresesGanados())
        informeLogo.css("display","none");
        informeDeInteres.css("display", "flex");
        informeDeInteres.html(
        ` 
            <ul>
                <li>
                    <p>Plazo: ${plazoFijo.plazo} dias</p>
                </li>
                <li>
                    <p>Capital: $${plazoFijo.monto}</p>
                </li>
                <li>
                    <p>Interes ganado: $${plazoFijo.interesGanado.toFixed(2)}</p>
                </li>
                <li>
                    <p>Tasa de interes: %${plazoFijo.interesAnual}</p>
                </li>
            </ul>
        `)
    }

    let informeDeInteres = $("#informeDeInteres");
    let informeLogo = $("#informeLogo")
    let informeDeErrores = $("#informeDeErrores");

    let formulario = $("#formSimulador");
    formulario.submit(validarFormulario)

    $("#btnBorrar").click(function resetearValores() {
        informeDeInteres.css("display", "none");
        informeLogo.css("display", "flex");
    });

    function validarFormulario(event) {
        event.preventDefault();
        
        informeDeInteres.css("display", "none");
        informeLogo.css("display", "flex");
        
        if($("#bancoUsuario").val() == "SELECCION") {

            informeDeErrores.html( `<p class="error">* Debe seleccionar una entidad bancaria</p>`)
            $("#bancoUsuario").css("border-bottom","1px solid #ee6e73");
        } else {

            informeDeErrores.html("")
            $("#bancoUsuario").css("border-bottom","1px solid #111");
        }

        if($("#montoDepositar").val() < 1000) {
            
            informeDeErrores.append( `<p class="error">* El monto debe ser mayor a $1000</p>`)
            $("#montoDepositar").css("border-bottom", "1px solid #ee6e73");
        } else {
            
            informeDeErrores.append("")
            $("#montoDepositar").css("border-bottom","1px solid #111");
        }
        
        if($("#plazoDepositar").val() < 30 || $("#plazoDepositar").val() > 365) {
            
            informeDeErrores.append( `<p class="error">* El plazo mínimo es de 30 días y el máximo de 365</p>`)
            $("#plazoDepositar").css("border-bottom", "1px solid #ee6e73");
        } else {
            
            informeDeErrores.append("")
            $("#plazoDepositar").css("border-bottom", "1px solid #111");
        }
        
        if(informeDeErrores.html() == "") {
            
            mostrarResultado();
            $("#formSimulador").trigger("reset")
        }
    }
})