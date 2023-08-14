import {
  EmailClient,
  EmailMessage,
  KnownEmailSendStatus,
} from "@azure/communication-email";

const connectionString =
  "endpoint=https://clubitscommunicationservicepoc.unitedstates.communication.azure.com/;accesskey=KrJ/gpA33LjSAqVPHKakGBMFA6XDzoOmr2HXjiqWYUt81zftV1OK94G5qBiDh5fiWkRx7hmpLvb5iF2X8WHoIA==";

const emailClient = new EmailClient(connectionString);

export const senderAddress =
  "<clubitsemailtest@37daa15c-805f-4460-8751-90f9369902cd.azurecomm.net>";

export const sendEmail = async (message: EmailMessage) => {
  const poller = await emailClient.beginSend(message);

  if (!poller.getOperationState().isStarted) {
    throw new Error("Poller was not started.");
  }

  let timeElapsed = 0;

  while (!poller.isDone()) {
    poller.poll();

    console.log("Email send polling in progress");

    await new Promise((resolve) => setTimeout(resolve, 10000));
    timeElapsed += 10;

    if (timeElapsed > 180) {
      throw new Error("Polling timed out.");
    }
  }

  if (poller.getResult()?.status === KnownEmailSendStatus.Succeeded) {
    console.log(
      `Successfully sent the email (operation id: ${poller.getResult()?.id})`
    );
  } else {
    throw new Error(poller.getResult()?.error?.message);
  }
};
