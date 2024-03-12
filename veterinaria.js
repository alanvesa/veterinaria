

let registros = [];
let horaMaxima = 21;
let minutosMaximo = 45;


let op = null;
let indice = null;

let animales = [
    { perro: "./imagenes/perro.png" },
    { gato: "./imagenes/gato.png" },
    { ave: "./imagenes/ave.png" },
    { raton: "./imagenes/raton.png" },
    { serpiente: "./imagenes/serpiente.png" },

]



    function validar() {
        let validarTexto = /^[a-zA-Z]+$/;
        let validarTelefono = /^\d{1,11}$/;
      
        nombreMascota = document.getElementById("nombreMascota").value;
        propietario = document.getElementById("propietario").value;
        telefono = document.getElementById("telefono").value;
        fecha = document.getElementById("fecha").value;
        hora = document.getElementById("hora").value;
        sintomas = document.getElementById("sintomas").value;
        tipoMascota = document.getElementById("tipoMascota").value;
        let fechaSeleccionanda = new Date(fecha);
        let fechaActual = new Date();
            let validarHora = parseInt(hora.split(":")[0], 10);
        let validarMinutos = parseInt(hora.split(":")[1], 10);

        if (nombreMascota == "" || (!validarTexto.test(nombreMascota))) {
            document.getElementById("alerta").textContent = "Nombre no debe estar vacio y solo debe tener letras"
            setTimeout(() => {
                document.getElementById("alerta").textContent = "";
            }, 2000);

        } else if (propietario == "" ||(!validarTexto.test(propietario))) {
            document.getElementById("alerta").textContent = "propietario no debe estar vacio y solo debe tener letras"
            setTimeout(() => {
                document.getElementById("alerta").textContent = "";
            }, 2000);
        } else if (telefono == "" ||(isNaN(telefono)) ) {
            document.getElementById("alerta").textContent = "telefono no debe estar vacio y solo debe tener numeros"
            setTimeout(() => {
                document.getElementById("alerta").textContent = "";
            }, 2000);
        } else if (fecha == "") {
            document.getElementById("alerta").textContent = "seleccione una fecha"
            setTimeout(() => {
                document.getElementById("alerta").textContent = "";
            }, 2000);
        }else if( fechaSeleccionanda< fechaActual.setHours(0,0,0,0)){
            document.getElementById("alerta").textContent = "seleccione una posterior a la actual"
            setTimeout(() => {
                document.getElementById("alerta").textContent = "";
            }, 2000);

        } else if (hora == "") {
            document.getElementById("alerta").textContent = "seleccione una hora"
            setTimeout(() => {
                document.getElementById("alerta").textContent = "";
            }, 2000);

        } else if (
            validarHora < 8 ||
            validarHora >horaMaxima ||
            validarMinutos < 0 ||
            validarMinutos > minutosMaximo
          ) {
            document.getElementById("alerta").textContent =
              "debes seleccionar una hora entre las 8 am y las 9:45 pm";
            setTimeout(() => {
              document.getElementById("alerta").textContent = "";
            }, 2000);
        }else if (sintomas == "") {
            document.getElementById("alerta").textContent = "sintomas no debe estar vacio"
            setTimeout(() => {
                document.getElementById("alerta").textContent = "";
            }, 2000);

        }
        else {
            registrar()
        }
    }

    function registrar() {
        let nombreMascota = document.getElementById("nombreMascota").value;
        let propietario = document.getElementById("propietario").value;
        let telefono = document.getElementById("telefono").value;
        let fecha = document.getElementById("fecha").value;
        let hora = document.getElementById("hora").value;
        let sintomas = document.getElementById("sintomas").value;
        let tipoMascota = document.getElementById("tipoMascota").value;
        let estado = document.querySelector('input[name="estado"]:checked').value;

        if (op === true) {
            registros[indice].nombreMascota = nombreMascota;
            registros[indice].propietario = propietario;
            registros[indice].telefono = telefono;
            registros[indice].fecha = fecha;
            registros[indice].hora = hora;
            registros[indice].sintomas = sintomas;
            registros[indice].tipoMascota = tipoMascota;
            registros[indice].estado = estado;

            op = false;
            mostrar();
        } else {
            let cita = {
                nombreMascota: nombreMascota,
                propietario: propietario,
                telefono: telefono,
                fecha: fecha,
                hora: hora,
                sintomas: sintomas,
                tipoMascota: tipoMascota,
                estado: estado
            }
            registros.push(cita);
            mostrar()
        }
        limpiar();
        console.log(registros)
    }


    function limpiar() {
        document.getElementById("nombreMascota").value = "";
        document.getElementById("propietario").value = "";
        document.getElementById("telefono").value = "";
        document.getElementById("fecha").value = "";
        document.getElementById("hora").value = "";
        document.getElementById("sintomas").value = "";
        document.getElementById("tipoMascota").value = "";

    }

    function mostrar() {
        const estadoSeleccionado = document.querySelector('input[name="estado"]:checked');
        const citas = document.getElementById("mostrarCitas");
        citas.innerHTML = '';

        registros.forEach((cita, index) => {
            if (cita.estado === estadoSeleccionado.value || estadoSeleccionado.value === 'abierto') {
                let card = document.createElement("div");
                card.classList.add("card");

                let imagen = document.createElement("img");
                imagen.classList.add("imagen");

                let tipoMascota = cita.tipoMascota.toLowerCase();

                let imagenURL = animales.find((animal) =>
                    animal.hasOwnProperty(tipoMascota));

                if (imagenURL) {
                    imagen.src = imagenURL[tipoMascota];
                    imagen.alt = tipoMascota;
                    card.appendChild(imagen);
                } else {
                    imagen.src = "ruta_a_imagen_por_defecto.png";
                    imagen.alt = "Imagen no disponible";
                    card.appendChild(imagen);
                }

                let detalles = document.createElement("div");
                detalles.classList.add("detalles");

                let nombreMascota = document.createElement("p");
                nombreMascota.textContent = `Nombre de Mascota: ${cita.nombreMascota}`;
                detalles.appendChild(nombreMascota);

                let propietario = document.createElement("p");
                propietario.textContent = `Nombre de Propietario: ${cita.propietario}`;
                detalles.appendChild(propietario);

                let fecha = document.createElement("p");
                fecha.textContent = `fecha de Cita: ${cita.fecha}`;
                detalles.appendChild(fecha);

                let hora = document.createElement("p");
                hora.textContent = `Hora de Cita: ${cita.hora}`;
                detalles.appendChild(hora);

                let telefono = document.createElement("p");
                telefono.textContent = `Telefono: ${cita.telefono}`;
                detalles.appendChild(telefono);

                let sintomas = document.createElement("p");
                sintomas.textContent = `Sintomas: ${cita.sintomas}`;
                detalles.appendChild(sintomas);

                let tipoMascotas = document.createElement("p");
                tipoMascotas.textContent = `Tipo Mascota: ${cita.tipoMascota}`;
                detalles.appendChild(tipoMascotas);

                let estado = document.createElement("p");
                estado.textContent = `Estado: ${cita.estado}`;
                detalles.appendChild(estado);

                let botonEditar = document.createElement("button")
                botonEditar.textContent = "Editar";
                botonEditar.classList.add("buton");
                botonEditar.addEventListener("click", () => {
                    editarCita(index);
                });
                detalles.appendChild(botonEditar);

                let botonCerrar = document.createElement("button")
                botonCerrar.textContent = "Cerrar";
                botonCerrar.classList.add("buton");
                botonCerrar.addEventListener("click", () => {
                    cerrarCita(index);
                });
                detalles.appendChild(botonCerrar);

                let botonCancelar = document.createElement("button")
                botonCancelar.textContent = "Cancelar";
                botonCancelar.classList.add("buton");
                botonCancelar.addEventListener("click", () => {
                    cancelarCita(index);
                });
                detalles.appendChild(botonCancelar);

                card.appendChild(detalles);
                citas.appendChild(card);

            }
        })
    }

    function editarCita(index) {
        let cita = registros[index];
        indice = index
        document.getElementById("nombreMascota").value = cita.nombreMascota;
        document.getElementById("propietario").value = cita.propietario;
        document.getElementById("telefono").value = cita.telefono;
        document.getElementById("fecha").value = cita.fecha;
        document.getElementById("hora").value = cita.hora;
        document.getElementById("sintomas").value = cita.sintomas;
        document.getElementById("tipoMascota").value = cita.tipoMascota;

        op = true;

    }
    function cancelarCita(index) {
        registros[index].estado = 'cancelado';
        mostrar();
    }
    function cerrarCita(index) {
        registros[index].estado = 'cerrado';
        mostrar()
    }
