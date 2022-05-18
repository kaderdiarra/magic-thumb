import instaloader
from dotenv import load_dotenv
from os import getenv, removedirs, getcwd, _exit
from sys import exit
from Database import Database
from Parser import Parser
from Media import Media
from Rabbitmq import Rabbitmq

load_dotenv()

PASSWORD = getenv("PASSWORD")
USERNAME = getenv("USERNAME")
FILE_NAME_PATTERN = "{mediaid}_{owner_id}"
DIR_NAME_PATTERN = "collection"
COLLECTION_LOCATION = getcwd() + "/collection/"

class Bot:
    def __init__(self) -> None:
        self.loader = instaloader.Instaloader(download_pictures=False, download_videos=True, download_video_thumbnails=False, post_metadata_txt_pattern="", compress_json=False, filename_pattern=FILE_NAME_PATTERN)
        self.parser = Parser()
        self.dbManager = Database()
        self.db = self.dbManager.getDatabase()
        self.media = Media()
        self.rabbitmq = Rabbitmq(self.updatePosts, self.removePosts)

    def downloadPost(self):
        profile = instaloader.Profile.from_username(self.loader.context, USERNAME)
        collection = profile.get_saved_posts()
        mediaIds = self.dbManager.getExistingMetaDataIds()
        for post in collection:
            if (post.mediaid not in mediaIds) and post.is_video:
                try:
                    res = self.loader.download_post(post, target=DIR_NAME_PATTERN)
                    print(f'post: {post} downloaded: {res}')
                except Exception as error:
                    print(error)

    def updatePosts(self, data: dict):
        self.loader.login(data.get("username"), data.get("password"))
        self.downloadPost()
        metaData = self.parser.run()
        metaData = self.media.storeMediaInCloudinary(metaData)
        self.dbManager.storeMetaDataInDb(metaData)
        removedirs(COLLECTION_LOCATION)

    def removePosts(self, ids: list):
        print("remove posts", ids)

    def run(self):
        try:
            self.rabbitmq.consume()
        except Exception as error:
            print(error)
            self.rabbitmq.consume()

def main():
    Bot().run()
    # print(Media().removeMediaFromCloudinary(["2817808834519857686", "2814040079704622461"]))
    # Parser().run()
    # print(Bot().getExistingMetaDataIds())
    # Database().getDatabase().metadatas.drop()
    # Bot().parser.run()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            exit(0)
        except SystemExit:
            _exit(0)