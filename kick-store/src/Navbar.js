import { useContext } from 'react';
import { AppContext } from './contexts/context';

const Navbar = () => {

    const { logout } = useContext(AppContext);

    const singOut = () => {
        logout();
    }

    return ( 
        <nav className="navbar">
            <h1>Kick Store</h1>
            <div className="links">
                <a href="/">Kicks</a>
                <a href="/cart">Cart</a>
                <a href="/perfil">Perfil</a>
                <button className="LogoutBtn" onClick={() => {
                    singOut()
                }}>Logout</button>
            </div>
        </nav>
     );
}
 
export default Navbar;