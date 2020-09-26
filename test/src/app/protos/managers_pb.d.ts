import * as jspb from 'google-protobuf'



export class CreateUserRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): CreateUserRequest;

  getPassword(): string;
  setPassword(value: string): CreateUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateUserRequest): CreateUserRequest.AsObject;
  static serializeBinaryToWriter(message: CreateUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateUserRequest;
  static deserializeBinaryFromReader(message: CreateUserRequest, reader: jspb.BinaryReader): CreateUserRequest;
}

export namespace CreateUserRequest {
  export type AsObject = {
    username: string,
    password: string,
  }
}

export class CreateUserResponse extends jspb.Message {
  getOid(): string;
  setOid(value: string): CreateUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateUserResponse): CreateUserResponse.AsObject;
  static serializeBinaryToWriter(message: CreateUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateUserResponse;
  static deserializeBinaryFromReader(message: CreateUserResponse, reader: jspb.BinaryReader): CreateUserResponse;
}

export namespace CreateUserResponse {
  export type AsObject = {
    oid: string,
  }
}

export class UpdateUserRequest extends jspb.Message {
  getOid(): string;
  setOid(value: string): UpdateUserRequest;

  getUsername(): string;
  setUsername(value: string): UpdateUserRequest;

  getPassword(): string;
  setPassword(value: string): UpdateUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateUserRequest): UpdateUserRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateUserRequest;
  static deserializeBinaryFromReader(message: UpdateUserRequest, reader: jspb.BinaryReader): UpdateUserRequest;
}

export namespace UpdateUserRequest {
  export type AsObject = {
    oid: string,
    username: string,
    password: string,
  }
}

export class UpdateUserResponse extends jspb.Message {
  getOid(): string;
  setOid(value: string): UpdateUserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateUserResponse): UpdateUserResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateUserResponse;
  static deserializeBinaryFromReader(message: UpdateUserResponse, reader: jspb.BinaryReader): UpdateUserResponse;
}

export namespace UpdateUserResponse {
  export type AsObject = {
    oid: string,
  }
}

export class ReadUsersRequest extends jspb.Message {
  getReadBy(): string;
  setReadBy(value: string): ReadUsersRequest;

  getIdsList(): Array<string>;
  setIdsList(value: Array<string>): ReadUsersRequest;
  clearIdsList(): ReadUsersRequest;
  addIds(value: string, index?: number): ReadUsersRequest;

  getOffset(): number;
  setOffset(value: number): ReadUsersRequest;

  getNext(): number;
  setNext(value: number): ReadUsersRequest;

  getSort(): boolean;
  setSort(value: boolean): ReadUsersRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReadUsersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ReadUsersRequest): ReadUsersRequest.AsObject;
  static serializeBinaryToWriter(message: ReadUsersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReadUsersRequest;
  static deserializeBinaryFromReader(message: ReadUsersRequest, reader: jspb.BinaryReader): ReadUsersRequest;
}

export namespace ReadUsersRequest {
  export type AsObject = {
    readBy: string,
    idsList: Array<string>,
    offset: number,
    next: number,
    sort: boolean,
  }
}

export class ReadUsersResponse extends jspb.Message {
  getUsersList(): Array<User>;
  setUsersList(value: Array<User>): ReadUsersResponse;
  clearUsersList(): ReadUsersResponse;
  addUsers(value?: User, index?: number): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReadUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ReadUsersResponse): ReadUsersResponse.AsObject;
  static serializeBinaryToWriter(message: ReadUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReadUsersResponse;
  static deserializeBinaryFromReader(message: ReadUsersResponse, reader: jspb.BinaryReader): ReadUsersResponse;
}

export namespace ReadUsersResponse {
  export type AsObject = {
    usersList: Array<User.AsObject>,
  }
}

export class User extends jspb.Message {
  getOid(): string;
  setOid(value: string): User;

  getUsername(): string;
  setUsername(value: string): User;

  getPassword(): string;
  setPassword(value: string): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    oid: string,
    username: string,
    password: string,
  }
}

