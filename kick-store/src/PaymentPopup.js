import { useRef, useContext, useState } from "react";
import { AppContext } from "./contexts/context";
import LoginForm from "./LoginInput";
import './card.css';

const PaymentPopup = ( products, closeModal ) => {
    const { checkout } = useContext(AppContext);
    const modalRef = useRef();

    const [card, setCard] = useState({
        name: "",
        number: "",
        mm: new Date().getMonth(),
        yy: new Date().getFullYear().toString().substring(-2),
        ccv: ""
    })

    const inputs = [
        {id: 0, name: 'name', value: card.name, placeholder: 'Full Name', type: 'text', required: true, label: 'Full name'},
        {id: 1, name: 'number', value: card.number, placeholder: 'Card Number', type: 'decimal', required: true, minLength: 16,
        maxLength: 16, label: 'Card Number', errorMsg: 'Card number must be 16 numbers!'},
        {id: 2, name: 'mm', value: card.mm, type: 'inputBox', required: true, minLength: 1, maxLength: 2},
        {id: 3, name: 'yy', value: card.yy, type: 'inputBox', required: true, minLength: 2, maxLength: 4},
        {id: 4, name: 'ccv', value: card.ccv, placeholder: 'CCV', type: 'decimal', required: true, minLength: 3, maxLength: 3,
        label: 'CCV', errorMsg: 'CCV must be 3 numbers!'}
    ]

    const close = e => {
        if(modalRef.current === e.target) {
            closeModal(false);
        }
    };

    const onChange = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value })
    };
    const submit = (e) => {
        e.preventDefault();
        checkout(card, products);
    };

    return ( 
        <div className="modalBackground" ref={modalRef} onClick={close}>
            <div className='modalContainer'>
                <form className="form-signin" onSubmit={(e)=>submit(e)}>
                        {inputs.map((input) => (
                            <LoginForm
                                key={input.id}
                                {...input}
                                value={card[input.name]}
                                onChange={onChange}
                            />
                        ))}
                    <input type="submit" value="submit" className="submit-btn"/>
                </form>
            </div>
        </div>
     );
}
 
export default PaymentPopup;