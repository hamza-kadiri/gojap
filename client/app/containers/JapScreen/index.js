/**
 *
 * JapScreen
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import H1 from 'components/H1';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Numbers from 'components/Numbers';
import styled from 'styled-components';
import Drawer from 'components/Drawer';
import OrderCard from 'components/OrderCard';
import JapaneseItemIcon from 'components/JapaneseItemIcon';
import OrdersList from 'containers/OrdersList';
import ContainerWrapper from 'components/ContainerWrapper';
import LoadingIndicator from 'components/LoadingIndicator';
import makeSelectJapScreen, {
  makeSelectRecapOpen,
  makeSelectCurrentItem,
} from './selectors';
import { makeSelectOrders } from '../OrdersList/selectors';
import reducer from './reducer';
import saga from './saga';
import ordersReducer from '../OrdersList/reducer';
import ordersSaga from '../OrdersList/saga';
import { toggleRecap, changeCurrentItem, startOrder } from './actions';

const CenteredDiv = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex: ${props => props.flex || `1 0 0`};
`;

const NumberWrapper = styled.span`
  font-size: 42px;
`;

const OrdersWrapper = styled.div`
  position: fixed;
  right: 0;
`;

const OffsetDiv = styled.div`
  flex: 1;
`;

const NextJapaneseItemIcon = styled(JapaneseItemIcon)`
  flex: 1;
`;

const CurrentJapaneseItemIcon = styled(JapaneseItemIcon)`
  border: ${props => `3px solid ${props.theme.palette.primary.main}`};
`;

function JapScreen({ dispatch, recapOpen, orders, currentItem }) {
  useInjectReducer({ key: 'japScreen', reducer });
  useInjectSaga({ key: 'japScreen', saga });
  useInjectReducer({ key: 'ordersList', reducer: ordersReducer });
  useInjectSaga({ key: 'ordersList', saga: ordersSaga });

  const [number, setNumber] = useState(null);
  const [array, setArray] = useState([0, 1, 2, 3, 4]);

  useEffect(() => {
    dispatch(startOrder());
    setTimeout(() => disappearOrder(array), 1500);
  }, []);

  const disappearOrder = arr => {
    const newArray = arr.slice(1);
    setArray(newArray);

    if (newArray.length > 0) {
      setTimeout(() => disappearOrder(newArray), 1500);
    }
  };

  const drawerProps = {
    toggleDrawer: bool => dispatch(toggleRecap(bool)),
    onClickItem: index => dispatch(changeCurrentItem(index)),
    open: recapOpen,
    component: OrdersList,
  };

  return (
    <ContainerWrapper>
      <Helmet>
        <title>JapScreen</title>
        <meta name="description" content="Description of JapScreen" />
      </Helmet>
      {orders.length > 0 ? (
        <React.Fragment>
          <H1>Commande : {orders[currentItem.index].id}</H1>
          <CenteredDiv flex="2 1 0">
            {orders[currentItem.index + 1] && <OffsetDiv />}
            <CurrentJapaneseItemIcon
              src={orders[currentItem.index].urls.regular}
            />
            {orders[currentItem.index + 1] && (
              <NextJapaneseItemIcon
                size="medium"
                src={orders[currentItem.index + 1].urls.regular}
                onClick={() =>
                  dispatch(
                    changeCurrentItem((currentItem.index + 1) % orders.length)
                  )
                }
              />
            )}
          </CenteredDiv>

          <OrdersWrapper>
            {array.map(x => (
              <OrderCard key={x} />
            ))}
          </OrdersWrapper>
          <CenteredDiv>
            <NumberWrapper>{number}</NumberWrapper>
          </CenteredDiv>
          <Numbers handleSelect={selectedNumber => setNumber(selectedNumber)} />
        </React.Fragment>
      ) : (
        <LoadingIndicator />
      )}
      <Drawer {...drawerProps} />
    </ContainerWrapper>
  );
}

JapScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  recapOpen: PropTypes.bool,
  orders: PropTypes.array,
  currentItem: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  japScreen: makeSelectJapScreen(),
  recapOpen: makeSelectRecapOpen(),
  orders: makeSelectOrders(),
  currentItem: makeSelectCurrentItem(),
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

export default compose(withConnect)(JapScreen);
