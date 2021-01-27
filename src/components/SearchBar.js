import React from "react";

class SearchBar extends React.Component {
  state = { term: "" };

  //Arrow function para que this sea el de la clase. También se puede hacer al definir el callback <form onSubmit={()=>this.onFormSubmit()}>
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.term);
  };

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <label>Búsqueda de imágenes:</label>
            <input
              type="text"
              value={this.state.term}
              onChange={(e) => this.setState({ term: e.target.value })}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
