import { motion } from "framer-motion";

const Backdrop = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      className="h-full w-full absolute top-0 left-0 bg-black opacity-30 no_transition"
    ></motion.div>
  );
};

export default Backdrop;
