# Watch firebase for realtime updates
from firebase import firebase
import requests
from firebase_admin import db

f = Firebase('https://integrity-ed5a5.firebaseio.com.json')

data = requests.get(f)

