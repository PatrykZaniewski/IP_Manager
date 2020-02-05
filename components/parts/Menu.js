import React from "react";
import { Link } from "react-router-dom";
import "../../static/menu.css";

export default class Menu extends React.Component {
  generateTabs(location) {
    var menu = [];
    var tabs;
    if (location === "upper") {
      tabs = [
        { link: "/hosts", value: "Hosty" },
        { link: "/vlans", value: "Sieci VLAN" },
        { link: "/ipnetworks", value: "Sieci IP" },
        { link: "/nats", value: "NAT" },
        { link: "/racks", value: "Szafy serwera" }
      ];
    } else {
      tabs = [
        { link: "/import", value: "Import" },
        { link: "/export", value: "Export" }
      ];
    }

    for (var tab of tabs) {
      menu.push(
        <div key={menu.length} className="">
          <Link to={tab.link}>
            <button className="menuPosition">{tab.value}</button>
          </Link>
        </div>
      );
    }
    return menu;
  }

  render() {
    var tabsUpper = this.generateTabs("upper");
    var tabsLower = this.generateTabs("lower");
    return (
      <div className="menuBox">
        <div className="upperBoxItems">{tabsUpper}</div>
        <div className="lowerBoxItems">{tabsLower}</div>
      </div>
    );
  }
}
