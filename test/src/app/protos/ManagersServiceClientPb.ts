/**
 * @fileoverview gRPC-Web generated client stub for managers
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as managers_pb from './managers_pb';


export class UserManagerClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoCreateUser = new grpcWeb.AbstractClientBase.MethodInfo(
    managers_pb.CreateUserResponse,
    (request: managers_pb.CreateUserRequest) => {
      return request.serializeBinary();
    },
    managers_pb.CreateUserResponse.deserializeBinary
  );

  createUser(
    request: managers_pb.CreateUserRequest,
    metadata: grpcWeb.Metadata | null): Promise<managers_pb.CreateUserResponse>;

  createUser(
    request: managers_pb.CreateUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: managers_pb.CreateUserResponse) => void): grpcWeb.ClientReadableStream<managers_pb.CreateUserResponse>;

  createUser(
    request: managers_pb.CreateUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: managers_pb.CreateUserResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/managers.UserManager/CreateUser',
        request,
        metadata || {},
        this.methodInfoCreateUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/managers.UserManager/CreateUser',
    request,
    metadata || {},
    this.methodInfoCreateUser);
  }

  methodInfoUpdateUser = new grpcWeb.AbstractClientBase.MethodInfo(
    managers_pb.UpdateUserResponse,
    (request: managers_pb.UpdateUserRequest) => {
      return request.serializeBinary();
    },
    managers_pb.UpdateUserResponse.deserializeBinary
  );

  updateUser(
    request: managers_pb.UpdateUserRequest,
    metadata: grpcWeb.Metadata | null): Promise<managers_pb.UpdateUserResponse>;

  updateUser(
    request: managers_pb.UpdateUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: managers_pb.UpdateUserResponse) => void): grpcWeb.ClientReadableStream<managers_pb.UpdateUserResponse>;

  updateUser(
    request: managers_pb.UpdateUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: managers_pb.UpdateUserResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/managers.UserManager/UpdateUser',
        request,
        metadata || {},
        this.methodInfoUpdateUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/managers.UserManager/UpdateUser',
    request,
    metadata || {},
    this.methodInfoUpdateUser);
  }

  methodInfoReadUsers = new grpcWeb.AbstractClientBase.MethodInfo(
    managers_pb.ReadUsersResponse,
    (request: managers_pb.ReadUsersRequest) => {
      return request.serializeBinary();
    },
    managers_pb.ReadUsersResponse.deserializeBinary
  );

  readUsers(
    request: managers_pb.ReadUsersRequest,
    metadata: grpcWeb.Metadata | null): Promise<managers_pb.ReadUsersResponse>;

  readUsers(
    request: managers_pb.ReadUsersRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: managers_pb.ReadUsersResponse) => void): grpcWeb.ClientReadableStream<managers_pb.ReadUsersResponse>;

  readUsers(
    request: managers_pb.ReadUsersRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: managers_pb.ReadUsersResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/managers.UserManager/ReadUsers',
        request,
        metadata || {},
        this.methodInfoReadUsers,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/managers.UserManager/ReadUsers',
    request,
    metadata || {},
    this.methodInfoReadUsers);
  }

}

