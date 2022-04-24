import json
import numbers
from os import getcwd, remove
from glob import glob
from utils import getFieldFromDict, loadData

COLLECTION_LOCATION = getcwd() + "/collection/"
META_DATA_FIELD = [
    # (path, name)
    ('node.id', 'mediaId', int),
    ('node.video_url', 'videoUrl'),
    ('node.video_duration', 'videoDuration', float),
    ('node.shortcode', 'shortcode'),
    ('node.owner.username', 'owner.username'),
    ('node.owner.profile_pic_url', 'owner.profilePicUrl'),
]

class Parser:
    def __init__(self) -> None:
        pass

    def run(self):
        metaDatasPath = glob(COLLECTION_LOCATION + "*.json")
        videosPath = glob(COLLECTION_LOCATION + "*.mp4")
        metaDataList = []

        for index, path in enumerate(metaDatasPath):
            data = loadData(path)
            parsedData = getFieldFromDict(data, META_DATA_FIELD)
            parsedData['filePath'] = path
            parsedData['videoPath'] = videosPath[index]
            metaDataList.append(parsedData)
            remove(path)
        return metaDataList