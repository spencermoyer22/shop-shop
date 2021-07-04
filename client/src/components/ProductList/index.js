import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { idbPromise } from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';

function ProductList() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const { loading, data } = useQuery(QUERY_PRODUCTS);


  useEffect(() => {
    if (data) {
      // stores in global state object
      dispatch({
        type: 'updateProducts',
        products: data.products
      });

      // saves to indexedDb
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } // check if 'loading' is undefined in useQuery()
    else if (!loading) {
      // get data from 'products' store
      idbPromise('products', 'get').then((products) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: 'updateProducts',
          products: products
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!state.currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === state.currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
