import React from "react";

/**
 * El paginador lo creremos como una función de tipoFlecha y como parámetros recibirá los métodos que le pasamos
 * en el componente padre. Los botones comprobarán si pueden o no activarse dependiendo del dato que reciban desde el padre.
 * Así mismo, llevarán la función onClick que ejecutará la función del elemento Padre que reciben por parámetro.
 */
const Paginator = ({ enablePrevious, enableNext, onPrevious, onNext }) => {
  return (
    <div className="ui buttons page grid">
      <button
        className={`ui labeled icon button ${enablePrevious ? "" : "disabled"}`}
        onClick={onPrevious}
      >
        <i className="left chevron icon"></i>
        Atras
      </button>
      <button
        className={`ui right labeled icon button ${
          enableNext ? "" : "disabled"
        }`}
        onClick={onNext}
      >
        <i className="right chevron icon"></i>
        Adelante
      </button>
    </div>
  );
};
export default Paginator;
