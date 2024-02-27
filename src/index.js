import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode> 
        <BrowserRouter> {/* Permet de définir de URL pour chaques routes */}
            <AuthProvider> {/* Passe le context authProvider à toute l'application */}
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
  
);


