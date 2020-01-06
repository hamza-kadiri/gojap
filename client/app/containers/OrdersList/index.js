/**
 *
 * OrdersList
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import OrderListItem from 'components/OrderListItem';
import ListWrapper from 'components/ListWrapper';
import styled from 'styled-components';
import makeSelectOrdersList from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadOrders } from './actions';

export function OrdersList({ dispatch, ordersList, onClickItem }) {
  useInjectReducer({ key: 'ordersList', reducer });
  useInjectSaga({ key: 'ordersList', saga });
  const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100vh;
  `;

  useEffect(() => {
    dispatch(loadOrders());
  }, []);

  const ordersListProps = {
    ...ordersList,
    items: ordersList.orders,
    component: OrderListItem,
    multiline: true,
    onClickItem,
  };
  return (
    <Wrapper>
      <ListWrapper {...ordersListProps} />
    </Wrapper>
  );
}

OrdersList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ordersList: PropTypes.object,
  onClickItem: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  ordersList: makeSelectOrdersList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(OrdersList);
