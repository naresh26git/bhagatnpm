import {
  AccountSASPermissions,
  SASProtocol,
  StorageSharedKeyCredential,
  generateAccountSASQueryParameters,
} from "@azure/storage-blob";

import { TRPCError } from "@trpc/server";
import { getErrorMessage } from "../../../utils/get-error-message";
import { protectedProcedure } from "../../trpc";

const accountName = "clubitsstoragepoc";
const accountKey =
  "mCRghfh0IfVp3tvL14/9hNNQbjW3kxiAeMS64NRjj07XP0eCpaFrAJPRcl0ZQqiGLGAdAA1AsuDo+AStgEQOIQ==";

async function generateSasToken(): Promise<string> {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey
  );

  const signature = generateAccountSASQueryParameters(
    {
      version: "2022-11-02",
      services: "bfqt",
      resourceTypes: "sco",
      permissions: AccountSASPermissions.parse("rwdlacupiytfx"),
      startsOn: new Date(),
      expiresOn: new Date(new Date().valueOf() + 11186400),
      protocol: SASProtocol.Https,
    },
    sharedKeyCredential
  ).toString();

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
