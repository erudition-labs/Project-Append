#!/bin/bash

protoc -I="./protos/" hello.proto --js_out=import_style=commonjs,binary:./protos --grpc-web_out=import_style=typescript,mode=grpcwebtext:./protos

