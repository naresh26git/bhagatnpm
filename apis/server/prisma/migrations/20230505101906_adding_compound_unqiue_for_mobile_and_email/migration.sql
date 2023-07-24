/*
  Warnings:

  - A unique constraint covering the columns `[username,mobile]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username,email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[users] DROP CONSTRAINT [users_email_key];

-- DropIndex
ALTER TABLE [dbo].[users] DROP CONSTRAINT [users_mobile_key];

-- AlterTable
ALTER TABLE [dbo].[leaves] ALTER COLUMN [no_of_days] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[salaries] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[sessions] ALTER COLUMN [session] NVARCHAR NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_username_mobile_key] UNIQUE NONCLUSTERED ([username], [mobile]);

-- CreateIndex
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_username_email_key] UNIQUE NONCLUSTERED ([username], [email]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
