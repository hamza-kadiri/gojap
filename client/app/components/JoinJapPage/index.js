/**
 *
 * JoinJapPage
 *
 */

import ListWrapper from 'components/ListWrapper';
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import JapListItem from 'components/JapListItem';
import H1 from 'components/H1';

const Wrapper = styled.div`
  width: 100%;
  margin: 30px;
  display: flex;
  flex-direction: column;
`;

function JoinJapPage(loading = false, error = false) {
  const japEvents = [{ name: 'Gros jap' }];

  const japsToJoin = {
    loading,
    error,
    items: japEvents,
    component: JapListItem,
    multiline: true,
  };

  return (
    <Wrapper>
      <H1>Envie de rejoindre un jap ?</H1>
      <ListWrapper {...japsToJoin} />
    </Wrapper>
  );
}

JoinJapPage.propTypes = {};

export default JoinJapPage;
