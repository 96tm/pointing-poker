import React from 'react';
import { useSelector } from 'react-redux';
import { appSelectors } from '../../../redux/selectors';
import InfoMessage from '../info-message/info-message';
import styles from './info-message-list.module.scss';

export default function InfoMessageList(): JSX.Element {
  const messages = useSelector(appSelectors.selectInfoMessages);
  return (
    <ul className={styles.infoMessageList}>
      {messages.map((message) => (
        <li key={message.id}>
          <InfoMessage message={message} />
        </li>
      ))}
    </ul>
  );
}
