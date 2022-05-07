export type MetaData = {
  _id: string;
  mediaId: string;
  videoDuration: number;
  shortcode: string;
  caption: string;
  referenceUrl: string;
  videoUrlToInstagram: string;
  owner: {
    username: string;
    profilePicUrl: string;
  };
};
