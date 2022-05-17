import { useContext, useState } from 'react'
import { AppContext } from './contexts/context';

export default function KickPopup({ closeModal }) {

    const { addProd } = useContext(AppContext);

    const [data, setData] = useState({
        name: "",
        brand: "",
        price: 0,
        quantity: 0
    });

    const inputs = [
        {id: 1, name: 'name', value: data.name, placeholder: 'Shoe name', type: 'text', required: true, label: 'Shoe name',
        errorMsg: 'Shoe must have a name!'},
        {id: 2, name: 'brand', value: data.brand, placeholder: 'Brand', type: 'text', required: true, label: 'Shoe brand',
        errorMsg: 'Shoe must have a brand!'}
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
        login(data.email, data.password);
    }

    return (
        <div className="modalBackground" ref={modalRef} onClick={close}>
            <div className='modalContainer'>
                <h1>Create Product</h1>
                <form className="form-signin" onSubmit={(e)=>submit(e)}>
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