import { useContext } from 'react';
import { AppContext } from './contexts/context';

const Cart = () => {

    const { cart } = useContext(AppContext);

    return (
        <div></div>
    );
}

export default Cart;