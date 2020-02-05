import React from "react";
import { Link } from "react-router-dom";
import Menu from "../parts/Menu";
import HeaderMenu from "../parts/HeaderMenu";

export default class IPNetworks extends React.Component {
  render() {
    return (
      <div>
        <div className="titleRow">
          <HeaderMenu tab={"Sieci IP"} />
        </div>
        <div className="menuBGRow">
          <Menu />
          <this.props.detailComponent />
        </div>
      </div>
    );
  }
}
