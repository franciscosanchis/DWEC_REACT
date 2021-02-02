import React from "react";

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
