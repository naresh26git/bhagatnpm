/*
  Warnings:

  - Added the required column `mobile_number` to the `visitor_passes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `visitor_passes` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[leaves] ALTER COLUMN [no_of_days] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[salaries] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[task] ALTER COLUMN [no_of_hours] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[visitor_passes] ADD [mobile_number] VARCHAR(16) NOT NULL,
[out_time] DATETIME2,
[reason] VARCHAR(1024) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
