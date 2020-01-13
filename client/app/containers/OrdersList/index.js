/**
 *
 * OrdersList
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import OrderListItem from 'components/OrderListItem';
import ListWrapper from 'components/ListWrapper';
import Wrapper from 'components/FlexHeightWrapper';
import makeSelectOrdersList from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadOrders } from './actions';

const OrdersList = memo(
  function OrdersList({ dispatch, ordersList, onClickItem }) {
    useInjectReducer({ key: 'ordersList', reducer });
    useInjectSaga({ key: 'ordersList', saga });

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
  },
  (prevProps, nextProps) => prevProps.ordersList === nextProps.ordersList
);

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
