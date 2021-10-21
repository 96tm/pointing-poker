import React, { useRef, useState } from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { appActions } from '../../../../../redux/slices/app/app-slice';
import { AppDispatch } from '../../../../../redux/store';
import { thunks } from '../../../../../redux/thunks/thunks';
import {
  IClientAddPlayerResult,
  TUserRole,
  User,
} from '../../../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../../../redux/types/info-message';
import FirstName from '../first-name';
import HeadingText from '../heading-text';
import ImageLoader from '../avatar/image-loader';
import JobPosition from '../job-position';
import LastName from '../last-name';
import Switcher from '../switcher/switcher';
import styles from '../../connect-to-lobby.module.scss';

interface IFormConnectToLobby {
  gameId: string;
  handleCancelClick: () => void;
}

export type FormData = {
  firstName: string;
  lastName: string;
  jobPosition: string;
  base64: string | undefined;
  isObserver: boolean;
};

function toBase64String(
  img: HTMLImageElement | null,
  fileName: string
): string | undefined {
  const c = document.createElement('canvas');
  let ctx, base64String;
  if (img && fileName !== '') {
    const minSide = Math.min(img.naturalHeight, img.naturalWidth);
    if (img.naturalHeight > minSide) {
      c.height = (img.naturalHeight / minSide) * 100;
      c.width = 100;
    } else {
      c.height = 100;
      c.width = (img.naturalWidth / minSide) * 100;
    }
    ctx = c.getContext('2d');
    if (ctx) ctx.drawImage(img, 0, 0, c.width, c.height);
    base64String = c.toDataURL();
  } else {
    base64String = '';
  }
  return base64String;
}

const FormConnectToLobby = ({
  handleCancelClick,
  gameId,
}: IFormConnectToLobby): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const image = useRef<HTMLImageElement>(null);
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState('');
  const [playerName, setPlayerName] = useState('NN');

  const onConfirmClick = handleSubmit(async (data) => {
    let base64String: string | undefined;
    if (image.current) {
      base64String = toBase64String(image.current, fileName);
    }
    const currentUser = new User({
      id: '',
      role: data.isObserver ? TUserRole.observer : TUserRole.player,
      firstName: data.firstName,
      lastName: data.lastName,
      jobPosition: data.jobPosition,
      image: base64String,
    });
    handleCancelClick();
    const response = await dispatch(
      thunks.addPlayerThunk({ addedPlayer: currentUser, gameId })
    );
    const { message } = response.payload as IClientAddPlayerResult;
    if (message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
  });

  const handleChangeInput = handleSubmit((data) => {
    if (fileName !== '') {
    } else {
      if (data.lastName === '') {
        setPlayerName(
          `${data.firstName.slice(0, 1).toUpperCase()}${data.firstName
            .slice(-1)
            .toUpperCase()}`
        );
      } else if (data.lastName !== '') {
        setPlayerName(
          `${data.firstName.slice(0, 1).toUpperCase()}${data.lastName
            .slice(0, 1)
            .toUpperCase()}`
        );
      }
    }
  });

  return (
    <Form id="textId" className={styles.connect} onSubmit={onConfirmClick}>
      <Container className={styles.container}>
        <Row className={styles.rowTitle}>
          <HeadingText text="Connect to lobby" />
          <Switcher reg={{ ...register('isObserver') }} />
        </Row>
        <FirstName
          handleChangeInput={handleChangeInput}
          reg={{
            ...register('firstName', {
              validate: {
                noName: (value) => value !== '',
                tooShort: (value) => value.length >= 3,
                tooLong: (value) => value.length <= 20,
              },
            }),
          }}
          errors={{ ...errors }}
        />
        <LastName
          handleChangeInput={handleChangeInput}
          reg={{ ...register('lastName') }}
        />
        <JobPosition reg={{ ...register('jobPosition') }} />
        <ImageLoader
          image={image}
          fileName={fileName}
          filePath={filePath}
          playerName={playerName}
          setFileName={setFileName}
          setFilePath={setFilePath}
        />
      </Container>
    </Form>
  );
};

export default FormConnectToLobby;
