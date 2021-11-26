import { Storage } from "aws-amplify";

export const SignS3ImageKey = async (imagekey: string) => {
  return Storage.get(imagekey)
    .then((result) => {
      return result;
    })
    .catch((err) => console.log(err));
};
