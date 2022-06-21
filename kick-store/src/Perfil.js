import { useContext, useEffect, useState } from 'react';
import { AppContext } from './contexts/context';

const Perfil = () => {

    const { user, getNotify, setNotify } = useContext(AppContext);
    const [not, setNot] = useState({'email': false, 'phone': false});

    useEffect(() => {
        let nots = getNotify();
        setNot({'email': nots['email']==='true' ? true : false, 'phone': nots['phone']==='true' ? true : false});
    }, []);

    const handleCheck = (type) => {
        setNotify();
        console.log(type);
    }

    return (
        <div className='perfil'>
            <h1>Hello, {user['user']['username']}</h1>
            <p>Email: {user['user']['email']}</p>
            <p>Notifications:</p>
            <label>
                <input type="checkbox" onChange={() => handleCheck('email')} checked={not['email']}/>
                Email
            </label>
            <label>
                <input type="checkbox" onChange={() => handleCheck('phone')} checked={not['phone']}/>
                Phone
            </label>
        </div>
    );
}

export default Perfil;