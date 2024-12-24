#!/bin/bash

service nginx reload
service nginx restart

while true; do
    sleep 300
done