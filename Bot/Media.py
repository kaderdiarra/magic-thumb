import cloudinary
import cloudinary.uploader
import cloudinary.api

from os import getenv, remove as removeFileInLocal, path as osPath
from dotenv import load_dotenv

load_dotenv()

cloudinary.config( 
  cloud_name = getenv("CLOUDINARY_NAME"), 
  api_key = getenv("CLOUDINARY_PUBLIC_KEY"), 
  api_secret = getenv("CLOUDINARY_SECRET_KEY"),
  secure = True
)

MEDI_FOLDER_NAME = getenv("CLOUDINARY_MEDIA_FOLDER_NAME")

class Media:
    def __init__(self) -> None:
        pass

    def upload(self, filePath, fileName, folderName, mediaType):
      mediaInfo = cloudinary.uploader.upload(filePath,
        folder = folderName,
        public_id = fileName,
        overwrite = True,
        notification_url = "https://mysite.example.com/notify_endpoint", # TODO: replace by real endpoint
        resource_type = mediaType)

      return mediaInfo


    def storeMediaInCloudinary(self, medias):
      for index, media in enumerate(medias):
        try:
          videoPath = media["videoPath"]
          fileName = media["mediaId"]
          mediaType = "video" # TODO: in future, find a way to figure out if media is video or picture
          uploadedMediaInfo = self.upload(videoPath, fileName, MEDI_FOLDER_NAME, mediaType)
          media["reference_url"] = uploadedMediaInfo["secure_url"]
          removeFileInLocal(videoPath) #* Remove video file after upload it
        except Exception as error:
          if (osPath.isfile(videoPath)):
            removeFileInLocal(videoPath)
          medias.pop(index)
          print(error)
      
      return medias