import React, { useRef } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { appActions } from '../../../../../../redux/slices/app/app-slice';
import { InfoMessage } from '../../../../../../redux/types/info-message';
import { APP_CONSTANTS } from '../../../../../../shared/constants';
import styles from './file-input.module.scss';

interface IFileInputProps {
  fileName: string;
  setFileName: (state: string) => void;
  setFilePath: (state: string) => void;
}

function FileInput({
  fileName,
  setFileName,
  setFilePath,
}: React.PropsWithChildren<IFileInputProps>): JSX.Element {
  const dispatch = useDispatch();
  const fileInput = useRef<HTMLInputElement>(null);
  console.log('filename', fileName);

  const handleChange = () => {
    if (fileInput.current?.files?.length) {
      if (
        fileInput.current.files[0].size / 1024 / 1024 <
        APP_CONSTANTS.MAX_AVATAR_SIZE
      ) {
        console.log(fileInput.current.files[0].size / 1024 / 1024);
        setFileName(fileInput.current.files[0].name);
        setFilePath(globalThis.URL.createObjectURL(fileInput.current.files[0]));
        console.log(
          fileInput.current.files[0].name,
          globalThis.URL.createObjectURL(fileInput.current.files[0])
        );
      } else {
        dispatch(
          appActions.addOneInfoMessage(
            new InfoMessage('The file must be at most 10Mb')
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
          // onChange={(e: ChangeEvent<HTMLInputElement>) => {
          //   setFileName(e.target.value);
          // }}
          placeholder="Upload image"
          aria-describedby="basic-addon2"
          readOnly={true}
        />
        <FormControl
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
