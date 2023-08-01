import {
  BlobServiceClient,
  ContainerSASPermissions,
  SASProtocol,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
} from "@azure/storage-blob";
import { TRPCError } from "@trpc/server";
import { getErrorMessage } from "../../../utils/get-error-message";
import { protectedProcedure } from "../../trpc";

const accountName = "clubitstoragepoc";
const accountKey =
  "mCRghfh0IfVp3tvL14/9hNNQbjW3kxiAeMS64NRjj07XP0eCpaFrAJPRcl0ZQqiGLGAdAA1AsuDo+AStgEQOIQ==";
const containerName = "upload";

async function generateSasToken(): Promise<string> {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey
  );
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Set the SAS token expiry time (e.g., 1 hour from now)
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 1);

  // Define the permissions for the SAS token
  const permissions = new ContainerSASPermissions();
  permissions.read = true;
  permissions.write = true;
  permissions.list = true;
  permissions.delete = true;
  permissions.add = true;
  permissions.create = true;

  // Generate the SAS token parameters
  const sasParams = {
    containerName: containerClient.containerName,
    permissions: permissions, // Use the ContainerSASPermissions object directly
    startsOn: new Date(),
    expiresOn: expiryDate,
    protocol: SASProtocol.Https,
    version: "2022-11-02",
    resourceTypes: "sco",
    services: "bfqt",
  };

  // Generate the signature for the SAS token
  const signature = generateBlobSASQueryParameters(
    sasParams,
    sharedKeyCredential
  ).toString();

  // Construct the SAS token string manually
  // const sasToken = `sv=${sasParams.version}&ss=${sasParams.services}&srt=${
  //   sasParams.resourceTypes
  // }&sp=${sasParams.permissions.toString()}&se=${sasParams.expiresOn.toISOString()}&st=${sasParams.startsOn.toISOString()}&spr=${
  //   sasParams.protocol
  // }&sig=${signature}`;

  console.log(signature);

  return signature;
}

export const get = protectedProcedure.query(async ({}) => {
  try {
    const sasToken = await generateSasToken();
    console.log("Custom SAS Token:", sasToken);
    return { sasToken };
  } catch (error) {
    console.log(getErrorMessage(error));

    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
});
