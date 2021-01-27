import React from "react";

class Paginator extends React.Component {
  render() {
    if (this.props.isEmpty) return "";
    else {
      return (
        <div style={{ textAlign: "center" }}>
          <button
            disabled={this.props.isFirstPage}
            className="ui labeled icon button"
            onClick={() => this.props.callbackValueBack()}
          >
            <i className="left arrow icon"></i>
            Atras
          </button>
          <button
            disabled={this.props.isLastPage}
            className="ui right labeled icon button"
            onClick={() => this.props.callbackValueNext()}
          >
            <i className="right arrow icon"></i>
            Adelante
          </button>
        </div>
      );
    }
  }
}
export default Paginator;
