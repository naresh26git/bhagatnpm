/*
  Warnings:

  - A unique constraint covering the columns `[user_id,address_type_id]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,type_id]` on the table `identifications` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[identifications] DROP CONSTRAINT [identifications_type_id_user_id_key];

-- AlterTable
ALTER TABLE [dbo].[import_pay_slip_components] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[pay_slip_components] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[addresses] ADD CONSTRAINT [addresses_user_id_address_type_id_key] UNIQUE NONCLUSTERED ([user_id], [address_type_id]);

-- CreateIndex
ALTER TABLE [dbo].[identifications] ADD CONSTRAINT [identifications_user_id_type_id_key] UNIQUE NONCLUSTERED ([user_id], [type_id]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
