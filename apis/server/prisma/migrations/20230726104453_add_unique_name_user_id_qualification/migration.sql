/*
  Warnings:

  - A unique constraint covering the columns `[user_id,name]` on the table `qualifications` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[qualifications] DROP CONSTRAINT [qualifications_name_key];

-- DropIndex
ALTER TABLE [dbo].[qualifications] DROP CONSTRAINT [qualifications_name_user_id_key];

-- AlterTable
ALTER TABLE [dbo].[leaves] ALTER COLUMN [no_of_days] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[salaries] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[task] ALTER COLUMN [no_of_hours] DECIMAL NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[qualifications] ADD CONSTRAINT [qualifications_user_id_name_key] UNIQUE NONCLUSTERED ([user_id], [name]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
