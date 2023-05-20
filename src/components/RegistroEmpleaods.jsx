import React,{ useState } from 'react'
import eliminarg from './assets/img/botonx.png'
import editar from './assets/img/editar.png'
import './css/style.css';

function RegistroEmpleaods() {
    const [matricula4,setMatricula4] = useState("SINDATOS")
    let imageURL;

    const rolesList = ["EMPLEADO", "ADMINISTRADOR", "GERENTE GENERAL"]
    const empleadosLista=[]

    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');

    const [empleados,setEmpleados] = useState(empleadosLista)

    

    function seleccionarFoto(event) {
        const file = event.target.files[0];
        imageURL=URL.createObjectURL(file);
    }


    function handleInputChange(event) {
        // Convertimos el texto ingresado a mayúsculas
        const uppercasedValue = event.target.value.toUpperCase();
        // Actualizamos el estado con el nuevo valor en mayúsculas
        setInputValue(uppercasedValue);
      }

      function handleInputChange2(event) {
        // Convertimos el texto ingresado a mayúsculas
        const uppercasedValue2 = event.target.value.toUpperCase();
        // Actualizamos el estado con el nuevo valor en mayúsculas
        setInputValue2(uppercasedValue2);
      }

    function validarRegistro(matricula1) {
        return empleados.some(item => item.matricula === matricula1);
      }

    const agregaAlumnos=()=>{
        let matricula1 = document.getElementById("matricula").value;
        let nombre1 = document.getElementById("name").value;
        let carrera1 = document.getElementById("rolesg").value;
        if(matricula1 === "" || nombre1 ==="" || carrera1 === "SELECCION" || imageURL == null){
            alert("POR FAVOR RELLENE LOS CAMPOS")
        }else{
            if(validarRegistro(matricula1)){
                alert("ESTE ID YA EXISTE ")
                setInputValue(null);
                document.getElementById("matricula").value = "";
                document.getElementById("name").value = "";
                document.getElementById("rolesg").value = "SELECCION";
                document.getElementById("archivo").value="";
            }else{
                setEmpleados([...empleados,{matricula:matricula1,nombre:nombre1,carrerageneral:carrera1,foto:imageURL}])
                alert("EMPLEADO REGISTRADO EXITOSAMENTE.");
                setInputValue(null);
                setInputValue2(null);
                document.getElementById("matricula").value = "";
                document.getElementById("name").value = "";
                document.getElementById("rolesg").value = "SELECCION";
                document.getElementById("archivo").value="";
                setInputValue(undefined)
                setInputValue2(undefined)
            }
        }
    }


    const eliminarRegistro = (matricula) => {
        const nuevaListaEmpleados = empleados.filter((alumno) => alumno.matricula !== matricula);
        setEmpleados(nuevaListaEmpleados);
    };

    const editarRegistro = (index, matr) => {
        console.log(index)
        document.getElementById("formulariooculto").style.display = "block";
        document.getElementById("formulario-original").style.display = "none";
        var tabla = document.getElementById("tabla-registros");
        let id = index+1
        var fila = tabla.rows[id];
        document.getElementById("matriculaeditar").value = fila.cells[0].innerHTML;
		    document.getElementById("nombreeditar").value = fila.cells[1].innerHTML;
		    document.getElementById("roleseditar").value = fila.cells[2].innerHTML;
        setMatricula4(matr)
    };

    const guardarRegistroEditado = (event) => {
        event.preventDefault(); // evitar que se recargue la página al hacer submit
    
        // obtener los nuevos datos del registro editado desde los inputs del formulario
        const matriculaedit = document.getElementById("matriculaeditar").value;
        const nombreedit = document.getElementById("nombreeditar").value;
        const carreraedit = document.getElementById("roleseditar").value;
        const arcivo = document.getElementById('archivoeditar')
        var nuevosDatos;
        // actualizar los datos del registro en el estado de la lista de alumnos
        if(arcivo.value === ''){
          alert("NO SELECCIONO FOTO");
          nuevosDatos = { matricula:matriculaedit, nombre:nombreedit, carrerageneral:carreraedit};
        }else{
          alert("SELECCIONO FOTO")
          nuevosDatos = { matricula:matriculaedit, nombre:nombreedit, carrerageneral:carreraedit, foto:imageURL };
        }
        setEmpleados(
          empleados.map((objeto)=>{
            if(objeto.matricula === matricula4){
              return {...objeto,...nuevosDatos}
            }else{
              return objeto;
            }
          })
        );    
        // limpiar el formulario y volver a estado inicial
        event.target.reset();
        document.getElementById("formulariooculto").style.display = "none";
        document.getElementById("formulario-original").style.display = "block";
        document.getElementById("matricula").value = "";
        document.getElementById("name").value = "";
        document.getElementById("rolesg").value = "SELECCION";
        document.getElementById("archivo").value="";
    };


  return (
    <>
    <div className='formulario-original' id='formulario-original'>
          <h1 className='text-center'>FORMULARIO DE EMPLEADOS</h1>
          <label class="form-label form-label-sm h4">ID DEL EMPLEADO</label>
          <input type="text" id="matricula" name="matricula" className="form-control" value={inputValue2} onChange={handleInputChange2} required/>
          <br />
          <br />
          <label class="form-label form-label-sm h4">NOMBRE DEL EMPLEADO</label>
          <input type="text" id="name" name="name" className="form-control" value={inputValue} onChange={handleInputChange} required/>
          <br />
          <br />
          <label class="form-label form-label-sm h4">ROL QUE DESEMPEÑA</label>
          <br />
          <select id="rolesg" name="rolesg" className="form-select" required>
            <option value="SELECCION">--SELECCIONAR--</option>
            {rolesList.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <br />
          <br />
          <br />
          <label class="form-label form-label-sm h4">SELECCIONA FOTO DEL EMPLEADO</label>
          <br />
          <input id="archivo" type="file" onChange={seleccionarFoto} className="form-control" required/>
          <br />
          <button onClick={agregaAlumnos} className="btn btn-success">AGREGAR EL EMPLEADO</button>
          <br />
        </div>
        <br />
        <h2>LISTA DE EMPLEADOS</h2>
        <table border={1} id="tabla-registros" className="table table-dark table-striped-columns">
          <thead>
            <tr className="table-secondary">
              <th>ID</th>
              <th>NOMBRE</th>
              <th>CARGO</th>
              <th>FOTO</th>
              <th>ELIMINAR</th>
              <th>EDITAR</th>
            </tr>
          </thead>
          {empleados.map((item, index) => (
            <thead key={index}>
              <tr>
                <td id="elemento">{item.matricula}</td>
                <td id="elemento">{item.nombre}</td>
                <td id="elemento">{item.carrerageneral}</td>
                <td id="elemento">
                  <img src={item.foto} alt="" style={{ width: "100px", height: "100px" }}/>
                </td>
                <td>
                  <button onClick={() => eliminarRegistro(item.matricula)} className="btn btn-success">
                    <img src={eliminarg} alt="" />
                  </button>
                </td>
                <td>
                  <button onClick={() => editarRegistro(index, item.matricula)} className="btn btn-success">
                    <img src={editar} alt="" />
                  </button>
                </td>
              </tr>
            </thead>
          ))}
        </table>
        <br />

        <form onSubmit={guardarRegistroEditado} id="formulariooculto" className="formulario-oculto">
          <input
            type="text" name="matriculaeditar" placeholder="Matrícula" id="matriculaeditar" className="form-control " required/>
          <br />
          <input type="text" name="nombreeditar" placeholder="Nombre" id="nombreeditar" className="form-control" value={inputValue} onChange={handleInputChange} required/>
          <br />
          <select id="roleseditar" name="roleseditar" className="form-select">
            <option value="SELECCION">--SELECCIONAR</option>
            {rolesList.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <br />
          <input id="archivoeditar" type="file" onChange={seleccionarFoto} className="form-control"/>
          <br />
          <br />
          <button type="submit" className="btn btn-success">
            GUARDAR CAMBIOS
          </button>
        </form>
        <br />
    </>
  );
}

export default RegistroEmpleaods