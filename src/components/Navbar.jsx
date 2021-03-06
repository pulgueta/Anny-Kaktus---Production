import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MenuOutlined,
  CloseOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full h-20 flex px-10 justify-between lg:justify-around md:justify-evenly items-center bg-flora-base text-flora-white">
      <motion.div
        animate={{
          y: [-100, 0],
          opacity: [0, 1],
          transition: {
            duration: 1.25,
          },
        }}
      >
        <Link
          className="text-3xl font-bold"
          to={"/"}
          onClick={isOpen ? handleClick : null}
        >
          Anny Kactus
        </Link>
      </motion.div>

      <ul className="hidden md:flex md:items-center font-medium">
        <motion.li
          initial={{
            opacity: 0,
            y: -100,
          }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 1.5,
            },
          }}
          className="nav-link"
        >
          <Link to={"/"}>Inicio</Link>
        </motion.li>
        <motion.li
          initial={{
            opacity: 0,
            y: -100,
          }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              delay: 0.25,
              duration: 1.5,
            },
          }}
          className="nav-link"
        >
          <Link to={"/productos"}>Catálogo</Link>
        </motion.li>
        <motion.li
          initial={{
            opacity: 0,
            y: -100,
          }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              delay: 0.5,
              duration: 1.5,
            },
          }}
          className="nav-link"
        >
          <Link to={"/contacto"}>Contacto</Link>
        </motion.li>
        <motion.li
          initial={{
            opacity: 0,
            y: -100,
          }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              delay: 0.75,
              duration: 1.5,
            },
          }}
          className="nav-link"
        >
          <Link to={"/carrito"}>
            <ShoppingCartOutlined className="text-2xl" />
          </Link>
        </motion.li>
        <motion.li
          initial={{
            opacity: 0,
            y: -100,
          }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              delay: 1,
              duration: 1.5,
            },
          }}
          className="nav-link no-right"
        >
          <Link to={"/sesion"}>
            <UserOutlined className="text-xl" />
          </Link>
        </motion.li>
      </ul>

      <motion.div
        className="text-xl md:hidden z-10"
        onClick={handleClick}
        animate={{
          y: [-100, 0],
          opacity: [0, 1],
          transition: {
            delay: 0.5,
            duration: 1.25,
          },
        }}
      >
        {isOpen ? (
          <CloseOutlined className="cursor-pointer" />
        ) : (
          <MenuOutlined className="cursor-pointer" />
        )}
      </motion.div>

      <ul
        className={
          !isOpen
            ? "absolute top-[-100%] left-0 w-screen h-[35vh] bg-flora-base flex flex-col justify-center items-center rounded-b-[50px] ease-in duration-700"
            : "absolute top-[75px] left-0 w-screen h-[55vh] z-10 bg-flora-base shadow-sm flex flex-col justify-center rounded-b-[50px] items-center ease-out duration-700"
        }
      >
        <li className="mobile">
          <Link to={"/"} onClick={handleClick}>
            Inicio
          </Link>
        </li>
        <li className="mobile">
          <Link to={"/productos"} onClick={handleClick}>
            Catálogo
          </Link>
        </li>
        <li className="mobile">
          <Link to={"/contacto"} onClick={handleClick}>
            Contacto
          </Link>
        </li>
        <li className="mobile">
          <Link to={"/carrito"} onClick={handleClick}>
            <ShoppingCartOutlined className="text-2xl" />
          </Link>
        </li>
        <li className="mobile">
          <Link to={"/sesion"} onClick={handleClick}>
            <UserOutlined className="text-xl" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
