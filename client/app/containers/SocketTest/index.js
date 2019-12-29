/**
 *
 * SocketTest
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ContainerWrapper from 'components/ContainerWrapper';
import makeSelectSocketTest from './selectors';
import reducer from './reducer';
import saga from './saga';
import socketClient from '../../socket/socket';
import { MESSAGES } from '../../socket/constants';

export function SocketTest() {
  const [pseudo, setPseudo] = useState('');
  const [currentJap, setCurrentJap] = useState(null);
  const [currentJapMembers, setCurrentJapMembers] = useState([]);
  const [currentJapTables, setCurrentJapTables] = useState({});
  const [currentTable, setCurrentTable] = useState(null);
  const [isCommandStarted, setIsCommandStarted] = useState(false);

  useInjectReducer({ key: 'socketTest', reducer });
  useInjectSaga({ key: 'socketTest', saga });

  const handlePseudoChange = e => {
    setPseudo(e.target.value);
  };

  useEffect(() => {
    const handleUserJoinedJap = message => {
      console.log('user JOINED JAP');
      console.log(message);
      setCurrentJap(message.jap_id);
      setCurrentJapMembers(message.jap_members);
      setCurrentJapTables(message.jap_tables);
    };

    socketClient.subscribeToEvent(
      MESSAGES.USER_JOINED_JAP,
      handleUserJoinedJap,
      'Socket Test'
    );
    return () => {
      socketClient.unsubscribeToEvent(
        MESSAGES.USER_JOINED_JAP,
        handleUserJoinedJap,
        'Socket Test'
      );
    };
  });

  useEffect(() => {
    const handleUserLeft = message => {
      console.log('user LEFT JAP');
      console.log(message);
      if (message.pseudo === pseudo) {
        setCurrentJap(null);
        setCurrentJapMembers(null);
        setCurrentTable(null);
        setCurrentJapTables({});
      } else {
        setCurrentJap(message.jap_id);
        setCurrentJapMembers(message.jap_members);
        if (message.table_id) {
          const tables = currentJapTables;
          tables.table_id = message.jap_tables.table_id;
          setCurrentJapTables(tables);
        }
      }
    };

    socketClient.subscribeToEvent(
      MESSAGES.USER_LEFT_JAP,
      handleUserLeft,
      'Socket Test'
    );
    return () => {
      socketClient.unsubscribeToEvent(
        MESSAGES.USER_LEFT_JAP,
        handleUserLeft,
        'Socket Test'
      );
    };
  });

  useEffect(() => {
    const handleUserJoinedTable = message => {
      console.log('user Joined Table JAP');
      console.log(message);
      if (message.pseudo === pseudo) {
        setCurrentJapTables(message.jap_tables);
        setCurrentTable(message.table_id);
      }
    };

    socketClient.subscribeToEvent(
      MESSAGES.USER_JOINED_TABLE,
      handleUserJoinedTable,
      'Socket Test'
    );
    return () => {
      socketClient.unsubscribeToEvent(
        MESSAGES.USER_JOINED_TABLE,
        handleUserJoinedTable,
        'Socket Test'
      );
    };
  });

  useEffect(() => {
    const handleCommandStarted = message => {
      console.log('Command started');
      console.log(message);
      setIsCommandStarted(true);
      alert(`Command is started by${message.pseudo}`);
    };

    socketClient.subscribeToEvent(
      MESSAGES.COMMAND_STARTED,
      handleCommandStarted,
      'Socket Test'
    );
    return () => {
      socketClient.unsubscribeToEvent(
        MESSAGES.COMMAND_STARTED,
        handleCommandStarted,
        'Socket Test'
      );
    };
  });

  useEffect(() => {
    const handleItemChosen = message => {
      console.log('item chosen');
      console.log(message);
      alert(`${message.pseudo} ordered a ${message.item_id}`);
    };

    socketClient.subscribeToEvent(
      MESSAGES.ITEM_CHOSEN,
      handleItemChosen,
      'Socket Test'
    );
    return () => {
      socketClient.unsubscribeToEvent(
        MESSAGES.ITEM_CHOSEN,
        handleItemChosen,
        'Socket Test'
      );
    };
  });

  useEffect(() => {
    const handleItemChanged = message => {
      console.log('item changed');
      console.log(message);
      alert(`${message.pseudo} changed the item`);
    };

    socketClient.subscribeToEvent(
      MESSAGES.ITEM_CHANGED,
      handleItemChanged,
      'Socket Test'
    );
    return () => {
      socketClient.unsubscribeToEvent(
        MESSAGES.ITEM_CHANGED,
        handleItemChanged,
        'Socket Test'
      );
    };
  });

  useEffect(() => {
    const handleCommandEnded = message => {
      console.log('command ended');
      console.log(message);
      setIsCommandStarted(false);
      alert(`${message.pseudo} ended the command`);
    };

    socketClient.subscribeToEvent(
      MESSAGES.COMMAND_ENDED,
      handleCommandEnded,
      'Socket Test'
    );
    return () => {
      socketClient.unsubscribeToEvent(
        MESSAGES.COMMAND_ENDED,
        handleCommandEnded,
        'Socket Test'
      );
    };
  });

  const handleJoinJap = japID => {
    console.log('handle join jap');
    socketClient.emitMessage(MESSAGES.JOIN_JAP, { pseudo, jap_id: japID });
  };

  const handleLeaveJap = () => {
    console.log('handle leave jap');
    const msg = {
      pseudo,
      jap_id: currentJap,
    };
    if (currentTable) {
      msg.table_id = currentTable;
    }
    console.log(msg);
    socketClient.emitMessage(MESSAGES.LEAVE_JAP, msg);
  };

  const handleJoinTable = tableID => {
    socketClient.emitMessage(MESSAGES.JOIN_TABLE, {
      pseudo,
      jap_id: currentJap,
      table_id: tableID,
    });
  };

  const handleStartCommand = () => {
    if (currentTable) {
      socketClient.emitMessage(MESSAGES.START_COMMAND, {
        pseudo,
        jap_id: currentJap,
        table_id: currentTable,
        is_jap_master: true,
      });
    }
  };

  const handleEndCommand = () => {
    if (currentTable) {
      socketClient.emitMessage(MESSAGES.END_COMMAND, {
        pseudo,
        jap_id: currentJap,
        table_id: currentTable,
        is_jap_master: true,
      });
    }
  };

  const handleNextItem = itemID => {
    if (currentTable) {
      socketClient.emitMessage(MESSAGES.NEXT_ITEM, {
        pseudo,
        jap_id: currentJap,
        table_id: currentTable,
        is_jap_master: true,
        item_id: itemID,
      });
    }
  };

  const handleChooseItem = itemID => {
    if (currentTable) {
      socketClient.emitMessage(MESSAGES.CHOOSE_ITEM, {
        pseudo,
        jap_id: currentJap,
        table_id: currentTable,
        item_id: itemID,
      });
    }
  };

  const tables = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const tableID in currentJapTables) {
    if (tableID) {
      tables.push(
        <div key={tableID}>
          <p>{`${tableID} members are : ${currentJapTables[tableID]}`}</p>
          <button type="button" onClick={() => handleJoinTable(tableID)}>
            {tableID}
          </button>
        </div>
      );
    }
  }

  return (
    <ContainerWrapper>
      <Helmet>
        <title>SocketTest</title>
        <meta name="description" content="Description of SocketTest" />
      </Helmet>
      <h1>Socket test Page</h1>
      <p>Enter your pseudo</p>
      <input
        // placeholder="enter your pseudo"
        value={pseudo}
        onChange={handlePseudoChange}
      />
      <p>{`Current pseudo : ${pseudo}`}</p>
      <button
        disabled={!!currentJap}
        type="button"
        onClick={() => handleJoinJap('oki')}
      >
        Join Oki
      </button>
      <button
        disabled={!!currentJap}
        type="button"
        onClick={() => handleJoinJap('sushi antony')}
      >
        Join Join Sushi Antony
      </button>
      <p>{`Your current jap is ${currentJap}`}</p>
      <p>{`${currentJap} members are : ${currentJapMembers}`}</p>
      <p>{`You are currently in table ${currentTable}`}</p>
      {tables}
      <p />
      <button disabled={!currentJap} type="button" onClick={handleLeaveJap}>
        {`Leave ${currentJap}`}
      </button>
      {currentTable && pseudo && currentJap && (
        <div>
          <button type="button" onClick={handleStartCommand}>
            Start command
          </button>
          <button
            disabled={!isCommandStarted}
            type="button"
            onClick={() => handleChooseItem('pneu')}
          >
            Choose item : pneu
          </button>
          <button
            disabled={!isCommandStarted}
            type="button"
            onClick={() => handleNextItem('pneu')}
          >
            Next item
          </button>
          <button
            disabled={!isCommandStarted}
            type="button"
            onClick={() => handleEndCommand()}
          >
            End order time
          </button>
        </div>
      )}
    </ContainerWrapper>
  );
}

SocketTest.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  socketTest: makeSelectSocketTest(),
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

export default compose(
  withConnect,
  memo
)(SocketTest);
