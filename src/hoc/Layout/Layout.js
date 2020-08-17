import React, { Component } from "react";
import {connect } from "react-redux"
import Auxiliary from "../Auxiliary/Auxiliary";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  sideDrawerCloser = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Auxiliary>
        <Toolbar 
        isAuth={this.props.isAuthenticated}
        drawerToggle={this.sideDrawerToggleHandler}/>
        <SideDrawer
        isAuth={this.props.isAuthenticated}
          closed={this.sideDrawerCloser}
          open={this.state.showSideDrawer}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}
const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.token !== null
  };
};

export default connect( mapStateToProps )( Layout );