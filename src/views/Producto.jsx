import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import { LeftOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { doc, collection, getDoc, addDoc } from "firebase/firestore";

import { db, carrito, getCartContent, updateData, queryDoc } from "../firebase";
import SkeletonCard from "../components/SkeletonCard";

import { useUserContext } from "../context/userContext";
import { formatPrice } from "../functions/formatPrice";

const Producto = () => {
  const { id } = useParams();   // Obteniendo el id del producto

  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useUserContext();

  let object = {
    buyer: localStorage.getItem("userEmail"),
    product: [productInfo],
  };

  const addToUserCart = async () => {
    if (user) {   // Si el usuario está logueado se agrega al carrito y se obtiene su información
      const content = await getCartContent();

      if (content.state) {
        let prodArr = [];

        const dataDoc = await queryDoc("carrito", content.docID);
        const data = dataDoc.data();

        if (data) {
          data.product.forEach((item) => {
            prodArr.push(item);
          });
          prodArr.push(productInfo);
          await updateData("carrito", content.docID, { product: prodArr });
        }
      } else {
        await addDoc(carrito, object);
      }
      toast("¡Producto agregado!", {
        icon: "🛒",
        position: "top-right",
        duration: 1500,
      });
    } else {
      navigate("/sesion");
      toast("¡Debes iniciar sesión!", {
        icon: "🎈",
        position: "top-center",
        duration: 1500,
      });
    }
  };

  const getProduct = async (prodID) => {        // Obteniendo la información del producto individual
    const colRef = collection(db, "productos");
    const docRef = doc(colRef, prodID);
    const snapDoc = await getDoc(docRef);
    const product = snapDoc.data();

    return product;
  };

  useEffect(() => {     // Cada que se carga la página se obtiene la información del producto
    const getInfo = async () => {
      const prod = await getProduct(id);
      setProductInfo(prod);
      setLoading(false);
    };
    getInfo();
  }, [id]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`Producto: ${productInfo?.title}`}</title>
      </Helmet>
      <div className="h-[calc(100vh-80px)] bg-neutral-100">
        <Toaster />
        <div className="p-4 flex flex-col items-start bg-neutral-100 w-[350px] h-auto mx-auto md:justify-center md:content-center md:mx-auto md:w-[640px] md:h-auto md:py-10 lg:flex-row lg:justify-start lg:h-2/3 lg:items-start lg:w-[1366px] lg:p-10">
          <img
            className="w-full object-cover h-[400px] md:h-[540px] lg:w-[580px] lg:h-full rounded-xl"
            src={productInfo?.url}
            alt={productInfo?.title}
          />
          {loading && <SkeletonCard />}

          <div className="lg:flex lg:flex-col w-full lg:justify-between lg:ml-16 lg:h-full">
            <h1 className="text-3xl font-semibold my-4 lg:my-0">
              {productInfo?.title}
            </h1>

            <p className="text-md font-normal text-neutral-600">
              {productInfo?.description}
            </p>
            <p className="font-semibold text-2xl my-4 lg:text-4xl">
              {formatPrice(productInfo?.price)}
            </p>
            {loading || (
              <div className="w-full flex items-center justify-between">
                <button
                  onClick={addToUserCart}
                  className="bg-flora-second hover:bg-flora-secondhover flex items-center w-48 justify-between px-4 transition-all duration-300 text-white text-md font-semibold py-4 w-full rounded-lg"
                >
                  Añadir al carrito <ShoppingCartOutlined className="text-xl" />
                </button>
                <Link to="/productos">
                  <LeftOutlined className="text-xl bg-flora-base py-2 px-3 rounded-md text-white hover:bg-green-600 transition-all duration-300" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Producto;
