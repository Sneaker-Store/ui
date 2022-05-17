import { useContext, useEffect, useState } from "react";
import CartPopup from "./CartPopup";
import { AppContext } from "./contexts/context";

const Home = () => {

    const { prods, products, cart } = useContext(AppContext);
    const [ selectedProd, setSelectedProd ] = useState(null);
    const [ showModal, setShowModal ] = useState(false);

    useEffect(() => {
        products();
    }, []);

    const openModal = (prod) => {
        setSelectedProd(prod);
        setShowModal(prev => !prev);
        console.log(cart);
    };

    return (
        <>
            { showModal && <CartPopup item={selectedProd} closeModal={setShowModal}/> }
            <div className="content">
                <div className="listing">
                    {prods != null
                        ? prods.map((prod) => (
                            <div onClick={() => openModal(prod)} className="kick-preview" key={prod.product_id}>
                                <h3>{prod.product_name}</h3>
                                <p>brand: {prod.product_brand}</p>
                                <p>{prod.product_price} $</p>
                                <p>{prod.product_stock} unit.</p>
                            </div>
                        )) : <h2>Loading...</h2>
                    }
                </div>
                <div>
                    <button>Add kick</button>
                </div>
            </div>
        </>
     );
}

export default Home;