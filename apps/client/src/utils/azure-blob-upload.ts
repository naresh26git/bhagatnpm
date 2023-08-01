import { BlobServiceClient } from "@azure/storage-blob";

// const containerName = `upload`;
// const sasToken =
//   "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-07-24T13:58:58Z&st=2023-07-24T05:58:58Z&spr=https&sig=bGvLv526OjCCQFcGGCklLgLLdNd0CbNGRxxqigiY084%3D";
// const storageAccountName = "clubitsstoragepoc";

// const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;

// const blobService = new BlobServiceClient(uploadUrl);

// const containerClient = blobService.getContainerClient(containerName);

// export const isStorageConfigured = () => {
//   return !storageAccountName || !sasToken ? false : true;
// };

// const createBlobInContainer = async (file: File) => {
//   console.log({ file });
//   // create blobClient for container
//   const blobClient = containerClient.getBlockBlobClient(file.name);

//   // set mimetype as determined from browser with file upload control
//   const options = { blobHTTPHeaders: { blobContentType: file.type } };

//   // upload file
//   await blobClient.uploadData(file, options);

//   const url = blobClient.url;
//   return url;
// };

// export const uploadFileToBlob = async (file: File) => {
//   if (!file) return;

//   // upload file
//   await createBlobInContainer(file);
// };

// AUTO GENERETED TOKEN GET API

const createBlobInContainer = async (file: File, sasToken: string) => {
  console.log({ file });

  const containerName = `upload`;

  const storageAccountName = "clubitsstoragepoc";

  const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;

  console.log(uploadUrl);

  const blobService = new BlobServiceClient(uploadUrl);

  console.log(blobService);

  const containerClient = blobService.getContainerClient(containerName);

  console.log(containerClient);

  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  console.log(blobClient);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  console.log(options);

  // upload file
  const response = await blobClient.uploadData(file, options);

  console.log(response);

  const url = blobClient.url;
  console.log(url);
  return url;
};

// export const isStorageConfigured = (storageAccountName: any, sasToken: any) => {
//   return !storageAccountName || !sasToken ? false : true;
// };

export const uploadFileToBlob = async (file: File, sasToken: string) => {
  if (!file) return;

  // upload file
  const result = await createBlobInContainer(file, sasToken);
  console.log(result);
};
