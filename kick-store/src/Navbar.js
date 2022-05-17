import { useContext } from 'react';
import { AppContext } from './contexts/context';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const { logout } = useContext(AppContext);

    const singOut = () => {
        logout();
    }

    return ( 
        <nav className="navbar">
            <h1>Kick Store</h1>
            <div className="links">
                <Link to="/">Kicks</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/perfil">Perfil</Link>
                <button className="LogoutBtn" onClick={() => {
                    singOut()
                }}>Logout</button>
            </div>
        </nav>
     );
}
 
export default Navbar;