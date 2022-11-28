import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/*
Animation for Alert playing.
pulsate/jiggle/glow

*/

const dropin = {
  hidden: { y: '-100vh' },
  visible: {
    y: '0',
    opacity: 1,
    transition: { duration: 0.1, type: 'spring', damping: 25, stiffmess: 500 }
  },
  exit: { y: '100vh' }
};
const Modal = ({ handleClose, children }) => {
  return (
    <BackDrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropin}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-amber-600">
        {children}
        <button className="bg-blue-400 mx-auto" onClick={handleClose}>
          Close
        </button>
      </motion.div>
    </BackDrop>
  );
};

const BackDrop = ({ children, onClick }) => {
  return (
    <motion.div
      // overflow-y-auto ?
      className="flex justify-center absolute left-0 top-0 h-full w-full bg-[#000000e1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  );
};

const FramerKata = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);
  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => (modalOpen ? close() : open())}
        className="save-button rounded-lg p-4 m-4 font-extrabold bg-amber-500">
        Launch
      </motion.button>

      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        mode="wait"
        // onExitComplete={null}
      >
        {modalOpen && (
          <Modal modalOpen={modalOpen} handleClose={close}>
            <p>modal content another line more more more</p>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FramerKata;
