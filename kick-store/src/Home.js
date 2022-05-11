import { useState, useContext } from "react";
import { AppContext } from "./contexts/context";

const Home = () => {

    const { prods, products } = useContext(AppContext);
    const getProds = () => {
        products();
        console.log(prods);
    };


    return (
        <div onLoad={getProds} className="Home">
            <div className="kicks">
                <h2>Kicks</h2>
            </div>
            <div className="listing">
                {/* {prods.map((prod) => (
                    <div className="kick-preview" key={prod.id}>
                        <h2>{prod.name}</h2>
                        <p>{prod.description}</p>
                    </div>
                ))} */}
            </div>
            <div className="pageBar">
                <button>1</button>
            </div>
        </div>
     );
}

export default Home;