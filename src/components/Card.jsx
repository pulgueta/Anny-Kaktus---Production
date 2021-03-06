import { Link } from "react-router-dom";

const Card = (props) => {

  // Este es un componente que hace referencia a la tarjeta de cada producto

  return (
    <div className="h-96 w-80 rounded-xl shadow-md bg-white">
      <img
        src={props.image}
        alt={props.alt}
        className="object-cover w-full h-[182px] rounded-t-xl"
      />
      <div className="py-3 px-6 h-[200px] overflow-hidden flex flex-col justify-between">
        <Link to={`/productos/${props.to}`} className="font-bold text-xl">{props.title}</Link>
        <p className="text-neutral-500 text-sm">{props.description}</p>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl">{props.price}</h1>
          <div className="flex flex-col text-center">
            <Link
              className="bg-flora-second block cursor-pointer py-2 px-3 rounded-md text-flora-white font-semibold transition-colors duration-300 hover:bg-flora-secondhover"
              to={`/productos/${props.to}`}
            >
              Ver más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
