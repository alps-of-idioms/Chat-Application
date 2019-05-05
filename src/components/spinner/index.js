import React from "react";
import "./index.css";

const Spinner = () => {
  return (
    <div className="lds-css ng-scope" style={{ alignSelf: "center" }}>
      <div className="lds-rolling">
        <div />
      </div>
    </div>
  );
};

export default Spinner;
