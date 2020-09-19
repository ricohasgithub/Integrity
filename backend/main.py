# Watch firebase for realtime updates
import pyrebase
from webscrape import get_test_info

config = {
  "apiKey": "AIzaSyCnhYzqx8xAE3_wZT9nUMu_xUFZdpce1Rg",
  "authDomain": "integrity-ed5a5.firebaseapp.com",
  "databaseURL": "https://integrity-ed5a5.firebaseio.com",
  "storageBucket": "integrity-ed5a5.appspot.com"
}

firebase = pyrebase.initialize_app(config)
firebase_db = firebase.database()

testID = "chemistrytest"

def stream_handler(message):
    #print(message["data"]) # {'title': 'Pyrebase', "body": "etc..."}
    form_url = message["data"]["url"]
    print(form_url)
    form_json = get_test_info(form_url)

# Get the datastream from the realtime database
data_stream = firebase_db.child("rooms").child(testID).stream(stream_handler)
