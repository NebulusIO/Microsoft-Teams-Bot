#!/bin/bash
gulp serve &
rasa run -m rasa_bot/models/20200705-202240.tar.gz --enable-api --cors "*" --debug &

