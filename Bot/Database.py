from functools import singledispatch
from wsgiref.validate import validator
from pymongo import MongoClient
import pymongo
from glob import glob
from os import getcwd, getenv
from utils import loadData
from collections import OrderedDict
from dotenv import load_dotenv

load_dotenv()

CONNECTION_STRING = getenv("CONNECTION_STRING")
DATABASE_NAME = getenv("DATABASE_NAME")
MODEL_LOCATION = getcwd() + "/schema/"
COLLECTIONS_NAMES = ["metadatas"]

class Database:
    def __init__(self) -> None:
        self.client = MongoClient(CONNECTION_STRING)
        self.db = None
        #postIds = []
        pass

    def createCollection(self, db):
        existingCollections = db.list_collection_names()
        for name in COLLECTIONS_NAMES:
            if name not in existingCollections:
                db.create_collection(name)
                
    
    def getDatabase(self):
        db = self.client[DATABASE_NAME]
        self.createCollection(db)
        self.updateValidationSchemas(db)
        self.db = db
        return db

    def updateValidationSchemas(self, db):
        modelsPath = glob(MODEL_LOCATION + "*.json")
        for path in modelsPath:
            schemaJson = loadData(path)
            schema = OrderedDict(schemaJson)
            db.command(schema)

    def getExistingMetaDataIds(self) -> list :
        data = list(self.db.metadatas.find({}, {"mediaId": 1, "_id": 0}))
        mediaIds = []
        for item in data:
            mediaIds.append(item["mediaId"])
        return mediaIds

    def storeMetaDataInDb(self, element):
        if element:
            self.db.metadatas.insert_many(element)