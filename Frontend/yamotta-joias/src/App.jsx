import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Painel from './pages/Painel'
import Vitrine from './pages/Vitrine'
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Vitrine/>} />
                <Route path="/admin" element={<Login/>} />
                <Route path="/painel" element={<Painel/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App