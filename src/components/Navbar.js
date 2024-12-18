import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UilStore, UilSearch } from '@iconscout/react-unicons';

function Navbar() {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <motion.div 
        className="nav-brand"
        whileHover={{ scale: 1.1 }}
      >
        <Link to="/search">
          <UilStore /> Buscador de Usuarios
        </Link>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar; 