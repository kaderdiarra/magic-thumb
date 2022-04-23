from pydoc import doc
import instaloader
import json
from os import getcwd
from glob import glob

USER = "atlas.invictus"
PASSWORD = "jea1ykh.DUR5uxw@htd"
USER_NAME = "atlas.invictus"

# download video
# remove useless data
# save video in db
# remove video from computer

# save post id 

FILE_NAME_PATTERN = "{mediaid}_{owner_id}"
DIR_NAME_PATTERN = "collection"
COLLECTION_LOCATION = getcwd() + "/collection/"
META_DATA_FIELD = [
    # (path, name)
    ('node.video_url', 'video_url'),
    ('node.video_duration', 'video_duration'),
    ('node.shortcode', 'shortcode'),
    ('node.owner.username', 'owner.username'),
    ('node.owner.profile_pic_url', 'owner.profile_pic_url'),

    ('node.iphone_struct.image_versions2.additional_candidates.igtv_first_frame.width', 'width.square'),

    ('node.iphone_struct.image_versions2.additional_candidates.igtv_first_frame.height', 'width.height')
]

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

def getFieldFromDict(data):
    newData = dict()

    for elem in META_DATA_FIELD:
        (path, name) = elem
        value = getValueFromDict(data, path)
        createField(newData, name, value)

    return newData

def loadData(filePath):
    file = open(filePath)
    data = json.load(file)
    file.close()
    return data

class Parser:
    def __init__(self) -> None:
        pass
    def parseMetaData(self):
        metaDatasPath = glob(COLLECTION_LOCATION + "*.json")
        videosPath = glob(COLLECTION_LOCATION + "*.mp4")

        for index, path in enumerate(metaDatasPath):
            data = loadData(path)
            parsedData = getFieldFromDict(data)
            parsedData['file_path'] = path
            parsedData['video_path'] = videosPath[index]
            with open(path, 'w') as outputFile:
                json.dump(parsedData, outputFile)
                outputFile.close()
    def run(self):
        self.parseMetaData()

class Bot:
    def __init__(self):
        self.loader = instaloader.Instaloader(download_pictures=False, download_videos=True, download_video_thumbnails=False, post_metadata_txt_pattern="", compress_json=False, filename_pattern=FILE_NAME_PATTERN)
        self.parser = Parser()

    def runParser(self):
        self.parser.run()

    def run(self):
        self.loader.login(USER, PASSWORD)
        profile = instaloader.Profile.from_username(self.loader.context, USER_NAME)
        collection = profile.get_saved_posts()
        for post in collection:
            # compare (post media id) to (saved post media id)
            if post.is_video:
                # saved media_id to array
                res = self.loader.download_post(post, target=DIR_NAME_PATTERN)
                print(f'post: {post} downloaded: {res}')

def main():
    Bot().runParser()
    # Bot().run()

if __name__ == "__main__":
    main()