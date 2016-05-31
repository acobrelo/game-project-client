#!/bin/bash

curl "http://localhost:3000/sign-up" \
 --include \
 --request POST \
 --header "Content-Type: application/json" \
 --data "{
   "credentials": {
     "email": "abc",
     "password": "hi",
     "password_confirmation": "hi"
   }
 }"
echo
