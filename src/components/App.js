import React from "react";
import unsplash from "../api/unsplash";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";
import Paginator from "./Paginator";

const resultsPerPage = 9;

class App extends React.Component {
  state = {
    images: [],
    currentPage: 1,
    totalPages: 1
  };
  currentTerm = "";

  onSearchSubmit = async (term, page = 1) => {
    const resp = await unsplash.get("/search/photos", {
      params: { query: term, page: page, per_page: resultsPerPage }
    });
    this.currentTerm = term;
    this.setState({
      images: resp.data.results,
      currentPage: page,
      totalPages: resp.data.total_pages
    });
  };

  onNextClicked = () => {
    this.onSearchSubmit(this.currentTerm, this.state.currentPage + 1);
  };

  onPreviousClicked = () => {
    this.onSearchSubmit(this.currentTerm, this.state.currentPage - 1);
  };

  renderPaginator() {
    if (this.state.images.length === 0) return "";

    return (
      <Paginator
        enablePrevious={this.state.currentPage > 1}
        enableNext={this.state.currentPage < this.state.totalPages}
        onPrevious={this.onPreviousClicked}
        onNext={this.onNextClicked}
        style={{ margin: "10px" }}
      />
    );
  }

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageList images={this.state.images} />
        <br />
        {this.renderPaginator()}
      </div>
    );
  }
}

export default App;
