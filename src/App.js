import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegistroEmpleaods from "./components/RegistroEmpleaods";
import RegistroMedicamentos from "./components/RegistroMedicamentos";
import RegistroProveedores from "./components/RegistroProveedores";
import "./components/css/style.css";

function App() {
  return (
    <div className="App">
        <body>
          <div className="form-register">
            <Router>
              <div className="barraNavegacion">
                <div>
                  <h1>"MI FARMACIA"</h1>
                </div>
                <Link
                  to={"/Home"}
                  type="button"
                  class="btn btn-link mx-3 btn-lg"
                >
                  INICIO
                </Link>
                <Link
                  to={"/empleados"}
                  type="button"
                  class="btn btn-link mx-3 btn-lg"
                >
                  EMPLEADOS
                </Link>
                <Link
                  to={"/medicamentos"}
                  type="button"
                  class="btn btn-link mx-3 btn-lg"
                >
                  MEDICAMENTOS
                </Link>
                <Link
                  to={"/proveedores"}
                  type="button"
                  class="btn btn-link mx-3 btn-lg"
                >
                  PROVEEDORES
                </Link>
                <hr />
              </div>
              <div className="barraNavegacion2">
                <Routes>
                  <Route path="/Home" exact element={<Home />} />
                  <Route path="/empleados" element={<RegistroEmpleaods />} />
                  <Route
                    path="/medicamentos"
                    element={<RegistroMedicamentos />}
                  />
                  <Route
                    path="/proveedores"
                    element={<RegistroProveedores />}
                  />
                </Routes>
              </div>
            </Router>
          </div>
        </body>
    </div>
  );
}

export default App;
