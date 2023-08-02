import { BlobServiceClient } from "@azure/storage-blob";

const containerName = `upload`;
const sasToken =
  "sv=2022-11-02&ss=btqf&srt=sco&spr=https&st=2023-08-02T11:29:45Z&se=2023-08-02T14:36:11Z&sp=rwdxftlacupiy&sig=dHqwUbU/yIBeT8FOUlZcX1PE2M6mNigtsxO6dC83KKw=";
const storageAccountName = "clubitsstoragepoc";

const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;

const blobService = new BlobServiceClient(uploadUrl);

const containerClient = blobService.getContainerClient(containerName);

export const isStorageConfigured = () => {
  return !storageAccountName || !sasToken ? false : true;
};

const createBlobInContainer = async (file: File) => {
  console.log({ file });
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadData(file, options);
  return blobClient.url;
};

export const uploadFileToBlob = async (file: File) => {
  if (!file) return;

  // upload file

  return await createBlobInContainer(file);
};
