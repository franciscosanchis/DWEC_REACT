import React from "react";
import unsplash from "../api/unsplash";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";
import Paginator from "./Paginator";

class App extends React.Component {
  state = {
    images: [],
    page: 1,
    currentTerm: "",
    totalPages: 0
  };

  onSearchSubmit = async (term, page) => {
    if (this.state.currentTerm !== term) {
      this.setState({ currentTerm: term, page: 1 });
    }
    //https://unsplash.com/documentation#search-photos
    const resp = await unsplash.get("/search/photos", {
      params: { query: term, page }
    });

    this.setState({
      images: resp.data.results,
      totalPages: resp.data.total_pages
    });
  };

  isEmpty() {
    if (this.state.images.length !== 0) return false;
    else return true;
  }
  isFirstPage() {
    if (this.state.page === 1) return true;
  }
  isLastPage() {
    if (this.state.page === this.state.totalPages) return true;
  }

  getcallbackValueNext = () => {
    let newpage = this.state.page + 1;
    let actualterm = this.state.currentTerm;
    this.setState({ page: this.state.page + 1, term: this.state.currentTerm });
    this.onSearchSubmit(actualterm, newpage);
  };

  getcallbackValueBack = () => {
    let newpage = this.state.page - 1;
    let actualterm = this.state.currentTerm;
    this.setState({ page: this.state.page - 1, term: this.state.currentTerm });
    this.onSearchSubmit(actualterm, newpage);
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageList images={this.state.images} />
        <Paginator
          isEmpty={this.isEmpty()}
          isFirstPage={this.isFirstPage()}
          isLastPage={this.isLastPage()}
          callbackValueNext={() => this.getcallbackValueNext()}
          callbackValueBack={() => this.getcallbackValueBack()}
        />
      </div>
    );
  }
}

export default App;
