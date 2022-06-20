import { useState, useContext } from 'react';
import { AppContext } from './contexts/context';
import LoginForm from './LoginInput';


const Register = () => {
    const { register } = useContext(AppContext);

    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        repPassword: "",
        phone: "",
        mail: false,
        sms: false,
    });
    const inputs = [
        {id: 0, name: 'username', value: data.username, placeholder: 'Username', type: 'text', required: true, label: 'Username',
        errorMsg: 'Username must be at least 3 characters'},
        {id: 1, name: 'email', value: data.email, placeholder: 'Email', type: 'email', required: true, label: 'Email',
        errorMsg: 'Email is required and must be valid!'},
        {id: 2, name: 'password', value: data.password, placeholder: 'Password', type: 'password', required: true,
        minLength: 3, maxLength: 20, label: 'Password', errorMsg: 'Password is required and must be 3-20 characters!'},
        {id: 3, name: 'repPassword', value: data.repPassword, placeholder: 'Password', type: 'password', required: true, pattern: data.password,
        label: 'Confirm Password', errorMsg: 'Passwords don\'t match!'},
        {id: 4, name: 'phone', value: data.phone, placeholder: 'Phone', type: 'decimal', required: true, minLength: 9, maxLength: 9,
        label: 'Phone Number', errorMsg: 'Invalid phone number!'}
    ]
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    };
    const handleCheck = (e) => {
        setData({ ...data, [e.target.name]: e.target.checked })
    }
    const submit = (e) => {
        e.preventDefault();
        register(data, data.username, data.email, data.password);
    }
  
    return (
        <div className="login">
            <div className='container'>
            <h2>Register</h2>
                <form className="form-signin" onSubmit={(e)=>submit(e)}>
                    {inputs.map((input) => (
                        <LoginForm
                            key={input.id}
                            {...input}
                            value={data[input.name]}
                            onChange={onChange}
                        />
                    ))}
                    <div>
                        <p>Notifications:</p>
                        <label>
                        <input type="checkbox" name="mail" onChange={(e) => handleCheck(e)} checked={data['mail']}/>
                            Email
                        </label>
                        <label>
                            <input type="checkbox" name="sms" onChange={(e) => handleCheck(e)} checked={data['sms']}/>
                            Phone
                        </label>
                    </div>
                    <button onClick={submit}>Register</button>
                    <a href='/login'>Sign in</a>
                </form>
            </div>
        </div>
    );
}

export default Register;