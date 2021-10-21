import React, { useRef, useState } from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { appActions } from '../../../../redux/slices/app/app-slice';
import { AppDispatch } from '../../../../redux/store';
import { thunks } from '../../../../redux/thunks/thunks';
import {
  ICreateGameRequestResult,
  TUserRole,
  User,
} from '../../../../redux/types';
import {
  InfoMessage,
  TInfoMessageType,
} from '../../../../redux/types/info-message';
import { IResponse } from '../../../../shared/services/types';
import ImageLoader from '../../connect-to-lobby/components/avatar/image-loader';
import FirstName from '../../connect-to-lobby/components/first-name';
import JobPosition from '../../connect-to-lobby/components/job-position';
import LastName from '../../connect-to-lobby/components/last-name';
import styles from './form-create-game.module.scss';
import HeadingText from './heading-text/heading-text';

interface IFormCreateGameProps {
  onCancelClick: () => void;
}

export type FormData = {
  firstName: string;
  lastName: string;
  jobPosition: string;
  base64: string | undefined;
};

function toBase64String(
  img: HTMLImageElement | null,
  fileName: string
): string | undefined {
  const canvas = document.createElement('canvas');
  let ctx, base64String;

  if (img && fileName !== '') {
    const minSide = Math.min(img.naturalHeight, img.naturalWidth);
    if (img.naturalHeight > minSide) {
      canvas.height = (img.naturalHeight / minSide) * 100;
      canvas.width = 100;
    } else {
      canvas.height = 100;
      canvas.width = (img.naturalWidth / minSide) * 100;
    }
    ctx = canvas.getContext('2d');
    if (ctx) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    base64String = canvas.toDataURL();
  } else {
    base64String = '';
  }
  return base64String;
}

function FormCreateGame({}: IFormCreateGameProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
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
    const connectionResponse = await dispatch(thunks.connectThunk());
    const connectionPayload = connectionResponse.payload as IResponse;
    if (connectionPayload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(
            `Can't connect to server`,
            TInfoMessageType.error
          ).toObject()
        )
      );
      return;
    }
    let base64String: string | undefined;
    if (image.current) {
      base64String = toBase64String(image.current, fileName);
    }
    const currentUser = new User({
      id: '',
      role: TUserRole.dealer,
      firstName: data.firstName,
      lastName: data.lastName,
      jobPosition: data.jobPosition,
      image: base64String,
    });

    const response = await dispatch(
      thunks.createGameThunk({ dealerInfo: currentUser })
    );
    const payload = response.payload as Partial<ICreateGameRequestResult>;
    if (payload.message) {
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(payload.message, TInfoMessageType.error).toObject()
        )
      );
      return;
    }
    const { gameId } = response.payload as ICreateGameRequestResult;
    history.replace(`/lobby/${gameId}`);
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
          <HeadingText text="Create game" />
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
}

export default FormCreateGame;
