import React, { useState } from 'react'
import { useEffect } from 'react'
function Painel() {
    const [products, setProducts] = useState([])
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState('')
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [editingId, setEditingId] = useState(null)

    useEffect(() => {
        fetch('http://localhost:5259/api/produtos'),{
            headers: {
                'Authorization':`Bearer ${token}`
            }
        }
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])

    return ( <div><h1>Painel Admin</h1></div>)
}
export default Painel