import React from "react";
import unsplash from "../api/unsplash";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";
import Paginator from "./Paginator";

/**
 * Establecemos los resultados que queremos por cada página a modo de constante
 */
const resultsPerPage = 9;

/**
 * En el estado metemos todo aquello que pueda cambiar en cada búsqueda. En este caso las imágenes, la página actual dependiendo si
 * hemos avanzado o retrocedido y el total de páginas que arroja la búsqueda. Por otro lado currentTerm no lo almacenamos como estado
 * ya que solo lo necesitamos para mantener el termino búscado entre los cambios de página.
 */
class App extends React.Component {
  state = {
    images: [],
    currentPage: 1,
    totalPages: 1
  };
  currentTerm = "";
  /**
   * En la función de búsqueda pasamos los parámetros que necesitamos en la query. El término, y la página (por defecto page 1).
   * En cada búsqueda solicitamos también el resultsPerPage que establecimos.
   */
  onSearchSubmit = async (term, page = 1) => {
    const resp = await unsplash.get("/search/photos", {
      params: { query: term, page: page, per_page: resultsPerPage }
    });
    /**
     * Una vez hacemos la llamada, asignamos a currentTerm el término que buscamos para mantenerlo por si pasamos de página
     * y hacemos setState para actualizar los datos. Establecemos las imágenes que obtenemos, currentPage pasa a valer lo
     * que valga la page que utilizamos y obtenemos también el totalPages que arroja la búsqueda.
     */
    this.currentTerm = term;
    this.setState({
      images: resp.data.results,
      currentPage: page,
      totalPages: resp.data.total_pages
    });
  };

  /**
   * Creamos la función onNextClicked para que ejecute una nueva búsqueda si hemos pulado el botón next del componente. En la búsqueda
   * empleará el currentTerm que almacenamos y usará currentPage + 1. En el caso de onPreviousClicked hará lo mismo pero una página menos.
   */
  onNextClicked = () => {
    this.onSearchSubmit(this.currentTerm, this.state.currentPage + 1);
  };

  onPreviousClicked = () => {
    this.onSearchSubmit(this.currentTerm, this.state.currentPage - 1);
  };

  /**
   * con este método lo que hacemos será condicionar el renderizado a si la búsqueda arroja algún resultado. Si no es así, no imprimirá nada.
   * En caso de que sí que obtenga resultado, devolveremos el <Paginator>. En los parámetros que le pasamos a <Paginator> será:
   **** enablePrevious -> que comprobará si la página actual es > 1 y entonces activará el botón de volver atrás.
   **** ensableNext -> comprobará si la página actual es < al totalPages arrojada por la búsqueda, si es menor activará el botón avanzar, si no, no.
   **** onPrevious -> pasaremos como parámetro la función onPreviousClicked. En el paginador los botones llevár un evento onClick con onPrevious y onNext
                      que activarán las funciones del elemento padre.
   */
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

  /**
   * En el render principal de APP, devolveremos la barra de búsqueda, las imágenes si las hay y llamaremos a la función this.renderPaginator
   * que mostrará o no el paginador en función de si la busqueda ha arrojado resultados o no.
   */

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
