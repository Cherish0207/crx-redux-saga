import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../store/actions";
class Counter extends Component {
  render() {
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={this.props.add}>同步+1</button>
        <button onClick={this.props.asyncAdd}>异步+1</button>
        <button onClick={this.props.stop}>stop</button>
      </div>
    );
  }
}
export default connect((state) => state, actions)(Counter);
