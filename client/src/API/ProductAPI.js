import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ProductAPI() {

    const [products, setProducts] = useState([])

    const getProduct = async()=>{
        const res = await axios.get('/api/products')
        setProducts(res.data.products)
    }

    useEffect(()=>{
        getProduct()
    },[])
  return {
    products: [products, setProducts]
  }

}

export default ProductAPI