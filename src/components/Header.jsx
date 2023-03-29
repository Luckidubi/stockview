import React from "react";
import { BsBarChartLine } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate()
  return (
    <div>
      {" "}
      <h1
        className="text-center my-5"
        style={{ cursor: "pointer" }}
        onClick={()=>navigate("/")}
      >
        {" "}

          StockView
          <BsBarChartLine />

      </h1>
    </div>
  );
}

export default Header;
