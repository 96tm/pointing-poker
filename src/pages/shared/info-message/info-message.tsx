import styles from './info-message.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import {
  IInfoMessage,
  TInfoMessageType,
} from '../../../redux/types/info-message';
import { useDispatch } from 'react-redux';
import { appActions } from '../../../redux/slices/app/app-slice';
import { APP_CONSTANTS } from '../../../shared/constants';
import ButtonClose from '../buttons/button-close/button-close';

interface IInfoMessageProps {
  message: IInfoMessage;
  autoClose?: boolean;
}

export default function InfoMessage({
  message,
  autoClose = message.autoClose,
}: IInfoMessageProps): JSX.Element {
  const messageStyle =
    message.type === TInfoMessageType.error
      ? styles.errorMessage
      : styles.message;
  const dispatch = useDispatch();
  const [opacity, setOpacity] = useState(1);
  const messageTimeoutHandle = useRef<NodeJS.Timer | null>(null);
  const messageIntervalHandle = useRef<NodeJS.Timer | null>(null);

  const handleCloseClick = () => {
    dispatch(appActions.removeOneInfoMessage(message.id));
  };

  const reduceOpacity = () => {
    setOpacity(
      (previousOpacity) =>
        previousOpacity - APP_CONSTANTS.OPACITY_REDUCTION_VALUE
    );
  };

  useEffect(() => {
    if (autoClose) {
      messageTimeoutHandle.current = setTimeout(
        handleCloseClick,
        APP_CONSTANTS.INFO_MESSAGE_TIMEOUT
      );
      messageIntervalHandle.current = setInterval(
        reduceOpacity,
        APP_CONSTANTS.INFO_MESSAGE_INTERVAL
      );
    }
    return () => {
      if (messageTimeoutHandle.current) {
        clearTimeout(messageTimeoutHandle.current);
      }
      if (messageIntervalHandle.current) {
        clearInterval(messageIntervalHandle.current);
      }
    };
  }, []);

  return (
    <div className={styles.messageContainer} style={{ opacity }}>
      <div className={messageStyle}>{message.text}</div>
      <div className={styles.buttonCloseContainer}>
        <ButtonClose onClick={handleCloseClick} />
      </div>
    </div>
  );
}
