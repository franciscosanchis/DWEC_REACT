import React from "react";

const Paginator = (props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <button class="ui labeled icon button">
        <i class="left arrow icon"></i>
        Atras
      </button>
      <button class="ui right labeled icon button">
        <i class="right arrow icon"></i>
        Adelante
      </button>
    </div>
  );
};

export default Paginator;
