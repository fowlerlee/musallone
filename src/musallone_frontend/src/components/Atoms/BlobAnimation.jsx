import React from "react";
import { motion } from "framer-motion";

function ColorBlobAnimation() {
  return (
    <motion.div
      style={{
        width: 100,
        height: 100,
        background: "linear-gradient(45deg, yellow, blue)",
        borderRadius: "50%",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    />
  );
}

export default ColorBlobAnimation;
