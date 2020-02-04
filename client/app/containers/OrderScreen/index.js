/**
 *
 * OrderScreen
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
import Divider from '@material-ui/core/Divider';
import OrderCard from 'components/OrderCard';
import JapaneseItemIcon from 'components/JapaneseItemIcon';
import OrdersList from 'containers/OrdersList';
import ContainerWrapper from 'components/ContainerWrapper';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  changeTitle,
  changeSubtitle,
  changeMoreMenu,
} from 'containers/Header/actions';
import { makeSelectTableId } from 'containers/User/selectors';
import OrderNumber from 'components/OrderNumber';
import menuSaga from 'containers/OrdersList/saga';
import { changeOrderQuantity } from 'containers/OrdersList/actions';
import {
  makeSelectRecapOpen,
  makeSelectCurrentItem,
  makeSelectOrdersList,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { toggleRecap, changeCurrentItem, startOrder } from './actions';
import { makeSelectJapPlaceId } from '../OrdersList/selectors';

const CenteredDiv = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex: ${props => props.flex || `1 0 0`};
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

function OrderScreen({
  dispatch,
  recapOpen,
  ordersList,
  currentItem,
  tableId,
  japPlaceId,
}) {
  useInjectReducer({ key: 'orderScreen', reducer });
  useInjectSaga({ key: 'orderScreen', saga });
  useInjectSaga({ key: 'ordersList', saga: menuSaga });

  const { loading, menu } = ordersList;
  const [number, setNumber] = useState(0);
  const [array, setArray] = useState([0, 1, 2, 3, 4]);

  const moreMenu = [
    { name: 'Commandes', onClick: () => dispatch(toggleRecap(true)) },
  ];
  const members = ['Member 1', 'Member 2', 'Member 3', 'Member 4', 'Member 5'];

  useEffect(() => {
    dispatch(changeTitle(tableId));
    dispatch(changeSubtitle(members.join(', ')));
    dispatch(changeMoreMenu(moreMenu));
    dispatch(startOrder(japPlaceId));
    const timeOut = setTimeout(() => disappearOrder(array), 1500);
    return () => clearTimeout(timeOut);
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

  const { items } = menu;
  return (
    <ContainerWrapper>
      <Helmet>
        <title>OrderScreen</title>
        <meta name="description" content="Description of OrderScreen" />
      </Helmet>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <React.Fragment>
          <H1>{items[currentItem.index].name}</H1>
          <CenteredDiv flex="2 1 0">
            {items[currentItem.index + 1] && <OffsetDiv />}
            <CurrentJapaneseItemIcon
              src={items[currentItem.index].icon.thumbnail_url}
            />
            {items[currentItem.index + 1] && (
              <NextJapaneseItemIcon
                size="medium"
                src={items[currentItem.index + 1].icon.thumbnail_url}
                onClick={() => {
                  dispatch(
                    changeCurrentItem((currentItem.index + 1) % items.length)
                  );
                }}
              />
            )}
          </CenteredDiv>

          {/* <OrdersWrapper>
            {array.map(x => (
              <OrderCard key={x} />
            ))}
          </OrdersWrapper> */}
          <CenteredDiv>
            <OrderNumber
              title="Cumulé"
              big
              number={currentItem.accumulated || 0}
            />
            <Divider orientation="vertical" />
            <OrderNumber
              title="Ma commande"
              number={currentItem.individual || 0}
            />
          </CenteredDiv>
          <Numbers
            handleSelect={selectedNumber =>
              dispatch(
                changeOrderQuantity(
                  currentItem.itemId,
                  currentItem.index,
                  selectedNumber,
                  items[currentItem.index].accumulated || 0
                )
              )
            }
          />
        </React.Fragment>
      )}
      <Drawer {...drawerProps} />
    </ContainerWrapper>
  );
}

OrderScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  recapOpen: PropTypes.bool,
  ordersList: PropTypes.object,
  currentItem: PropTypes.object,
  japPlaceId: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  recapOpen: makeSelectRecapOpen(),
  ordersList: makeSelectOrdersList(),
  currentItem: makeSelectCurrentItem(),
  tableId: makeSelectTableId(),
  japPlaceId: makeSelectJapPlaceId(),
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

export default compose(withConnect)(OrderScreen);
