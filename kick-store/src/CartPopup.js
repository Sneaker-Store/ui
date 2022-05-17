import { useContext, useRef } from "react";
import { AppContext } from "./contexts/context";

function CartPopup({ item, closeModal }) {

    const { addToCart } = useContext(AppContext);

    const modalRef = useRef();

    const close = e => {
        if(modalRef.current === e.target) {
            closeModal(false);
        }
    }
    
    const add = () => {
        addToCart(item);
        closeModal(false);
    };

    return (
        <div className="modalBackground" ref={modalRef} onClick={close}>
            <div className='modalContainer'>
                <p>Add this item to the cart?</p><br />
                <div className="footer">
                    <button onClick={() => {closeModal(false);}}>Cancel</button>
                    <button onClick={add} id="addToCartBtn">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default CartPopup;