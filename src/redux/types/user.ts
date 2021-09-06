export enum TUserRole {
  dealer = 'dealer',
  player = 'player',
  observer = 'observer',
}

export interface IUser {
  id: string;
  role: TUserRole;
  firstName: string;
  lastName?: string;
  jobPosition?: string;
  image?: string;
}

export class User implements IUser {
  id = '';
  role = TUserRole.observer;
  firstName = '';
  lastName?: string;
  jobPosition?: string;
  image?: string;

  constructor(userParameters?: Partial<IUser>) {
    Object.assign(this, userParameters);
  }

  toObject(): IUser {
    return {
      id: this.id,
      role: this.role,
      firstName: this.firstName,
      lastName: this.lastName,
      jobPosition: this.jobPosition,
      image: this.image,
    };
  }
}
