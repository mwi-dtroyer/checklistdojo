import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import LoadingIndicator from "./components/LoadingIndicator";
import ChecklistHistory from "./components/ChecklistHistory";
import Settings from "./components/Settings";
import ChecklistInstance from "./components/ChecklistInstance";
import Templates from "./components/Templates";
import Scheduled from "./components/Scheduled";

class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route
          exact
          path="/"
          component={props => <Home auth={this.props.auth} {...props} />}
        />
        <Route path="/Checklist/:guid" component={ChecklistInstance} />
        <Route path="/history" component={ChecklistHistory} />
        <Route path="/settings" component={Settings} />
        <Route path="/templates" component={Templates} />
        <Route path="/scheduled" component={Scheduled} />
        <Route
          path="/callback"
          render={props => {
            if (/access_token|id_token|error/.test(props.location.hash)) {
              this.props.auth.handleAuthentication();
            }

            return <LoadingIndicator {...props} />;
          }}
        />
      </Layout>
    );
  }
}

export default App;
