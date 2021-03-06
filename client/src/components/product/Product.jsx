import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductQA from './Q-A/ProductQA';
import Overview from './overview/Overview';
import { fetchProduct } from '../../redux/actions/productActions';
import { fetchStyles } from '../../redux/actions/stylesActions';
import { fetchAnswers } from '../../redux/actions/answersActions';
import { fetchQuestions } from '../../redux/actions/questionActions';
import { fetchReviews } from '../../redux/actions/reviewActions';
import { fetchReviewsMeta } from '../../redux/actions/ratingActions';

import ProductReviews from './reviews/ProductReviews';

const Product = ({ dispatch }) => {
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchProduct(id));
    dispatch(fetchStyles(id));
    dispatch(fetchQuestions(id));
    dispatch(fetchReviews(2, id));
    dispatch(fetchReviewsMeta(id));
  });
  return (
    <div className="content">
      <section>
        <Overview />
      </section>
      <section>
        <ProductQA />
      </section>
      <section>
        <ProductReviews />
      </section>
    </div>
  );
};

Product.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(null, null)(Product);
