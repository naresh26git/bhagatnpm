/*
  Warnings:

  - A unique constraint covering the columns `[user_id,relationship_type_id,name]` on the table `family_details` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[import_pay_slip_components] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[pay_slip_components] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[family_details] ADD CONSTRAINT [family_details_user_id_relationship_type_id_name_key] UNIQUE NONCLUSTERED ([user_id], [relationship_type_id], [name]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
