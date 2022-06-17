import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';

import App from './App';
import Login from './Login';
import Register from './Register';

import { AppProvider, AppContext } from './contexts/context';

const AppRoutes = () => {
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AppContext);
        if(loading){
            return <div className='loading'>Loading...</div>
        }
        if(!authenticated) {
            return <Navigate to="/login"/>
        }

        return children;
    };

    return (
        <Router>
            <AppProvider>
                <Routes>
                    <Route exact path='*' element={<Private><App/></Private>}/>
                    <Route exact path='/login' element={<Login/>}/>
                    <Route exact path='/register' element={<Register/>}/>
                </Routes>
            </AppProvider>
        </Router>
    );
}

export default AppRoutes