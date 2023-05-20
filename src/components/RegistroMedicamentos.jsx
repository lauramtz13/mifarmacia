import React, { useState } from "react";
import editar from './assets/img/editar.png';
import eliminarg from './assets/img/botonx.png';

function RegistroMedicamentos() {
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [matricula4,setMatricula4] = useState("SINDATOS")
  let imageURL;

  const categoriasList = ["ANALGÉSICO", "ANTIÁCIDO", "ANTIINFECCIOSO", "ANTIINFLAMATORIO", "ANTITUSIVO"]
  const [categorias,setCategorias] = useState(categoriasList)

  const presentacionList = ["CAJA", "CÁPSULAS", "COMPRIMIDOS(PASTILLA)", "JARABES"]
  const [presentacion,setPresentacion] = useState(presentacionList)

  const medicamentosLista=[]
  const [medicamentos,setMedicamentos] = useState(medicamentosLista)



  const agregarCategorias=()=>{
    const categoriaNueva = prompt("INGRESA NUEVA CATEGORIA")
    if(categoriaNueva == null || categoriaNueva === ""){
        alert("EL CAMPO ESTA VACIO");
    }else{
        let categoriaNueva2= categoriaNueva.toUpperCase();
        if (categorias.includes(categoriaNueva2)) {
            alert("CATEGORIA YA EXISTENTE.");
        }else {
            alert("CATEGORIA REGISTRADA CON EXITO.");
            setCategorias([...categorias,categoriaNueva2])
        } 
    }
  }

  const agregarPresentacion=()=>{
    const presentacionNueva = prompt("INGRESA NUEVA PRESENTACION")
    if(presentacionNueva == null || presentacionNueva === ""){
        alert("EL CAMPO ESTA VACIO");
    }else{
        let presentacionNueva2= presentacionNueva.toUpperCase();
        if (presentacion.includes(presentacionNueva2)) {
            alert("PRESENTACION YA EXISTENTE.");
        }else {
            alert("PRESENTACION REGISTRADA CON EXITO.");
            setPresentacion([...presentacion,presentacionNueva2])
        } 
    }
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



  const agregaMedicamento=()=>{
    let clave1 = document.getElementById("clave").value;
    let nombre1 = document.getElementById("name").value;
    let categoriaG = document.getElementById("categoria").value;
    let presentacionG = document.getElementById("presentacion").value;
    let minimoG = document.getElementById("minimo").value;
    let maximoG = document.getElementById("maximo").value;
    if(clave1 === "" || nombre1 ==="" || categoriaG === "SELECCION" || presentacionG === "SELECCION" || minimoG ==="" || maximoG ==="" || imageURL == null){
        alert("POR FAVOR RELLENE LOS CAMPOS")
    }else{
        if(validarRegistro(clave1)){
            alert("ESTE ID YA A SIDO REGISTRADO")
            setInputValue(null);
            setInputValue2(null);
            document.getElementById("clave").value = "";
            document.getElementById("name").value = "";
            document.getElementById("categoria").value = "SELECCION";
            document.getElementById("presentacion").value = "SELECCION";
            document.getElementById("minimo").value = "";
            document.getElementById("maximo").value = "";
            document.getElementById("archivo").value="";
            setInputValue(undefined)
            setInputValue2(undefined)
        }else{
            setMedicamentos([...medicamentos,{clave:clave1,nombre:nombre1,categoriaGeneral:categoriaG,presentacionGeneral:presentacionG,stockMinimo:minimoG,stockMaximo:maximoG,foto:imageURL}])
            alert("MEDICAMENTO REGISTRADO EXITOSAMENTE.");
            setInputValue(null);
            setInputValue2(null);
            document.getElementById("clave").value = "";
            document.getElementById("name").value = "";
            document.getElementById("categoria").value = "SELECCION";
            document.getElementById("presentacion").value = "SELECCION";
            document.getElementById("minimo").value = "";
            document.getElementById("maximo").value = "";
            document.getElementById("archivo").value="";
            setInputValue(undefined)
            setInputValue2(undefined)
        }
    }
  }

  function validarRegistro(calveO1) {
    return medicamentos.some(item => item.clave === calveO1);
  }

  function seleccionarFoto(event) {
    const file = event.target.files[0];
    imageURL=URL.createObjectURL(file);
  }


  const eliminarRegistro = (clave) => {
    const nuevaListaMedicamentos = medicamentos.filter((medicamento) => medicamento.clave !== clave);
    setMedicamentos(nuevaListaMedicamentos);
  };


  const editarRegistro = (index, cla) => {
    console.log(index)
    document.getElementById("formulariooculto").style.display = "block";
    document.getElementById("formulario-original").style.display = "none";
    var tabla = document.getElementById("tabla-registros");
    let id = index+1
    var fila = tabla.rows[id];
    document.getElementById("claveEditar").value = fila.cells[0].innerHTML;
    document.getElementById("nombreeditar").value = fila.cells[1].innerHTML;
    document.getElementById("categoriaEditar").value = fila.cells[2].innerHTML;
    document.getElementById("presentacionEditar").value = fila.cells[3].innerHTML;
    document.getElementById("minimoEditar").value = fila.cells[4].innerHTML;
    document.getElementById("maximoEditar").value = fila.cells[5].innerHTML;
    setMatricula4(cla)
  };


  const guardarRegistroEditado = (event) => {
    event.preventDefault(); // evitar que se recargue la página al hacer submit

    // obtener los nuevos datos del registro editado desde los inputs del formulario
    const claveedit = document.getElementById("claveEditar").value;
    const nombreedit = document.getElementById("nombreeditar").value;
    const categoriaedit = document.getElementById("categoriaEditar").value;
    const presentacionedit = document.getElementById("presentacionEditar").value;
    const minimoedit = document.getElementById("minimoEditar").value;
    const maximoedit = document.getElementById("maximoEditar").value;
    const arcivo = document.getElementById('archivoeditar')
    var nuevosDatos;
    // actualizar los datos del registro en el estado de la lista de alumnos
    if(arcivo.value === ''){
      alert("NO SELECCIONO FOTO");
      nuevosDatos = { clave:claveedit, nombre:nombreedit, categoriaGeneral:categoriaedit, presentacionGeneral:presentacionedit, stockMinimo:minimoedit, stockMaximo:maximoedit};
    }else{
      alert("SELECCIONO FOTO")
      nuevosDatos = { clave:claveedit, nombre:nombreedit, categoriaGeneral:categoriaedit, presentacionGeneral:presentacionedit, stockMinimo:minimoedit, stockMaximo:maximoedit, foto:imageURL };
    }
    setMedicamentos(
      medicamentos.map((objeto)=>{
        if(objeto.clave === matricula4){
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
    document.getElementById("clave").value = "";
    document.getElementById("name").value = "";
    document.getElementById("categoria").value = "SELECCION";
    document.getElementById("presentacion").value = "SELECCION";
    document.getElementById("minimo").value = "";
    document.getElementById("maximo").value = "";
    document.getElementById("archivo").value="";
};



  return (
    <>
      <div className="formulario-original" id="formulario-original">
        <h1 className="text-center">FORMULARIO DE MEDICAMENTOS</h1>
        <label class="form-label form-label-sm h4">ID DEL MEDICAMENTO</label>
        <input type="text" id="clave" name="clave" className="form-control" value={inputValue2} onChange={handleInputChange2}/>
        <br />
        <br />
        <label class="form-label form-label-sm h4">NOMBRE DEL MEDICAMENTO</label>
        <input type="text" id="name" name="name" className="form-control" value={inputValue} onChange={handleInputChange} required/>
        <br />
        <br />


        <div class="row g-7">
          <div class="col-auto">
            <label class="form-label form-label-sm h4">CATEGORIA </label>
            <br />
            <select id="categoria" name="categoria" className="form-select custom-input">
              <option value="SELECCION">--SELECCIONAR--</option>
              {categorias.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
            <br />
            <input type="submit" onClick={agregarCategorias} value="AGREGAR NUEVA CATEGORIA" className="btn btn-success" required/>
            <br />
          </div>
          <div class="col-auto">
            <label class="form-label form-label-sm h4">PRESENTACION DEL MEDICAMENTO</label>
            <br />
            <select id="presentacion" name="presentacion" className="form-select custom-input">
              <option value="SELECCION">--SELECCIONAR--</option>
              {presentacion.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
            <br />
            <input type="submit" onClick={agregarPresentacion} value="AGREGAR NUEVA PRESENTACION" className="btn btn-success" required/>
            <br />
          </div>
        </div>


        <br />
        <label class="form-label form-label-sm h4">STOCK MINIMO</label>
        <input type="text" id="minimo" name="minimo" className="form-control" required/>
        <br/>
        <br />
        <label class="form-label form-label-sm h4">STOCK MAXIMO</label>
        <input type="text" id="maximo" name="maximo" className="form-control"required/>
        <br />
        <br />
        <label class="form-label form-label-sm h4">SELECCIONA FOTO DEL MEDICAMENTO</label>
        <br />
        <input id="archivo" type="file" onChange={seleccionarFoto} className="form-control" required/>
        <br />
        <button onClick={agregaMedicamento} className="btn btn-success">AGREGAR EL MEDICAMENTOO</button>
        <br />
      </div>


      <h2>LISTA DE MEDICAMENTOS</h2>
        <table border={1} id="tabla-registros" className="table table-dark table-striped-columns">
          <thead>
            <tr className="table-secondary">
              <th>ID</th>
              <th>NOMBRE</th>
              <th>CATEGORIA</th>
              <th>PRESENTACION</th>
              <th>STOCK.MN</th>
              <th>STOCK.MX</th>
              <th>FOTO</th>
              <th>ELIMINAR</th>
              <th>EDITAR</th>
            </tr>
          </thead>
          {medicamentos.map((item, index) => (
            <thead key={index}>
              <tr>
                <td id="elemento">{item.clave}</td>
                <td id="elemento">{item.nombre}</td>
                <td id="elemento">{item.categoriaGeneral}</td>
                <td id="elemento">{item.presentacionGeneral}</td>
                <td id="elemento">{item.stockMinimo}</td>
                <td id="elemento">{item.stockMaximo}</td>
                <td id="elemento">
                  <img src={item.foto} alt="" style={{ width: "100px", height: "100px" }}/>
                </td>
                <td>
                  <button  className="btn btn-success" onClick={() => eliminarRegistro(item.clave)}>
                    <img src={eliminarg} alt="" />
                  </button>
                </td>
                <td>
                  <button className="btn btn-success" onClick={() => editarRegistro(index, item.clave)}>
                    <img src={editar} alt="" />
                  </button>
                </td>
              </tr>
            </thead>
          ))}
        </table>


      <form onSubmit={guardarRegistroEditado} id="formulariooculto" className="formulario-oculto">
          <input type="text" name="claveEditar" placeholder="CLAVE DE PRODUCTO" id="claveEditar" className="form-control " required/>
          <br />
          <input type="text" name="nombreeditar" placeholder="NOMBRE DE PRODUCTO" id="nombreeditar" className="form-control" value={inputValue} onChange={handleInputChange} required/>
          <br />

          <div class="row g-7">
          <div class="col-auto">
            <select id="categoriaEditar" name="categoriaEditar" className="form-select custom-input" required>
                <option value="SELECCION">--SELECCIONAR--</option>
                {categorias.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
            </select>
            <br />
          </div>
          <div class="col-auto">
            <select id="presentacionEditar" name="presentacionEditar" className="form-select custom-input">
                <option value="SELECCION">--SELECCIONAR--</option>
                {presentacion.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
            <br />
          </div>
        </div>
          <br />
          <input type="text" name="minimoEditar" placeholder="STOCK MINIMO" id="minimoEditar" className="form-control" required/>
          <br />
          <br />
          <input type="text" name="maximoEditar" placeholder="STOCK MAXIMO" id="maximoEditar" className="form-control" required/>
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

export default RegistroMedicamentos;
