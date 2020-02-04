/**
 *
 * NewJapPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ContainerWrapper from 'components/ContainerWrapper';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { createStructuredSelector } from 'reselect';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import history from 'utils/history';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import H1 from 'components/H1';
import styled from 'styled-components';
import StyledButton from 'components/Button';

import { changeMoreMenu, changeTitle } from 'containers/Header/actions';
import { makeSelectJapPlaces } from './selectors';
import { getJapPlaces, createJapEvent } from './actions';
import reducer from './reducer';
import saga from './saga';

const StyledFormControl = styled(FormControl)`
  margin: 10px 0;
`;

const StyledKeyboardDateTimePicker = styled(KeyboardDateTimePicker)`
  margin: 30px 0 0 0;
`;

export function NewJapPage({ dispatch, japPlaces }) {
  const [date, setDate] = React.useState(Date.now());
  const [name, setName] = React.useState('');
  const [selectedJapPlace, setJapPlace] = React.useState(1);
  const [description, setDescription] = React.useState('');

  useInjectReducer({ key: 'newJapPage', reducer });
  useInjectSaga({ key: 'newJapPage', saga });

  useEffect(() => {
    dispatch(changeTitle('Créer un nouveau Jap'));
    dispatch(changeMoreMenu([]));
    dispatch(getJapPlaces());
  }, []);

  const handleClick = () => {
    // Call back to create jap
    dispatch(createJapEvent(name, description, date, selectedJapPlace));
    history.goBack();
  };

  return (
    <ContainerWrapper>
      <H1>Créer un nouveau Jap</H1>
      <TextField
        label="Nom de l'évènement"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <TextField
        label="Description"
        multiline
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <StyledKeyboardDateTimePicker
          variant="inline"
          ampm={false}
          label="With keyboard"
          value={date}
          onChange={event => setDate(event)}
          disablePast
          format="yyyy/MM/dd HH:mm"
        />
      </MuiPickersUtilsProvider>
      <StyledFormControl>
        <InputLabel id="restaurant">Choisir le Jap</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedJapPlace}
          onChange={event => setJapPlace(event.target.value)}
        >
          {japPlaces &&
            japPlaces.map(japPlace => (
              <MenuItem key={japPlace.id} value={japPlace.id}>
                {japPlace && japPlace.name}
              </MenuItem>
            ))}
        </Select>
      </StyledFormControl>
      <StyledButton onClick={handleClick}>Créer le jap</StyledButton>
    </ContainerWrapper>
  );
}

NewJapPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  japPlaces: PropTypes.array,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  japPlaces: makeSelectJapPlaces(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(NewJapPage);
