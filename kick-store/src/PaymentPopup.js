import { useRef } from "react";
//import { AppContext } from "./contexts/context";
import './card.css';

const PaymentPopup = ( products, closeModal ) => {
    //const { pay } = useContext(AppContext);
    const modalRef = useRef();

    const chip = require('./chip.png');
    const visa = require('./visa.png');

    const close = e => {
        if(modalRef.current === e.target) {
            closeModal(false);
        }
    }

    return ( 
        <div className="modalBackground" ref={modalRef} onClick={close}>
            <div className='modalContainer'>
                <div className="card-container">
                    <div className="front">
                        <div className="image">
                            <img src={ chip } alt=""/>
                            <img src={ visa } alt=""/>
                        </div>
                        <div className="card-number-box">################</div>
                        <div className="flexbox">
                            <div className="box">
                                <span>card holder</span>
                                <div className="card-holder-name">full name</div>
                            </div>
                            <div className="box">
                                <span>expires</span>
                                <div className="expiration">
                                    <span className="exp-month">mm</span>
                                    <span className="exp-year">yy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="back">
                        <div className="stripe"></div>
                        <div className="box">
                            <span>cvv</span>
                            <div className="cvv-box"></div>
                            <img src={ visa } alt="" />
                        </div>
                    </div>
                </div>
                <form action="">
                    <div className="inputBox">
                        <span>card number</span>
                        <input type="text" maxLength="16" className="card-number-input"/>
                    </div>
                    <div className="inputBox">
                        <span>card holder</span>
                        <input type="text" className="card-holder-input"/>
                    </div>
                    <div className="flexbox">
                        {/* <div className="inputBox">
                            <span>expiration mm</span>
                            <select name="" id="" className="month-input" defaultValue={"month"}>
                                <option value="month" selected disabled>month</option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                        <div className="inputBox">
                            <span>expiration yy</span>
                            <select name="" id="" className="year-input" defaultValue={"year"}>
                                <option value="year" selected disabled>year</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                            </select>
                        </div> */}
                        <div className="inputBox">
                            <span>cvv</span>
                            <input type="text" maxLength="3" className="cvv-input"/>
                        </div>
                    </div>
                    <input type="submit" value="submit" className="submit-btn"/>
                </form>
            </div>
        </div>
     );
}
 
export default PaymentPopup;