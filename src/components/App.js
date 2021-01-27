import React from "react";
import unsplash from "../api/unsplash";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";
import Paginator from "./Paginator";

class App extends React.Component {
  state = { images: [], pagAtras: 0 };

  onSearchSubmit = async (term, pag) => {
    //https://unsplash.com/documentation#search-photos
    const resp = await unsplash.get("/search/photos", {
      params: { query: term }
    });

    this.setState({ images: resp.data.results });
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageList images={this.state.images} />
        <Paginator />
      </div>
    );
  }
}

export default App;
