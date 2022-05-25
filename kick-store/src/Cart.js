import { useContext, useState } from 'react';
import { AppContext } from './contexts/context';
import PaymentPopup from './PaymentPopup';

const Cart = () => {

    const { cart, addToCart, removeFromCart, checkout } = useContext(AppContext);
    const [ itemsPrice, setItemsPrice ] = useState(cart.reduce((a, c) => a + c.product_price * c.qty, 0));
    const [ showModal, setShowModal ] = useState(false);

    const setFinalPrice = (item, flag) => {
        if(flag){
            removeFromCart(item);
        } else {
            addToCart(item);
        }
        setItemsPrice(cart.reduce((a, c) => a + c.product_price * c.qty, 0));
    }

    // const openModal = () => {
    //     setShowModal(prev => !prev);
    // };

    const payment = () => {
        checkout({'products': cart, 'ammount': itemsPrice});
    }

    return (
        <div>
            { showModal && <PaymentPopup products={{'products': cart, 'ammount': itemsPrice}} closeModal={setShowModal}/> }
            <div className="content">
                <div className="listing">
                    {cart !== []
                        ? cart.map((item, index) => (
                            <div className="kick-preview" key={index}>
                                <h3>{item.product_name}</h3>
                                <div><p>{item.qty} x {item.product_price.toFixed(2)} $</p></div>
                                <div>
                                    <button onClick={() => setFinalPrice(item, false)}>+</button>
                                    <button onClick={() => setFinalPrice(item, true)}>-</button>
                                </div>
                            </div>
                        )) : <h2>Your cart is empty</h2>
                    }
                </div>
                <div>
                    {cart.length !== 0 && (
                        <>
                            <div>Total price:</div>
                            <div>{itemsPrice.toFixed(2)}$</div>
                        </>
                    )}
                    <button onClick={payment}>Checkout</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;