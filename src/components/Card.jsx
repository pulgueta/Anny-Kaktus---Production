import React from "react";
import { Link } from "react-router-dom";

import Monitor from "../assets/Render-Monitor-Angle1.jpg";

const Card = (props) => {

  return (
    <div className="h-96 w-80 rounded-xl shadow-md bg-white">
      <div>
        <img
          src={props.src}
          alt="Product"
          className="object-cover rounded-t-xl"
        />
      </div>
      <div className="py-4 px-6 h-[200px] overflow-hidden flex flex-col justify-between">
        <h1 className="font-bold text-xl">{props.title}</h1>
        <p className="text-flora-black text-sm">
          {props.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <h1 className="font-bold text-xl">{props.price}</h1>
          <Link
            className="bg-flora-second py-1 px-4 rounded-md text-flora-white font-semibold transition-colors duration-300 hover:bg-flora-secondhover"
            to={`/productos/${props.to}`}
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
