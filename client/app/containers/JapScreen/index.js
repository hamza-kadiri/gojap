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
import { makeSelectJapId } from 'containers/User/selectors';
import { makeSelectJaps } from 'containers/HomePage/selectors';
import makeSelectJapScreen, { makeSelectJap } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getJap } from './actions';

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
export function JapScreen({ dispatch, japId, members, jap }) {
  useInjectReducer({ key: 'japScreen', reducer });
  useInjectSaga({ key: 'japScreen', saga });

  const [isDescriptionClamped, setIsDescriptionClamped] = useState(true);

  const moreMenu = [
    {
      name: 'Modifier le jap',
      onClick: () => console.log('add-users'),
    },
    {
      name: 'Ajouter des participants',
      onClick: () => history.push('/addmembers'),
    },
    {
      name: 'Ajouter une table',
      onClick: () => history.push('/addtable'),
    },
    {
      name: 'Commencer la commande',
      onClick: () => history.push('/order/test'),
    },
  ];

  useEffect(() => {
    dispatch(getJap(japId));
  }, []);

  useEffect(() => {
    if (jap) {
      dispatch(changeTitle(jap.event_name));
      const createdBy = `${
        jap.created_by
          ? `Créé par ${jap.created_by.username}, ${moment(jap.date).format('L')}`
          : ''
      }`;
      dispatch(changeSubtitle(createdBy));
      dispatch(changeMoreMenu(moreMenu));
    }
  }, [jap]);
  const loremIpsum = jap ? jap.description : '';

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
        <StyledCardButton startIcon={<ExitToAppIcon color="error" />}>
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
  jap: makeSelectJap(),
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
