# Watch firebase for realtime updates
import pyrebase

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

    print(message["event"]) # put
    print(message["path"]) # /-K7yGTTEp7O549EzTYtI
    print(message["data"]) # {'title': 'Pyrebase', "body": "etc..."}

# Get the datastream from the realtime database
data_stream = firebase_db.child("tests").child(testID).child("post").stream(stream_handler)
