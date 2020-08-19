import React from "react";
import axios from "axios";
import Footer from "./Footer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: 0,
      name: "",
      ubicacion: "",
      telefono: "",
    };
  }

  componentDidMount() {
    axios.get("https://polar-mountain-90943.herokuapp.com/api").then((res) => {
      this.setState({
        users: res.data,
        id: 0,
        name: "",
        ubicacion: "",
        telefono: "",
      });
    });
  }
  // Funciones para capturar el valor de los inputs y actualizar el estado
  namechange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  ubicacionchange = (event) => {
    this.setState({
      ubicacion: event.target.value,
    });
  };
  telefonochange = (event) => {
    this.setState({
      telefono: event.target.value,
    });
  };

  // Cuando el formulario se envia
  submit(event, id) {
    event.preventDefault();
    if (id === 0) {
      // Crear Registros en la BD
      axios
        .post("https://polar-mountain-90943.herokuapp.com/api", {
          name: this.state.name,
          ubicacion: this.state.ubicacion,
          telefono: this.state.telefono,
        })
        .then(() => {
          this.componentDidMount();
        });
    } else {
      // Actualizar Registros en la BD
      axios
        .put(`https://polar-mountain-90943.herokuapp.com/api/${id}`, {
          name: this.state.name,
          ubicacion: this.state.ubicacion,
          telefono: this.state.telefono,
        })
        .then(() => {
          this.componentDidMount();
        });
    }
  }
  delete(id) {
    // Borrar Registros en la BD
    axios
      .delete(`https://polar-mountain-90943.herokuapp.com/api/${id}`)
      .then(() => {
        this.componentDidMount();
      });
  }

  edit(id) {
    // Obtengo el id, name, ubicacion, telefono del registro seleccionado
    axios
      .get(`https://polar-mountain-90943.herokuapp.com/api/${id}`)
      .then((res) => {
        this.setState({
          id: res.data._id,
          name: res.data.name,
          ubicacion: res.data.ubicacion,
          telefono: res.data.telefono,
        });
      });
  }

  render() {
    return (
      <>
        <div className="container">
          <h5 className="indigo-text">Administrador de Fiscalías</h5>
          <div className="row">
            <div className="col s6">
              <form
                onSubmit={(e) => this.submit(e, this.state.id)}
                autocomplete="off">
                <div className="input-field col s12">
                  <i className="material-icons prefix">assignment_ind</i>
                  <input
                    type="text"
                    id="autocomplete-input"
                    className="autocomplete"
                    value={this.state.name}
                    onChange={(e) => this.namechange(e)}
                  />
                  <label htmlFor="autocomplete-input">Nombre Fiscalía</label>
                </div>
                <div className="input-field col s12">
                  <i className="material-icons prefix">gps_fixed</i>
                  <input
                    type="text"
                    id="autocomplete-input"
                    value={this.state.ubicacion}
                    className="autocomplete"
                    onChange={(e) => this.ubicacionchange(e)}
                  />
                  <label htmlFor="autocomplete-input">Ubicación</label>
                </div>
                <div className="input-field col s12">
                  <i className="material-icons prefix">local_phone</i>
                  <input
                    type="number"
                    id="autocomplete-input"
                    value={this.state.telefono}
                    className="autocomplete"
                    onChange={(e) => this.telefonochange(e)}
                  />
                  <label htmlFor="autocomplete-input">Teléfono</label>
                </div>
                <button
                  className="btn waves-effect waves-light right indigo"
                  type="submit"
                  name="action">
                  Agregar Fiscalía
                  <i className="material-icons right">send</i>
                </button>
              </form>
            </div>
            <div className="col s6">
              <h5 className="indigo-text">Fiscalías Disponibles</h5>
              <table>
                <thead className="indigo-text">
                  <tr>
                    <th>Nombre Fiscalía</th>
                    <th>Ubicación</th>
                    <th>Teléfono</th>
                    <th>Editar</th>
                    <th>Borrar</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.ubicacion}</td>
                      <td>{user.telefono}</td>
                      <td>
                        <button
                          className="btn waves-effect waves-light indigo"
                          type="submit"
                          name="action"
                          onClick={(e) => this.edit(user._id)}>
                          <i className="material-icons">edit</i>
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn waves-effect waves-light indigo"
                          type="submit"
                          name="action"
                          onClick={(e) => this.delete(user._id)}>
                          <i className="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <br />
        <Footer />
      </>
    );
  }
}

export default App;
