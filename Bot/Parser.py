from os import getcwd, getenv, remove as removeFileInLocal, path as osPath
from glob import glob
from utils import getFieldFromDict, loadData, matchArraysItem

COLLECTION_LOCATION = getcwd() + "/collection/"
META_DATA_FIELD = [
    # (path, name)
    ('node.id', 'mediaId', int),
    ('node.video_url', 'videoUrl'),
    ('node.video_duration', 'videoDuration', float),
    ('node.shortcode', 'shortcode'),
    ('node.owner.username', 'owner.username'),
    ('node.owner.profile_pic_url', 'owner.profilePicUrl'),
    ('node.edge_media_to_caption.edges.node.text', 'caption')
]
INSTAGRAM_POST_BASE_URL = getenv("INSTAGRAM_POST_BASE_URL")

class Parser:
    def __init__(self) -> None:
        pass

    def run(self):
        metaDatasPath = glob(COLLECTION_LOCATION + "*.json")
        videosPath = glob(COLLECTION_LOCATION + "*.mp4")
        metaDatasPath, videosPath = matchArraysItem(metaDatasPath, videosPath)
        metaDataList = []

        for index, path in enumerate(metaDatasPath):
            try:
                data = loadData(path)
                parsedData = getFieldFromDict(data, META_DATA_FIELD)
                parsedData['filePath'] = path
                parsedData['videoPath'] = videosPath[index]
                parsedData['videoUrlToInstagram'] = INSTAGRAM_POST_BASE_URL + parsedData["shortcode"]
                metaDataList.append(parsedData)
                removeFileInLocal(path)
            except Exception as error:
                if osPath.isfile(path):
                    removeFileInLocal(path)
                if metaDataList[index]:
                    metaDataList.pop(index)
                print(error)
        return metaDataList