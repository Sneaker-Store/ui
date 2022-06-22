import { useContext, useEffect } from 'react';
import { AppContext } from './contexts/context';

const Perfil = () => {

    const { user, getNotify, nots } = useContext(AppContext);

    useEffect(() => {
        getNotify();
    }, []);

    const handleCheck = (type) => {
        console.log(type);
    }

    return (
        <div className='perfil'>
            <h1>Hello, {user['user']['username']}</h1>
            <p>Email: {user['user']['email']}</p>
            <p>Notifications:</p>
            <label>
                <input type="checkbox" onChange={() => handleCheck('email')} checked={nots['email']}/>
                Email
            </label>
            <label>
                <input type="checkbox" onChange={() => handleCheck('sms')} checked={nots['sms']}/>
                Phone
            </label>
        </div>
    );
}

export default Perfil;