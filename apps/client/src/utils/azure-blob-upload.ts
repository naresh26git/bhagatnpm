import { BlobServiceClient } from "@azure/storage-blob";

// AUTO GENERETED TOKEN GET API
const createBlobInContainer = async (file: File, sasToken: string) => {
  const containerName = `upload`;

  const storageAccountName = "clubitsstoragepoc";

  const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;

  const blobService = new BlobServiceClient(uploadUrl);

  const containerClient = blobService.getContainerClient(containerName);

  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadData(file, options);

  const url = blobClient.url;

  return url;
};

export const isStorageConfigured = (storageAccountName: any, sasToken: any) => {
  return !storageAccountName || !sasToken ? false : true;
};

export const uploadFileToBlob = async (file: File, sasToken: string) => {
  if (!file) return;

  // upload file
  await createBlobInContainer(file, sasToken);
};
