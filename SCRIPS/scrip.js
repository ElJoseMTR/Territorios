document.getElementById("presionarsesion").addEventListener("click",function(event){
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "TerriTorios" && password === "Territorios12"){
        window.location.href = "../Territorios/Paginas/inicio.html"
    }else{
        alert("Usuario o contraseñas incorrecta")
    }

});

//FUNCIONES
//Inicio
function openMapa() {
    document.getElementById("appinicio").style.display = "none";
    document.getElementById("appdatos").style.display = "none";
    document.getElementById("appmapa").style.display = "block";
}
function openInicio() {
    document.getElementById("appdatos").style.display = "none";
    document.getElementById("appmapa").style.display = "none";
    document.getElementById("appinicio").style.display = "block";
}
function openImagen() {
    document.getElementById("appinicio").style.display = "none";
    document.getElementById("appmapa").style.display = "none";
    document.getElementById("appdatos").style.display = "block";
}

function crearmapa() {

    const nombreMapa = document.getElementById("nombremapa").value.trim();

    if (!nombreMapa) {
        alert("Por favor, ingrese un nombre para el territorio.");
        return;
    }

    fetch("https://api-territorios.onrender.com/agregar_mapa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre: nombreMapa })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta del servidor:", data);

        if (data.error) {
            alert("Error: " + data.error);
        } else {
            alert("Mapa agregado correctamente: " + data.nombre);
            document.getElementById("nombremapa").value = "";
        }
    })
    .catch(error => {
        console.error("Error al agregar el mapa:", error);
        alert("Ocurrió un error al enviar la solicitud.");
    });
/////////////////////////
fetch("https://api-territorios.onrender.com/agregar_grupo", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ nombre: nombreMapa })
})
.then(response => response.json())
.then(data => {
    console.log("Respuesta del servidor:", data);
})
.catch(error => {
    console.error("Error al agregar el mapa:", error);
    alert("Ocurrió un error al enviar la solicitud.");
});

fetch("https://api-territorios.onrender.com/agregar_grupo2", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ nombre: nombreMapa })
})
.then(response => response.json())
.then(data => {
    console.log("Respuesta del servidor:", data);
})
.catch(error => {
    console.error("Error al agregar el mapa:", error);
    alert("Ocurrió un error al enviar la solicitud.");
});

fetch("https://api-territorios.onrender.com/agregar_grupo3", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ nombre: nombreMapa })
})
.then(response => response.json())
.then(data => {
    console.log("Respuesta del servidor:", data);
})
.catch(error => {
    console.error("Error al agregar el mapa:", error);
    alert("Ocurrió un error al enviar la solicitud.");
});


fetch("https://api-territorios.onrender.com/agregar_grupo4", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ nombre: nombreMapa })
})
.then(response => response.json())
.then(data => {
    console.log("Respuesta del servidor:", data);
})
.catch(error => {
    console.error("Error al agregar el mapa:", error);
    alert("Ocurrió un error al enviar la solicitud.");
});

}
    
function seleccionarMapa(nombre) {
    localStorage.setItem("Mapa", nombre);
    localStorage.setItem("estado", "ver");
    localStorage.setItem("grupo", "1");

    document.getElementById("listaMapas").innerHTML = "";

    document.querySelector(".mapaCentro1").style.display = "block";

    document.querySelector(".DIVELIMINAR").style.display = "block";

    fetch(`https://api-territorios.onrender.com/checkmanzanas/1?nombre=${encodeURIComponent(nombre)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error:", data.error);
                return;
            }

            const columnas = [
                "MSalon", "MChacon", "MLaBotella", "MFCarvajal", "MFMaldonado", 
                "MFrenteSalon", "MFPolanco", "MFVargas", "MTiendaLaPoderosa", 
                "MFCriales", "MFEcheverria", "MHIslanda", "MFCastro", 
                "MFSantiagoChacon", "MIslita", "MBicicletasBikebar", 
                "MTiendaSureña", "MCasaCarnaval"
            ];

            columnas.forEach(columna => {
                const pathElement = document.getElementById(columna);
                if (pathElement) {
                    if (data[columna] === "NO") {
                        pathElement.setAttribute("fill", "red");
                    } else if (data[columna] === "SI") {
                        pathElement.setAttribute("fill", "green"); 
                    }
                }
            });
        })
        .catch(error => console.error("Error al buscar el salón:", error));
        document.querySelector(".botonesEdit").style.display = "block";
}




function clickeditar(){
    const mapa = localStorage.getItem("Mapa");

    if (mapa) {
        alert("¡Ya puedes editar!");
        localStorage.setItem("estado", "edita"); 
    } else {
        alert("Primero selecciona un mapa antes de editar.");
    }
}
function clickguardar(){
    const estado = localStorage.getItem("estado");
    if (estado === "edita"){
        localStorage.setItem("estado", "ver");
    }
}

function Eliminar() {
    const mapa = localStorage.getItem("Mapa");

    if (!mapa) {
        alert("No hay un mapa guardado en el almacenamiento local.");
        return;
    }

    fetch("https://api-territorios.onrender.com/eliminar_mapa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ Mapa: mapa })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensaje || data.error);
        if (!data.error) {
            localStorage.removeItem("Mapa"); 
            location.reload();
        }
    })
    .catch(error => console.error("Error:", error));
}