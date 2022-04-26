import cloudinary
import cloudinary.uploader
import cloudinary.api

from os import getenv
from dotenv import load_dotenv

load_dotenv()

cloudinary.config( 
  cloud_name = getenv("CLOUDINARY_NAME"), 
  api_key = getenv("CLOUDINARY_PUBLIC_KEY"), 
  api_secret = getenv("CLOUDINARY_SECRET_KEY"),
  secure = True
)

class Media:
    def __init__(self) -> None:
        pass
    
    def upload(self):
      mediaInfo = cloudinary.uploader.upload("./collection/2814040079704622461_45327087258.mp4",
        folder = "test/",
        public_id = "first_video_test",
        overwrite = True,
        notification_url = "https://mysite.example.com/notify_endpoint", # TODO: replace by real endpoint
        resource_type = "video")

      # mediaInfo["secure_url"] # TODO: save in db (video reference)
      # mediaInfo[""]
      print(mediaInfo)