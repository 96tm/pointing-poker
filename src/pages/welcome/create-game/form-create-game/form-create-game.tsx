import React, { useRef, useState } from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { AppDispatch } from '../../../../redux/store';
import { thunks } from '../../../../redux/thunks/thunks';
import {
  ICreateGameRequestResult,
  TUserRole,
  User,
} from '../../../../redux/types';
import FirstName from '../../connect-to-lobby/components/first-name';
import HeadingText from '../../connect-to-lobby/components/heading-text';
import ImageLoader from '../../connect-to-lobby/components/image-loader';
import JobPosition from '../../connect-to-lobby/components/job-position';
import LastName from '../../connect-to-lobby/components/last-name';
import styles from '../../connect-to-lobby/connect-to-lobby.module.scss';
import AsDealer from './as-dealer';

interface IFormCreateGame {
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

const FormCreateGame = ({}: IFormCreateGame): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const image = useRef<HTMLImageElement>(null);
  const [fileName, setFileName] = useState('');
  const [filePath, setFilePath] = useState<string>('');
  const [playerName, setPlayerName] = useState('NN');

  const onConfirmClick = handleSubmit(async (data) => {
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
    // !handle error
    const payload = response.payload as Partial<ICreateGameRequestResult>;
    if (payload.message) {
      throw Error(payload.message);
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
          <HeadingText />
          <AsDealer />
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

export default FormCreateGame;
