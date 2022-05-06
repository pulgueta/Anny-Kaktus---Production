import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const Contacto = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [tel, setTel] = useState();

  const sendEmail = (ev) => {
    ev.preventDefault();
    if (name === "" || surname === "" || email === "" || message === "") {
      toast.error("¡Tienes que rellenar los campos!");
    } else {
      toast.success(`¡Correo enviado a ${email}!`);
      setName("");
      setSurname("");
      setEmail("");
      setMessage("");
      setTel("");
    }
  };

  return (
    <div className="h-screen bg-neutral-100 mx-auto">
      <Toaster />
      <motion.h1
        initial={{
          x: -100,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.25,
        }}
        className="text-center py-5 text-3xl text-flora-black font-semibold"
      >
        Contacto
      </motion.h1>
      <motion.form
        initial={{
          x: -100,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          delay: 0.5,
            duration: 1.25,
        }}
        onSubmit={sendEmail}
        className="bg-white rounded-2xl max-w-xs mx-auto py-5 h-[450px] shadow-lg md:max-w-md"
      >
        <div className="flex flex-col items-center justify-center h-full">
          <input
            type="text"
            placeholder="Nombres"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoComplete="off"
            className="contactinput"
          />
          <input
            type="text"
            placeholder="Apellidos"
            onChange={(e) => setSurname(e.target.value)}
            value={surname}
            autoComplete="off"
            className="contactinput"
          />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="off"
            className="contactinput"
          />
          <input
            type="number"
            placeholder="Teléfono"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            className="contactinput"
          />

          <textarea
            placeholder="Mensaje"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mb-4 py-2 px-4 w-[260px] md:w-[320px] lg:w-[360px] border-2 text-sm border-flora-black/30 rounded-lg placeholder:text-lg outline-flora-base"
          />

          <input
            type="submit"
            value="Enviar"
            className="bg-flora-base px-8 py-3 cursor-pointer rounded-lg text-flora-white my-4 duration-300 transition-all hover:bg-green-600"
          />
        </div>
      </motion.form>
    </div>
  );
};

export default Contacto;