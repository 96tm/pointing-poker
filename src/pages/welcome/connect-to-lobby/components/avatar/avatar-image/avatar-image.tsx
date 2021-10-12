import React, { RefObject } from 'react';
import styles from './avatar-image.module.scss';

interface IAvatarProps {
  image: RefObject<HTMLImageElement>;
  filePath: string;
  playerName: string;
}

function Avatar({
  image,
  filePath,
  playerName,
}: React.PropsWithChildren<IAvatarProps>): JSX.Element {
  return (
    <div
      className={styles.avatar}
      style={{
        background: `no-repeat center/cover url(${filePath}) #60DABF`,
      }}
    >
      {filePath === '' && playerName}
      <img
        className={styles.avatarImg}
        ref={image}
        src={filePath}
        alt="Avatar"
      />
    </div>
  );
}

export default Avatar;
