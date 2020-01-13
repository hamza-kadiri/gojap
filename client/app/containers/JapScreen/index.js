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
import { makeSelectMembers } from 'containers/MembersList/selectors';
import makeSelectJapScreen from './selectors';
import reducer from './reducer';
import saga from './saga';

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
export function JapScreen({ dispatch, members }) {
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
      onClick: () => console.log('add-users'),
    },
    {
      name: 'Commencer la commande',
      onClick: () => history.push('/order/test'),
    },
  ];

  const createdBy = `Créé par vous, ${moment(Date.now()).format('L')}`;
  useEffect(() => {
    dispatch(changeTitle('Jap du jour'));
    dispatch(changeSubtitle(createdBy));
    dispatch(changeMoreMenu(moreMenu));
  }, []);

  const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
  interdum et ante hendrerit venenatis. Aliquam non tellus vel nunc
  egestas rhoncus. Integer dictum nulla consectetur nunc pretium
  suscipit. Cras mi tortor, tincidunt nec dolor vitae, efficitur
  ullamcorper dolor. In sed aliquet mauris. In ut euismod risus, et
  tempor purus. Vestibulum vehicula aliquam sapien non tristique. Nunc
  volutpat ipsum ut justo lobortis tincidunt. Vestibulum a placerat
  diam, eu pretium purus. Duis at vestibulum leo, vitae dignissim
  eros. Phasellus odio nulla, pulvinar eu nulla quis, hendrerit mattis
  est. Curabitur mauris justo, semper sit amet justo et, porta egestas
  nunc. Quisque nec auctor leo. Nulla a fringilla magna. Cras suscipit
  turpis ut risus laoreet ultrices.`;

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
          title={`${members.length} Participants`}
          titleTypographyProps={{
            variant: 'subtitle1',
            color: 'primary',
          }}
        />
        <StyledCardContent>
          <MembersList />
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
};

const mapStateToProps = createStructuredSelector({
  japScreen: makeSelectJapScreen(),
  members: makeSelectMembers(),
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
