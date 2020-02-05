import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  addRack,
  deleteEditRack,
  editRack,
  setEditRackNull
} from "../../actions/rack";
import "../../static/racksAdd.css";
import { editHost } from "../../actions/firebase";

class RackAddPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: false,
      name: "",
      localization: "",
      description: "",
      size: "0",
      id: "",
      formErrorMes: "",
      hosts: []
    };
  }

  handleSubmit = () => {
    if (!this.validateForm()) {
      return;
    }
    const { dispatch } = this.props;
    const { name, description, localization, size } = this.state;
    dispatch(
      addRack({
        name: name,
        description: description,
        localization: localization,
        size: size
      })
    );
  };

  handleEdition = () => {
    if (!this.validateForm()) {
      return;
    }
    const { dispatch } = this.props;
    const { name, description, localization, size, id } = this.state;
    dispatch(
      editRack({
        name: name,
        description: description,
        localization: localization,
        size: size,
        hosts: this.state.hosts,
        id: id
      })
    );
  };

  validateForm() {
    const { name, description, localization, size } = this.state;
    if (name === "" || description === "" || localization === "") {
      this.setState({
        formError: true,
        formErrorMes: "Formularz nie może zawierać pustych miejsc"
      });
      return false;
    }
    if (size === 0) {
      this.setState({
        formError: true,
        formErrorMes: "Rozmiar musi być większy od 0"
      });
    } else {
      this.setState({ formError: false });
      return true;
    }
  }

  deleteEditRackFun() {
    this.props.dispatch(deleteEditRack());
  }

  changeName(e) {
    this.setState({ formError: false, name: e.target.value });
  }

  changeDesc(e) {
    this.setState({ formError: false, description: e.target.value });
  }

  changeLocalization(e) {
    this.setState({ formError: false, localization: e.target.value });
  }

  changeSize(e) {
    var size = e.target.value;
    if (size < 0) {
      size = 0;
    }
    this.setState({ formError: false, size: size });
  }

  componentDidMount() {
    var editRack = this.props.editRack;
    var ifElemEdit = this.props.ifElemEditRack;
    if (ifElemEdit && editHost !== undefined && editRack !== null) {
      this.setState({
        name: editRack.name,
        description: editRack.description,
        localization: editRack.localization,
        size: editRack.size,
        id: editRack.id
      });
      this.props.dispatch(setEditRackNull());
    }
  }

  render() {
    if (this.props.addedRack) {
      if (this.props.backToDetails) {
        return <Redirect to="/racksdetails" />;
      }
      return <Redirect to="/racks" />;
    }
    return (
      <div className="RacksAdd">
        {(this.props.ifElemEditRack && (
          <div className="mainText mainTextRacksAdd">Edytuj szafę</div>
        )) || <div className="mainText mainTextRacksAdd">Dodaj szafę</div>}

        <div className="form formRacksAdd">
          <div className="inputDiv inputDivRacksAdd">
            <label className="formLabel formLabelRacksAdd">Nazwa szafy:</label>
            <input
              className="formInput formInputRacksAdd"
              type="text"
              onChange={e => this.changeName(e)}
              value={this.state.name}
            />
          </div>
          <div className="inputDiv inputDivRacksAdd">
            <label className="formLabel formLabelRacksAdd">Lokalizacja:</label>
            <input
              className="formInput formInputRacksAdd"
              type="text"
              onChange={e => this.changeLocalization(e)}
              value={this.state.localization}
            />
          </div>
          <div className="inputDiv inputDivRacksAdd">
            <label className="formLabel formLabelRacksAdd">Opis:</label>
            <textarea
              className="formInput formInputRacksAdd formInputRacksAddDescription"
              type="text"
              onChange={e => this.changeDesc(e)}
              value={this.state.description}
            />
          </div>
          <div className="inputDiv inputDivRacksAdd">
            <label className="formLabel formLabelRacksAdd">Rozmiar:</label>
            <input
              className="formInput formInputRacksAdd"
              type="number"
              onChange={e => this.changeSize(e)}
              value={this.state.size}
            />
          </div>
          {this.state.formError && (
            <center>
              <p className="errorTextRacksAdd">{this.state.formErrorMes}</p>
            </center>
          )}
          <div className="buttonRowRacksAdd">
            {(this.props.backToDetails && (
              <Link
                onClick={() => this.deleteEditRackFun()}
                className="secondaryButtonLinkRacksAdd"
                to="/racksdetails"
              >
                <button className="secondaryButton secondaryButtonRacksAdd">
                  Cofnij
                </button>
              </Link>
            )) || (
              <Link
                onClick={() => this.deleteEditRackFun()}
                className="secondaryButtonLinkRacksAdd"
                to="/racks"
              >
                <button className="secondaryButton secondaryButtonRacksAdd">
                  Cofnij
                </button>
              </Link>
            )}
            {(this.props.ifElemEditRack && (
              <button
                onClick={this.handleEdition}
                className="primaryButton primaryButtonRacksAdd"
              >
                Edytuj
              </button>
            )) || (
              <button
                onClick={this.handleSubmit}
                className="primaryButton primaryButtonRacksAdd"
              >
                Dodaj
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ rackReducer }) => ({
  isAddingRacks: rackReducer.isAddingRacks,
  addingRackFailure: rackReducer.addingRackFailure,
  addedRack: rackReducer.addedRack,
  ifElemEditRack: rackReducer.ifEditElemRack,
  editRack: rackReducer.editRack,
  backToDetails: rackReducer.backToDetails
});
export default connect(mapStateToProps)(RackAddPart);
