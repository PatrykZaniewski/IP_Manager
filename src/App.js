import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Main from "../components/views/Main";
import Login from "../components/views/Login";
import Hosts from "../components/views/Hosts";
import IPNetworks from "../components/views/IPNetworks";
import RackAddPart from "../components/parts/RackAddPart";
import RackViewPart from "../components/parts/RackViewPart";
import HostsViewPart from "../components/parts/HostsViewPart";
import HostsAddPart from "../components/parts/HostsAddPart";
import IPNetworkViewPart from "../components/parts/IPNetworkViewPart";
import IPNetworkAddPart from "../components/parts/IPNetworkAddPart";
import VlanViewPart from "../components/parts/VlanViewPart";
import VlanAddPart from "../components/parts/VlanAddPart";
import Vlans from "../components/views/Vlans";
import NatViewPart from "../components/parts/NatViewPart";
import NatAddPart from "../components/parts/NatAddPart";
import Nats from "../components/views/Nats";
import IPNetworksDetails from "../components/views/IPNetworksDetalis";
import IPNetworkDetailsViewPart from "../components/parts/IPNetworkDetailsViewPart";
import HostAddToNetworkPart from "../components/parts/HostAddToNetwork";
import RacksDetails from "../components/views/RacksDetails";
import RackDetailsViewPart from "../components/parts/RackDetailViewPart";
import HostAddToRackPart from "../components/parts/HostAddToRack";
import Rack from "../components/views/Racks";
import FileStream from "../components/views/FileStream";
import Export from "../components/parts/Export";
import Import from "../components/parts/Import";

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

const ProtectedRoute = ({
  component: Component,
  detailComponent,
  isAuthenticated,
  isVerifying,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isVerifying ? (
        <div />
      ) : isAuthenticated ? (
        <Component detailComponent={detailComponent} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={Main}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/hosts"
        component={Hosts}
        detailComponent={HostsViewPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/addhost"
        component={Hosts}
        detailComponent={HostsAddPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/edithost"
        component={Hosts}
        detailComponent={HostsAddPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/ipnetworks"
        component={IPNetworks}
        detailComponent={IPNetworkViewPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/ipnetworksdetails"
        component={IPNetworksDetails}
        detailComponent={IPNetworkDetailsViewPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/addhosttonetwork"
        component={IPNetworksDetails}
        detailComponent={HostAddToNetworkPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/addipnetwork"
        component={IPNetworks}
        detailComponent={IPNetworkAddPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/editipnetwork"
        component={IPNetworks}
        detailComponent={IPNetworkAddPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/vlans"
        component={Vlans}
        detailComponent={VlanViewPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/addvlan"
        component={Vlans}
        detailComponent={VlanAddPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/editvlan"
        component={Vlans}
        detailComponent={VlanAddPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/nats"
        component={Nats}
        detailComponent={NatViewPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/addnat"
        component={Nats}
        detailComponent={NatAddPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/editnat"
        component={Nats}
        detailComponent={NatAddPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/racks"
        component={Rack}
        detailComponent={RackViewPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/racksdetails"
        component={RacksDetails}
        detailComponent={RackDetailsViewPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/addhosttorack"
        component={RacksDetails}
        detailComponent={HostAddToRackPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/addrack"
        component={Rack}
        detailComponent={RackAddPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/editrack"
        component={Rack}
        detailComponent={RackAddPart}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/export"
        component={FileStream}
        detailComponent={Export}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/import"
        component={FileStream}
        detailComponent={Import}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/login" component={Login} />
    </Switch>
  );
}

export default connect(mapStateToProps)(App);
