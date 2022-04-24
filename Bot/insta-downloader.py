from turtle import pos
import instaloader
from dotenv import load_dotenv
from Database import Database
from os import getenv
from Parser import Parser

load_dotenv()

PASSWORD = getenv("PASSWORD")
USER_NAME = getenv("USER_NAME")
FILE_NAME_PATTERN = "{mediaid}_{owner_id}"
DIR_NAME_PATTERN = "collection"

class Bot:
    def __init__(self):
        self.loader = instaloader.Instaloader(download_pictures=False, download_videos=True, download_video_thumbnails=False, post_metadata_txt_pattern="", compress_json=False, filename_pattern=FILE_NAME_PATTERN)
        self.parser = Parser()
        self.db = Database().getDatabase()

    def getExistingMetaDataIds(self) -> list :
        data = list(self.db.metadatas.find({}, {"mediaId": 1, "_id": 0}))
        mediaIds = []
        for item in data:
            mediaIds.append(item["mediaId"])
        return mediaIds
        

    def store(self, element):
        if element:
            self.db.metadatas.insert_many(element)

    def downloadPost(self):
        profile = instaloader.Profile.from_username(self.loader.context, USER_NAME)
        collection = profile.get_saved_posts()
        mediaIds = self.getExistingMetaDataIds()
        print(mediaIds)
        for post in collection:
            if (post.mediaid not in mediaIds) and post.is_video:
                res = self.loader.download_post(post, target=DIR_NAME_PATTERN)
                print('media id: ', post.mediaid)
                print(f'post: {post} downloaded: {res}')

    def run(self):
        self.loader.login(USER_NAME, PASSWORD)
        self.downloadPost()
        metaData = self.parser.run()
        self.store(metaData)

def main():
    Bot().run()
    # print(Bot().getExistingMetaDataIds())
    # Database().getDatabase().metadatas.drop()
    # Bot().parser.run()

if __name__ == "__main__":
    main()