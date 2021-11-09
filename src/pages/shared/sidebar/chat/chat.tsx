import React, { KeyboardEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentUserSelectors,
  gameSelectors,
} from '../../../../redux/selectors';
import { appActions } from '../../../../redux/slices/app/app-slice';
import { AppDispatch } from '../../../../redux/store';
import { postMessageThunk } from '../../../../redux/thunks';
import { IRequestResult, Message } from '../../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../../redux/types/info-message';
import messageIcon from '../../../../shared/assets/icons/send-message.svg';
import PlayerCard from './player-card/player-card';
import styles from './chat.module.scss';

export default function Chat(): JSX.Element {
  const currentUserId = useSelector(currentUserSelectors.selectCurrentUser).id;
  const messages = useSelector(gameSelectors.selectMessages);
  const users = useSelector(gameSelectors.selectPlayers);
  const gameId = useSelector(gameSelectors.selectId);
  const [textarea, setTextarea] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const generateChatItems = () =>
    messages.map((message) => ({
      message: message,
      user: users.find((user) => user.id === message.userId),
    }));

  const handleSubmit = async () => {
    setTextarea((text) => text.trim());
    if (textarea.trim()) {
      const message = new Message({
        message: textarea,
        userId: currentUserId,
      }).toObject();
      const response = await dispatch(
        postMessageThunk({
          message,
          gameId: gameId,
        })
      );
      setTextarea('');
      const payload = response.payload as Partial<IRequestResult>;
      if (payload.message) {
        dispatch(
          appActions.addOneInfoMessage(
            new InfoMessage(payload.message, TInfoMessageType.error).toObject()
          )
        );
        return;
      }
    }
  };

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.shiftKey && event.key === 'Enter' && textarea) {
      await handleSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <>
        {generateChatItems().map((item) => {
          return (
            <div className={styles.cardItem} key={item.message.id}>
              <div className={styles.message}>{item.message.message}</div>
              <div className={styles.author}>
                {item.user ? (
                  <PlayerCard
                    key={item.user.id}
                    user={item.user}
                    customClass={styles.customPlayerCard}
                  />
                ) : (
                  <div className={styles.cardKickUser}>User left</div>
                )}
              </div>
            </div>
          );
        })}
      </>
      <div className={styles.messageForm}>
        <Form>
          <Form.Group className={styles.wrapperMessage}>
            <Form.Control
              as="textarea"
              value={textarea}
              placeholder="write message....."
              className={styles.textarea}
              onChange={(event) => setTextarea(event.target.value)}
              onKeyDown={async (event: KeyboardEvent) => {
                await handleKeyDown(event);
              }}
            />
            {textarea && (
              <img
                src={messageIcon}
                className={styles.iconMessage}
                onClick={handleSubmit}
              ></img>
            )}
          </Form.Group>
          {textarea && (
            <div className={styles.messagePrompt}>
              Press Shift+Enter to post message
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
