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
import makeSelectJapScreen, { makeSelectRecapOpen } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { toggleRecap } from './actions';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const CenteredDiv = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex: ${props => props.flex || `1 1 auto`};
`;

const NumberWrapper = styled.span`
  font-size: 42px;
`;

const OrdersWrapper = styled.div`
  position: fixed;
  right: 0;
`;

function JapScreen({ dispatch, recapOpen }) {
  useInjectReducer({ key: 'japScreen', reducer });
  useInjectSaga({ key: 'japScreen', saga });

  const [number, setNumber] = useState(null);
  const [array, setArray] = useState([0, 1, 2, 3, 4]);

  useEffect(() => {
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
    open: recapOpen,
    component: OrdersList,
  };

  return (
    <Wrapper>
      <Helmet>
        <title>JapScreen</title>
        <meta name="description" content="Description of JapScreen" />
      </Helmet>
      <H1>Commande</H1>
      <CenteredDiv flex="2 1 auto">
        <JapaneseItemIcon />
      </CenteredDiv>
      <OrdersWrapper>
        {array.map(x => (
          <OrderCard />
        ))}
      </OrdersWrapper>
      <CenteredDiv>
        <NumberWrapper>{number}</NumberWrapper>
      </CenteredDiv>
      <Numbers handleSelect={selectedNumber => setNumber(selectedNumber)} />
      <Drawer {...drawerProps} />
    </Wrapper>
  );
}

JapScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  recapOpen: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  japScreen: makeSelectJapScreen(),
  recapOpen: makeSelectRecapOpen(),
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
