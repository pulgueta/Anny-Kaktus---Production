import { useState, useId, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { HelmetProvider, Helmet } from "react-helmet-async";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";

import { validateEmail } from "../functions/validateEmail";
import { auth } from "../firebase";
import { useUserContext } from "../context/userContext";
import { usuarios } from "../firebase";

const Auth = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const id = useId();

  const login = useRef();
  const register = useRef();
  const captcha = useRef(null);

  const redirect = useNavigate();

  const { user, setUser } = useUserContext();

  const handleLogout = (e) => {
    e.preventDefault();
    toast.loading("Cerrando sesión...", {   // Se cierra la sesión del usuario y se eliminan todos los valores del local storage
      duration: 1250,
    });
    signOut(auth);
    localStorage.removeItem("userEmail");
    localStorage.removeItem("user");
    localStorage.removeItem("subTotal");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (data.email === "" || data.password === "") {
      toast("¡Debes llenar todos los campos!", {    // Si no se llenan todos los campos se muestra un toast de error
        type: "error",
        duration: 1000,
      });
    } else if (!validateEmail(data.email)) {
      toast("¡El email no es válido!", {    // Si el email no es válido se muestra un toast de error
        type: "error",
        duration: 1000,
      });
    } else {
      toast.loading("Iniciando sesión...", { // Se inicia la sesión del usuario
        duration: 1000,
      });
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user; // Se obtiene el usuario
          toast.success("¡Bienvenido!");
          localStorage.setItem("userEmail", user.email);
          // redirect("/productos")
          console.log(user);
        })
        .catch((err) => {
          toast.error("¡No se ha encontrado el usuario!", {
            duration: 1500,
          });
        });
      login.current.reset();

      setData({
        email: "",
        password: "",
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (captcha.current.getValue()) {
      console.log("not a robot");   // Si el usuario no es un robot se muestra un toast de éxito
      if (data.email === "" || data.password === "") {
        toast("¡Debes llenar todos los campos!", {  // Si no se llenan todos los campos se muestra un toast de error
          type: "error",
          duration: 1250,
        });
      } else if (!validateEmail(data.email)) {
        toast("¡El email no es válido!", {
          type: "error",    // Si el email no es válido se muestra un toast de error
          duration: 1000,
        });
        captcha.current.reset();
      } else {
        createUserWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {   // Se crea el usuario con los datos proporcionados
            const user = userCredential.user;
            toast.success("¡Usuario creado y sesión iniciada!");
            register.current.reset();
            captcha.current.reset();

            localStorage.setItem("userEmail", user.email);
            setUser(user);

            setData({
              email: "",
              password: "",
            });
          })
          .catch((err) => {
            toast.error("¡Ocurrió un error!");
            register.current.reset();   // Si ocurre un error se muestra un toast de error
            setData({
              email: "",
              password: "",
            });
            captcha.current.reset();
          });

        await addDoc(usuarios, {
          email: data.email,    // Se agrega el usuario a la base de datos y a los usuarios en Authentication - Firebase
        });
      }
    } else {
      toast("¡Debes marcar el captcha!", {    // Si el usuario no marcó el captcha se muestra un toast de error
        type: "error",
        duration: 1250,
      });
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Iniciar Sesión | Registro</title>
        <meta charSet="utf-8" />
      </Helmet>
      <div className="h-[calc(100vh-80px)]">
        <Toaster />
        <div className="flex flex-col lg:flex-row lg:justify-between lg:mx-auto items-center p-10 w-full lg:max-w-7xl lg:items-center">
          <motion.div
            initial={{
              opacity: 0,
              x: -100,
            }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 1.25,
              },
            }}
            className={`${
              !user
                ? "px-4 py-10 bg-white w-80 md:w-[380px] lg:w-[420px] lg:h-[540px] h-full rounded-lg shadow-md mb-16 lg:mb-0"
                : "w-full lg:w-full lg:h-full h-full"
            }`}
          >
            <form
              ref={login}
              onSubmit={handleLogin}
              className="h-full flex flex-col justify-between"
            >
              {/* Si no hay usuario, se muestran los forms para iniciar sesión y registro, caso contrario, se muestra el botón de cerrar sesión */}
              {!user ? (
                <>
                  <h1 className="text-center font-semibold text-3xl">
                    Inicia sesión
                  </h1>

                  <div className="bg-white mt-5 p-3">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      type="email"
                      htmlFor="email"
                      name="email"
                      className="contactinput"
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      id={id + "email"}
                    />

                    <label htmlFor="password">Contraseña</label>
                    <input
                      type="password"
                      htmlFor="password"
                      name="password"
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      className="contactinput"
                      id={id + "email" + Date.now()}
                    />
                  </div>

                  <div className="w-full flex flex-col items-center justify-center px-4">
                    <button
                      type="submit"
                      className="bg-flora-base text-white font-medium p-2 w-full rounded-md transition-all duration-300 hover:bg-green-600"
                    >
                      Inicia Sesión
                    </button>

                    <button
                      onClick={() => redirect("/sesion/recuperar")}
                      className="my-4 text-sm transition-colors duration-300 hover:text-flora-base"
                    >
                      &iquest;Olvidaste tu contraseña?
                    </button>
                  </div>
                </>
              ) : null}
            </form>
            {user ? (
              <div className="flex flex-col items-center justify-center">
                <header className="py-4">
                  <h1 className="text-center text-xl font-medium">
                    ¡Sesión iniciada!
                  </h1>
                </header>
                <button
                  className="bg-flora-second w-36 text-white font-medium px-3 py-2 rounded-md"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </div>
            ) : null}
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 100,
            }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 1.25,
                delay: 0.5,
              },
            }}
            className={`px-4 py-10 bg-white w-80 md:w-[380px] lg:w-[420px] lg:h-[540px] h-full rounded-lg shadow-md ${
              user ? "hidden" : "block"
            }`}
          >
            <form
              ref={register}
              onSubmit={handleRegister}
              className="bg-white h-full flex flex-col justify-between"
            >
              <h1 className="text-center font-semibold text-3xl">Regístrate</h1>

              <div className="bg-white rounded-md mt-4 p-3">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  htmlFor="email-reg"
                  name="email-reg"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="contactinput"
                  id={id + "email-reg"}
                />

                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  htmlFor="password-reg"
                  name="password-reg"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  className="contactinput"
                  id={id + "password-reg" + Date.now()}
                />
              </div>

              <div className="w-full flex items-center justify-center p-2">
                <ReCAPTCHA
                  ref={captcha}
                  sitekey="6Lf_yQggAAAAAMrO6gOezXH5hRTG7rNgOeyBIetd"
                />
              </div>

              <div className="w-full flex items-center justify-center p-4">
                <button
                  type="submit"
                  className="bg-flora-base text-white w-full font-medium py-2 rounded-md transition-all duration-300 hover:bg-green-600"
                >
                  Registrarme
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Auth;
