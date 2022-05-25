import { useContext } from 'react';
import { AppContext } from './contexts/context';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const { logout, cart } = useContext(AppContext);

    const singOut = () => {
        logout();
    }

    return ( 
        <nav className="navbar">
            <h1>Kick Store</h1>
            <div className="links">
                <Link to="/">Kicks</Link>
                <Link to="/cart">Cart</Link>
                {/* cart.length > 0 && <p>{cart.reduce((a, c) => a + c.qty, 0)}</p> */}
                <Link to="/perfil">Perfil</Link>
                <button className="LogoutBtn" onClick={() => {
                    singOut()
                }}>Logout</button>
            </div>
        </nav>
     );
}
 
export default Navbar;