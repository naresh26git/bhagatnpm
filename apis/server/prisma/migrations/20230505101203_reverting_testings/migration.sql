/*
  Warnings:

  - A unique constraint covering the columns `[mobile]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[users] DROP CONSTRAINT [users_status_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[leaves] ALTER COLUMN [no_of_days] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[salaries] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[sessions] ALTER COLUMN [session] NVARCHAR NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_mobile_key] UNIQUE NONCLUSTERED ([mobile]);

-- CreateIndex
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_email_key] UNIQUE NONCLUSTERED ([email]);

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_status_id_fkey] FOREIGN KEY ([status_id]) REFERENCES [dbo].[user_statuses]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
