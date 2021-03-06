/**
 *
 * JapScreen
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  changeTitle,
  changeSubtitle,
  changeMoreMenu,
} from 'containers/Header/actions';
import moment from 'moment';
import history from 'utils/history';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';
import LinesEllipsis from 'react-lines-ellipsis';
import ButtonBase from '@material-ui/core/ButtonBase';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GoJap from 'images/gojap.png';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MembersList from 'containers/MembersList';
import { makeSelectMembers } from 'containers/AddTablePage/selectors';
import {
  makeSelectJapId,
  makeSelectTableId,
  makeSelectIsEmperor,
} from 'containers/User/selectors';
import { changeJapId } from 'containers/User/actions';
import makeSelectJapScreen, {
  makeSelectJap,
  makeSelectTable,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getJap, leaveJap, startCommand } from './actions';

moment.locale('fr');

const CardFluid = styled(Card)`
  width: 100vw;
  margin-bottom: 16px;
`;

const StyledCardHeader = styled(CardHeader)`
  padding: 4px 16px;
  .MuiCardHeader-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const StyledCardContent = styled(CardContent)`
  padding: 4px 16px;
`;

const StyledCardButton = styled(Button)`
  width: 100%;
  padding: 8px;
`;

const StyledCardMedia = styled(CardMedia)`
  width: 90px;
`;
const CardMediaGroup = styled.div`
  display: flex;
`;

const Ellipsis = ({ setIsClamped }) => (
  <React.Fragment>
    {`... `}
    <ButtonBase onClick={() => setIsClamped(false)}>
      <Typography variant="body2" color="primary">
        Voir plus
      </Typography>
    </ButtonBase>
  </React.Fragment>
);
export function JapScreen({ dispatch, table, isEmperor, jap }) {
  useInjectReducer({ key: 'japScreen', reducer });
  useInjectSaga({ key: 'japScreen', saga });

  const [isDescriptionClamped, setIsDescriptionClamped] = useState(true);

  useEffect(() => {
    const japEventId = history.location.pathname.split('/jap/')[1];
    dispatch(getJap(japEventId));
  }, []);

  useEffect(() => {
    if (jap) {
      dispatch(changeTitle(jap.event_name));
      const formattedDate = moment(jap.date).format('L');
      const creatorName = jap.created_by && jap.created_by.username;
      const createdBy = `${
        jap.created_by ? `Créé par ${creatorName}, ${formattedDate}` : ''
      }`;
      const moreMenu = [
        {
          name: 'Ajouter des participants',
          onClick: () => history.push('/addmembers'),
        },
      ];
      if (!table) {
        moreMenu.push({
          name: 'Rejoindre une table',
          onClick: () => history.push('/jointable'),
        });
      }
      if (table && table.status == 0 && isEmperor) {
        moreMenu.push({
          name: 'Commencer la commande',
          onClick: () => dispatch(startCommand()),
        });
      }
      if (table && table.status == 1) {
        moreMenu.push({
          name: 'Rejoindre la commande',
          onClick: () => dispatch(startCommand()),
        });
      }
      dispatch(changeSubtitle(createdBy));
      dispatch(changeMoreMenu(moreMenu));
    }
  }, [jap, table, isEmperor]);
  const loremIpsum = jap ? jap.description : '';
  const onLeaveJap = () => dispatch(leaveJap());

  return (
    <div>
      <Helmet>
        <title>JapScreen</title>
        <meta name="description" content="Description of JapScreen" />
      </Helmet>
      <CardFluid>
        <StyledCardHeader
          title="Description"
          titleTypographyProps={{
            variant: 'subtitle1',
            color: 'primary',
          }}
        />
        <StyledCardContent>
          <Typography variant="body2">
            {isDescriptionClamped ? (
              <LinesEllipsis
                text={loremIpsum}
                maxLine="3"
                ellipsis={<Ellipsis setIsClamped={setIsDescriptionClamped} />}
                trimRight
                component="span"
              />
            ) : (
              <span>{loremIpsum}</span>
            )}
          </Typography>
        </StyledCardContent>
      </CardFluid>
      <CardFluid>
        <StyledCardHeader
          title="Souvenirs"
          titleTypographyProps={{
            variant: 'subtitle1',
            color: 'primary',
          }}
          subheader={
            <FlexWrapper>
              <span>3</span>
              <ChevronRightIcon fontSize="small" />
            </FlexWrapper>
          }
          subheaderTypographyProps={{
            variant: 'body2',
            color: 'primary',
          }}
        />
        <StyledCardContent>
          <CardMediaGroup>
            <StyledCardMedia image={GoJap} component="img" title="Go jap" />
            <StyledCardMedia image={GoJap} component="img" title="Go jap" />
            <StyledCardMedia image={GoJap} component="img" title="Go jap" />
          </CardMediaGroup>
        </StyledCardContent>
      </CardFluid>
      <CardFluid>
        <StyledCardHeader
          title={`${jap && jap.members ? jap.members.length : 0} Participants`}
          titleTypographyProps={{
            variant: 'subtitle1',
            color: 'primary',
          }}
        />
        <StyledCardContent>
          <MembersList members={jap && jap.members} />
        </StyledCardContent>
      </CardFluid>
      <CardFluid>
        <StyledCardButton startIcon={<ExitToAppIcon color="error" />}>
          <Typography variant="subtitle2" component="p" color="error">
            Quitter ma table
          </Typography>
        </StyledCardButton>
      </CardFluid>
      <CardFluid>
        <StyledCardButton
          startIcon={<ExitToAppIcon color="error" />}
          onClick={onLeaveJap}
        >
          <Typography variant="subtitle2" component="p" color="error">
            Quitter le jap
          </Typography>
        </StyledCardButton>
      </CardFluid>
    </div>
  );
}

JapScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  jap: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  japScreen: makeSelectJapScreen(),
  members: makeSelectMembers(),
  japId: makeSelectJapId(),
  tableId: makeSelectTableId(),
  isEmperor: makeSelectIsEmperor(),
  jap: makeSelectJap(),
  table: makeSelectTable(),
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
