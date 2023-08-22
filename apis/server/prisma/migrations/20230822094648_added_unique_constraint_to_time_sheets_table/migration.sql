/*
  Warnings:

  - A unique constraint covering the columns `[user_id,in_time,out_time]` on the table `time_sheets` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[import_pay_slip_components] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[pay_slip_components] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[time_sheets] ADD CONSTRAINT [time_sheets_user_id_in_time_out_time_key] UNIQUE NONCLUSTERED ([user_id], [in_time], [out_time]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
