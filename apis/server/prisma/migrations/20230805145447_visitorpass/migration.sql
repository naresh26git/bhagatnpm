BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[visitor_passes] DROP CONSTRAINT [visitor_passes_name_key];

-- AlterTable
ALTER TABLE [dbo].[pay_slip_components] ALTER COLUMN [amount] DECIMAL NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
