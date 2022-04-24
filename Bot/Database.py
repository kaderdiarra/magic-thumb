from functools import singledispatch
from wsgiref.validate import validator
from pymongo import MongoClient
import pymongo
from glob import glob
from os import getcwd
from utils import loadData
from collections import OrderedDict

CONNECTION_STRING = "mongodb://localhost:27017"
DATABASE_NAME = "magic-thumb"
MODEL_LOCATION = getcwd() + "/Schema/"
COLLECTIONS_NAMES = ["metadatas"]

class Database:
    def __init__(self) -> None:
        self.client = MongoClient(CONNECTION_STRING)
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
        return db

    def updateValidationSchemas(self, db):
        modelsPath = glob(MODEL_LOCATION + "*.json")
        for path in modelsPath:
            schemaJson = loadData(path)
            schema = OrderedDict(schemaJson)
            db.command(schema)