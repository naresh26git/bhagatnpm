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

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_status_id_fkey] FOREIGN KEY ([status_id]) REFERENCES [dbo].[user_statuses]([id]) ON DELETE SET NULL ON UPDATE SET NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
