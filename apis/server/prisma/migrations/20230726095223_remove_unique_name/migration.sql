/*
  Warnings:

  - You are about to drop the `indentification_types` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[identifications] DROP CONSTRAINT [identifications_type_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[indentification_types] DROP CONSTRAINT [indentification_types_created_by_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[indentification_types] DROP CONSTRAINT [indentification_types_updated_by_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[leaves] ALTER COLUMN [no_of_days] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[salaries] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[task] ALTER COLUMN [no_of_hours] DECIMAL NOT NULL;

-- DropTable
DROP TABLE [dbo].[indentification_types];

-- CreateTable
CREATE TABLE [dbo].[identification_types] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(128) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [identification_types_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [identification_types_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [identification_types_name_key] UNIQUE NONCLUSTERED ([name])
);

-- AddForeignKey
ALTER TABLE [dbo].[identification_types] ADD CONSTRAINT [identification_types_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[identification_types] ADD CONSTRAINT [identification_types_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[identifications] ADD CONSTRAINT [identifications_type_id_fkey] FOREIGN KEY ([type_id]) REFERENCES [dbo].[identification_types]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
