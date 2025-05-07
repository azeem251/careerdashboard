import { motion } from "framer-motion";

const FaqDeleteModel = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-2">Are you sure?</h2>
        <p className="mb-4 text-gray-600">You won’t be able to revert this!</p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={onConfirm}
          >
            Yes, Delete it!
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FaqDeleteModel;
