import json
from os import path as osPath

def verifyKeys(keys):
    if len(keys) == 0:
        raise AttributeError('keys expects at least a list with one element inside.')

def keys_exists(element: dict, keyPath: str):
    keys = keyPath.split('.')
    verifyKeys(keys)
    
    _element = element
    for key in keys:
        try:
            _element = _element[key]
        except KeyError:
            return False
    return True

def createField(element: dict, keyPath: str, value):
    keys = keyPath.split('.')
    verifyKeys(keys)

    _element = element
    lastKeyIndex = len(keys) - 1
    for index, key in enumerate(keys):
        try:
            if index == lastKeyIndex:
                _element[key] = value
            else:
                if not keys_exists(_element, key):
                    _element[key] = {}
                    _element = _element[key]
                else:
                    _element = _element[key]
        except KeyError:
            return None

    return element

def cast(value, dataType):
    try:
        if dataType:
            dataType = dataType[0]
            value = dataType(value)
    except Exception:
        pass
    return value

def getValueFromDict(element: dict, keyPath: str, dataType):
    keys = keyPath.split('.')
    verifyKeys(keys)    
    _element = dict(element)
    try:
        for key in keys:
            if isinstance(_element[key], list):
                _element = _element[key][0]
            else:
                _element = _element[key]
    except:
        return None
    return cast(_element, dataType)

def getFieldFromDict(data: dict, fields: list):
    newData = dict()

    for elem in fields:
        (path, name, *dataType) = elem
        value = getValueFromDict(data, path, dataType)
        createField(newData, name, value)

    return newData

def loadData(filePath: str):
    file = open(filePath)
    data = json.load(file)
    file.close()
    return data

def matchArraysItem(list_1: list, list_2: list):
    sourceList = None
    targetList = None
    if len(list_1) > len(list_2):
        sourceList = list_2
        targetList = list_1
    else:
        sourceList = list_1
        targetList = list_2
    for index, sourceItem in enumerate(sourceList):
        id = osPath.basename(sourceItem).split('.')[0]
        for i, targetItem in enumerate(targetList):
            if id in targetItem:
                targetList[i], targetList[index] = targetList[index], targetList[i]
    return (list_1, list_2)

def removeFieldFromDict(element: dict, fieldName: str):
    if not isinstance(element, dict): return None
    try:
        field = element[fieldName]
        del element[fieldName]
        return field
    except:
        return None