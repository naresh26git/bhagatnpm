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

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
