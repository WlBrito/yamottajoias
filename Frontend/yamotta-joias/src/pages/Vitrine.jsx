import React from 'react'
import { useEffect, useState } from 'react'  

function Vitrine() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('http://localhost:5259/api/produtos')
            .then(response => response.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    <h3>{product.nome}</h3>
                    <p>R$ {product.preco}</p>
                </div>
            ))}
        </div>
    )
}

export default Vitrine