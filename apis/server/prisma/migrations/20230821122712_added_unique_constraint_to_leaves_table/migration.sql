/*
  Warnings:

  - A unique constraint covering the columns `[user_id,leave_type_id,from_date,to_date,no_of_days]` on the table `leaves` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[import_pay_slip_components] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[pay_slip_components] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[leaves] ADD CONSTRAINT [leaves_user_id_leave_type_id_from_date_to_date_no_of_days_key] UNIQUE NONCLUSTERED ([user_id], [leave_type_id], [from_date], [to_date], [no_of_days]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
