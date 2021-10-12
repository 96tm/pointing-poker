import React, { RefObject } from 'react';
import { Col, Row } from 'react-bootstrap';
import Avatar from './avatar-image/avatar-image';
import InputFile from './file-input/file-input';

interface IInputFileProps {
  fileName: string;
  filePath: string;
  playerName: string;
  image: RefObject<HTMLImageElement>;
  setFileName: (state: string) => void;
  setFilePath: (state: string) => void;
}

function ImageLoader({
  fileName,
  filePath,
  playerName,
  image,
  setFileName,
  setFilePath,
}: React.PropsWithChildren<IInputFileProps>): JSX.Element {
  return (
    <Row>
      <Col lg={7}>
        <InputFile
          fileName={fileName}
          setFileName={setFileName}
          setFilePath={setFilePath}
        />
        <Avatar image={image} filePath={filePath} playerName={playerName} />
      </Col>
      <Col lg={2}></Col>
    </Row>
  );
}

export default ImageLoader;
