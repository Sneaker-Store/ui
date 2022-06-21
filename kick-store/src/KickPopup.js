import { useContext, useState, useRef } from 'react'
import { AppContext } from './contexts/context';
import LoginForm from './LoginInput'

export default function KickPopup({ closeModal }) {

    const { addProd, products } = useContext(AppContext);

    const [data, setData] = useState({
        brand: "",
        name: "",
        stock: 0,
        price: 0
    });

    const inputs = [
        {id: 1, name: 'name', value: data.name, placeholder: 'Name', type: 'text', required: true, label: 'Shoe name:',
        errorMsg: 'Shoe must have a name!'},
        {id: 2, name: 'brand', value: data.brand, placeholder: 'Brand', type: 'text', required: true, label: 'Shoe brand:',
        errorMsg: 'Shoe must have a brand!'},
        {id: 3, name: 'price', value: data.price, placeholder: 'Price', type: 'number', step: '0.01', min: '0', required: true,
        label: 'Shoe price:', errorMsg: 'Shoe must have a price!'},
        {id: 4, name: 'stock', value: data.brand, placeholder: 'Quantity', type: 'number', min: '0', required: true, label: 'Shoe quantity:',
        errorMsg: 'Please tell the quantity!'}
    ]

    const modalRef = useRef();

    const close = e => {
        if(modalRef.current === e.target) {
            closeModal(false);
        }
    }
    
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const add = () => {
        console.log(data);
        addProd(data);
        products();
        closeModal(false);
    }

    return (
        <div className="modalBackground" ref={modalRef} onClick={close}>
            <div className='modalContainer'>
                <h1>Create Product</h1>
                <form className="form-signin" onSubmit={(e)=>add(e)}>
                    {inputs.map((input) => (
                        <LoginForm
                            key={input.id}
                            {...input}
                            value={data[input.name]}
                            onChange={onChange}
                        />
                    ))}
                </form>
                <div className="footer">
                    <button onClick={() => {closeModal(false);}}>Cancel</button>
                    <button onClick={add} id="addToCartBtn">Create</button>
                </div>
            </div>
        </div>
    );
}