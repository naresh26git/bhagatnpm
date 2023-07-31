BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[leaves] ALTER COLUMN [no_of_days] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[pay_slip] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[salaries] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[task] ALTER COLUMN [no_of_hours] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[visitor_passes] DROP CONSTRAINT [visitor_passes_imageUrl_df];
ALTER TABLE [dbo].[visitor_passes] ADD CONSTRAINT [visitor_passes_imageUrl_df] DEFAULT '' FOR [imageUrl];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
