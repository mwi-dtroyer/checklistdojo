import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import ChecklistHistory from "./components/ChecklistHistory";
import Settings from "./components/Settings";
import ChecklistInstance from "./components/ChecklistInstance";
import Templates from "./components/Templates";
import Scheduled from "./components/Scheduled";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/Checklist/:guid" component={ChecklistInstance} />
        <Route path="/history" component={ChecklistHistory} />
        <Route path="/settings" component={Settings} />
        <Route path="/templates" component={Templates} />
        <Route path="/scheduled" component={Scheduled} />
      </Layout>
    );
  }
}
