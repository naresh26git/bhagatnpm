import { BlobServiceClient } from "@azure/storage-blob";

const containerName = `upload`;
const sasToken =
  "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-07-31T14:43:11Z&st=2023-07-31T06:43:11Z&spr=https&sig=Tr4QqKLlyVegwCbzvhZ6wfy6Dv9musbhJqpu6%2F8Esj0%3D";
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
};

export const uploadFileToBlob = async (file: File) => {
  if (!file) return;

  // upload file
  await createBlobInContainer(file);
};
