import React from "react";
import { Link } from "react-router-dom";
import Menu from "../parts/Menu";
import HeaderMenu from "../parts/HeaderMenu";
import HostsViewPart from "../parts/HostsViewPart";

export default class Hosts extends React.Component {
  render() {
    return (
      <div>
        <div className="titleRow">
          <HeaderMenu tab={"Hosty"} />
        </div>
        <div className="menuBGRow">
          <Menu />
          <this.props.detailComponent />
        </div>
      </div>
    );
  }
}
