import { useState, useContext } from 'react';
import { AppContext } from './contexts/context';
import LoginForm from './LoginInput';

const Login = () => {
    const { login } = useContext(AppContext);

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const inputs = [
        {id: 1, name: 'email', value: data.email, placeholder: 'Email', type: 'email', required: true, label: 'Email',
        errorMsg: 'Email is required and must be valid!'},
        {id: 2, name: 'password', value: data.password, placeholder: 'Password', type: 'password', required: true,
        minLength: 3, maxLength: 20, label: 'Password', errorMsg: 'Password is required and must be 3-20 characters!'}
    ]
    
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    };
    const submit = (e) => {
        e.preventDefault();
        login(data.email, data.password);
    }
  
    return (
        <div className="login">
            <div className='container'>
            <h2>Sign In</h2>
                <form className="form-signin" onSubmit={(e)=>submit(e)}>
                    {inputs.map((input) => (
                        <LoginForm
                            key={input.id}
                            {...input}
                            value={data[input.name]}
                            onChange={onChange}
                        />
                    ))}
                    <button type='submit' onClick={submit}>Login</button>
                    <a href='/register'>Create an account</a>
                </form>
            </div>
        </div>
    );
}

export default Login;
