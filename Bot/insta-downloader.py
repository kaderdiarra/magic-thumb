import instaloader
from dotenv import load_dotenv
from os import getenv, removedirs, getcwd
from Database import Database
from Parser import Parser
from Media import Media

load_dotenv()

PASSWORD = getenv("PASSWORD")
USER_NAME = getenv("USER_NAME")
FILE_NAME_PATTERN = "{mediaid}_{owner_id}"
DIR_NAME_PATTERN = "collection"
COLLECTION_LOCATION = getcwd() + "/collection/"

class Bot:
    def __init__(self):
        self.loader = instaloader.Instaloader(download_pictures=False, download_videos=True, download_video_thumbnails=False, post_metadata_txt_pattern="", compress_json=False, filename_pattern=FILE_NAME_PATTERN)
        self.parser = Parser()
        self.db = Database().getDatabase()
        self.media = Media()

    def getExistingMetaDataIds(self) -> list :
        data = list(self.db.metadatas.find({}, {"mediaId": 1, "_id": 0}))
        mediaIds = []
        for item in data:
            mediaIds.append(item["mediaId"])
        return mediaIds
        

    def storeMetaDataInDb(self, element):
        if element:
            self.db.metadatas.insert_many(element)

    def downloadPost(self):
        profile = instaloader.Profile.from_username(self.loader.context, USER_NAME)
        collection = profile.get_saved_posts()
        mediaIds = self.getExistingMetaDataIds()
        for post in collection:
            if (post.mediaid not in mediaIds) and post.is_video:
                res = self.loader.download_post(post, target=DIR_NAME_PATTERN)
                print(f'post: {post} downloaded: {res}')

    def run(self):
        self.loader.login(USER_NAME, PASSWORD)
        self.downloadPost()
        metaData = self.parser.run()
        metaData = self.media.storeMediaInCloudinary(metaData)
        self.storeMetaDataInDb(metaData)
        removedirs(COLLECTION_LOCATION)

def main():
    Bot().run()
    # Parser().run()
    # print(Bot().getExistingMetaDataIds())
    # Database().getDatabase().metadatas.drop()
    # Bot().parser.run()

if __name__ == "__main__":
    main()