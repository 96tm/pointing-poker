import React, { SetStateAction, useRef } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { appActions } from '../../../../../../redux/slices/app/app-slice';
import { InfoMessage } from '../../../../../../redux/types/info-message';
import { APP_CONSTANTS } from '../../../../../../shared/constants';
import styles from './file-input.module.scss';

interface IFileInputProps {
  fileName: string;
  setFileName: React.Dispatch<SetStateAction<string>>;
  setFilePath: React.Dispatch<SetStateAction<string>>;
}

function FileInput({
  fileName,
  setFileName,
  setFilePath,
}: React.PropsWithChildren<IFileInputProps>): JSX.Element {
  const dispatch = useDispatch();
  const fileInput = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (fileInput.current?.files?.length) {
      if (
        fileInput.current.files[0].size / 1024 / 1024 <
        APP_CONSTANTS.MAX_AVATAR_SIZE
      ) {
        setFileName(fileInput.current.files[0].name);
        setFilePath(globalThis.URL.createObjectURL(fileInput.current.files[0]));
      } else {
        dispatch(
          appActions.addOneInfoMessage(
            new InfoMessage('Image file size must be at most 10Mb')
          )
        );
      }
    }
  };

  return (
    <>
      <Form.Label htmlFor={styles.picker} className={styles.label}>
        Image:
      </Form.Label>
      <InputGroup className={styles.fieldWrapper}>
        <FormControl
          className={styles.placeholder}
          value={fileName}
          placeholder="Upload image"
          aria-describedby="basic-addon2"
          readOnly={true}
        />
        <input
          ref={fileInput}
          id={styles.picker}
          type="file"
          accept="image/png,image/jpeg"
          className={styles.fileField}
          onChange={handleChange}
        />
        <Form.Label htmlFor={styles.picker} className={styles.picker}>
          Browse
        </Form.Label>
      </InputGroup>
    </>
  );
}

export default FileInput;
