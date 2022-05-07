import cloudinary
import cloudinary.uploader
import cloudinary.api

from os import getenv, remove as removeFileInLocal, path as osPath
from dotenv import load_dotenv
from utils import removeFieldFromDict

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

    def upload(self, filePath, publicId, folderName, mediaType):
      mediaInfo = cloudinary.uploader.upload(filePath,
        folder = folderName,
        public_id = publicId,
        overwrite = True,
        notification_url = "https://mysite.example.com/notify_endpoint", # TODO: replace by real endpoint | create endpoint in server, when triggered send socket to client
        resource_type = mediaType)

      return mediaInfo


    def storeMediaInCloudinary(self, medias):
      for index, media in enumerate(medias):
        try:
          videoPath = media["videoPath"]
          publicId = media["mediaId"]
          mediaType = "video" # TODO: in future, find a way to figure out if media is video or picture
          uploadedMediaInfo = self.upload(videoPath, publicId, MEDI_FOLDER_NAME, mediaType)
          media["referenceUrl"] = uploadedMediaInfo["secure_url"]
          removeFieldFromDict(media, "videoPath")
          removeFileInLocal(videoPath) #* Remove video file after upload it
        except Exception as error:
          if (osPath.isfile(videoPath)):
            removeFileInLocal(videoPath)
          medias.pop(index)
          print(error)
      
      return medias

    def addPrefixToPublicId(self, element: list | str, prefix: str):
      if isinstance(element, list):
        for index in range(len(element)):
          element[index] = osPath.join(prefix, element[index])
      else:
        element = osPath.join(prefix, element)
      return element

    def removeMediaFromCloudinary(self, mediaIds: list | str, folderName=MEDI_FOLDER_NAME, resourceType="video", **options): # removeMediaFromCloudinary(["42423542"], resource_type="video")
      mediaIds = self.addPrefixToPublicId(mediaIds, folderName)

      res = cloudinary.api.delete_resources(public_ids=mediaIds, resource_type=resourceType, options=options)
      return res
