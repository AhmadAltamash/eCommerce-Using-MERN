import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductList from '../utils/ProductList'
import './product.css'



function Products() {

  const state = useContext(GlobalState)
  const [products] = state.ProductAPI.products
  console.log(state)
  return (
    <div className='product'>
  {products.length > 0 ? (
    products.map((product, index) => {
      return <ProductList key={product.id || product._id || index} product={product} />;
    })
  ) : (
    <p>Loading products...</p>
  )}
</div>

  )
}

export default Products