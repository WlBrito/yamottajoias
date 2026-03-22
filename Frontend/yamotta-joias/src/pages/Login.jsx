import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()
    const handleLogin = async () => {
        const response = await fetch('http://localhost:5259/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, senha })
        })
        const dados = await response.json()
        if (response.ok) {
            localStorage.setItem('token', dados.token)
            navigate('/painel')
        } else {
            alert('Falha no login: ' + dados.message)
        }
    }
    


    return (
        <div><h1>Página de Login</h1>
            <input value={usuario} onChange={(e) => setUsuario(e.target.value)} />
            <input value={senha} onChange={(e) => setSenha(e.target.value)} />
            <button onClick={handleLogin}> Entrar </button>
        </div>
    )
}
export default Login