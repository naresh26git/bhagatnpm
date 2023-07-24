/*
  Warnings:

  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[sessions] DROP CONSTRAINT [sessions_user_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[leaves] ALTER COLUMN [no_of_days] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[salaries] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- DropTable
DROP TABLE [dbo].[sessions];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
