import instaloader
from Database import Database
from Parser import Parser

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

class Bot:
    def __init__(self):
        self.loader = instaloader.Instaloader(download_pictures=False, download_videos=True, download_video_thumbnails=False, post_metadata_txt_pattern="", compress_json=False, filename_pattern=FILE_NAME_PATTERN)
        self.parser = Parser()
        self.db = Database().getDatabase()

    def store(self, element):
        self.db.metadatas.insert_many(element)

    def downloadPost(self):
        profile = instaloader.Profile.from_username(self.loader.context, USER_NAME)
        collection = profile.get_saved_posts()
        for post in collection:
            # compare (post media id) to (saved post media id)
            if post.is_video:
                # saved media_id to array
                res = self.loader.download_post(post, target=DIR_NAME_PATTERN)
                print(f'post: {post} downloaded: {res}')

    def run(self):
        self.loader.login(USER, PASSWORD)
        self.downloadPost()
        metaData = self.parser.run()
        self.store(metaData)
        # push meta data in db
        # remove meta data .json from local

def main():
    # Bot().runParser()
    Bot().run()
    # Database().getDatabase()

if __name__ == "__main__":
    main()