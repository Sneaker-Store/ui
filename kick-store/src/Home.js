import { useContext, useEffect, useState } from "react";
import CartPopup from "./CartPopup";
import KickPopup from "./KickPopup";
import { AppContext } from "./contexts/context";

const Home = () => {

    const { prods, products } = useContext(AppContext);
    const [ selectedProd, setSelectedProd ] = useState(null);
    const [ showModal, setShowModal ] = useState(false);
    const [ showModal2, setShowModal2] = useState(false);

    useEffect(() => {
        products();
    }, []);

    const openModal = (prod) => {
        setSelectedProd(prod);
        setShowModal(prev => !prev);
    };

    const openModal2 = () => {
        setShowModal2(prev => !prev);
    }

    return (
        <>
            { showModal && <CartPopup item={selectedProd} closeModal={setShowModal}/> }
            { showModal2 && <KickPopup closeModal={setShowModal2}/> }
            <div className="content">
                <div className="listing">
                    {prods != null
                        ? prods.map((prod) => (
                            <div onClick={() => openModal(prod)} className="kick-preview" key={prod.id}>
                                <h3>{prod.name}</h3>
                                <p>Brand: {prod.brand}</p>
                                <p>{prod.price} $</p>
                                <p>Stock: {prod.stock} unit.</p>
                            </div>
                        )) : <h2>Loading...</h2>
                    }
                </div>
                <div>
                    <button onClick={openModal2}>Add kick</button>
                </div>
            </div>
        </>
     );
}

export default Home;