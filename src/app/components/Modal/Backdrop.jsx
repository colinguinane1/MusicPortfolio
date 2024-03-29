import { motion } from "framer-motion";

const Backdrop = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      className="h-full fixed w-full top-0 left-0 bg-black opacity-40 no_transition"
    ></motion.div>
  );
};

export default Backdrop;
