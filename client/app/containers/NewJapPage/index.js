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
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import H1 from 'components/H1';
import StyledButton from 'components/Button';
import { changeMoreMenu, changeTitle } from 'containers/Header/actions';

export function NewJapPage({ dispatch }) {
  const [date, setDate] = React.useState(Date.now());
  const [time, setTime] = React.useState(0);
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();
  const [hasBeenCreated, setHasBeenCreated] = React.useState(false);

  useEffect(() => {
    dispatch(changeTitle('Créer un nouveau Jap'));
    dispatch(changeMoreMenu([]));
  }, []);

  const handleClick = () => {
    // Call back to create jap
    console.log(name, description, time, date);
    setHasBeenCreated(true);
  };

  return !hasBeenCreated ? (
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
        <KeyboardDatePicker
          format="MM/dd/yyyy"
          label="Date"
          margin="normal"
          variant="inline"
          value={date}
          onChange={newdate => setDate(newdate)}
        />
        <KeyboardTimePicker
          label="Horaire"
          variant="inline"
          ampm={false}
          value={time}
          onChange={newtime => setTime(newtime)}
        />
      </MuiPickersUtilsProvider>
      <StyledButton onClick={handleClick}>Créer le jap</StyledButton>
    </ContainerWrapper>
  ) : (
    <ContainerWrapper>
      <H1>Félicitations, tu as crée un jap !</H1>
    </ContainerWrapper>
  );
}

NewJapPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(withConnect)(NewJapPage);
