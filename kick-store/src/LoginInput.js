import { useState } from "react";

const LoginForm = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, islogin, errorMsg, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div>
            <label>{label}</label>
            <input
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus= {() => 
                    inputProps.name === "repPassword" && setFocused(true)
                }
                focused={focused.toString()}/>
            <span>{errorMsg}</span>
        </div>
    );
};

export default LoginForm;