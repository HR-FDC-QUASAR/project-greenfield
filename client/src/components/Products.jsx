import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchProducts } from '../redux/actions/productsActions';

const Products = ({ dispatch, loading, products, hasErrors }) => {
  let { page } = useParams();
  page = page || 1;
  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [dispatch]);

  const renderProducts = () => {
    if (loading) return <p>Loading products...</p>;
    if (hasErrors) return <p>Unable to display products.</p>;
    return products.map((product) => (
      <Link to={`/product/${product.id}`} key={product.id}>
        <div>
          <h3>{product.name}</h3>
          <p>{product.default_price}</p>
        </div>
      </Link>
    ));
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">{renderProducts()}</div>
    </div>
  );
};

Products.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasErrors: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  // key comes from reducers/index.js
  // value comes from reducers/productsReducer.js
  loading: state.products.loading,
  products: state.products.products,
  hasErrors: state.products.hasErrors,
});

export default connect(mapStateToProps)(Products);
