import json

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

def getValueFromDict(element: dict, keyPath: str):
    keys = keyPath.split('.')
    verifyKeys(keys)    
    _element = dict(element)
    try:
        for key in keys:
            _element = _element[key]
    except:
        _element = None
    return _element

def getFieldFromDict(data: dict, fields: list):
    newData = dict()

    for elem in fields:
        (path, name) = elem
        value = getValueFromDict(data, path)
        createField(newData, name, value)

    return newData

def loadData(filePath: str):
    file = open(filePath)
    data = json.load(file)
    file.close()
    return data