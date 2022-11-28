import React from 'react';
import { motion } from 'framer-motion';

const Badgenimation = ({ clickHandler, children, title, type = 'Card' }) => {
  return (
    <motion.span
      className="container"
      initial={{ scale: 0 }}
      animate={{ scale: 2 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20
      }}>
      {children}
    </motion.span>
  );
};

export default Badgenimation;
