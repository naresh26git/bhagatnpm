BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[addresses] DROP CONSTRAINT [addresses_address_type_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[leaves] DROP CONSTRAINT [leaves_leave_type_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[leaves] DROP CONSTRAINT [leaves_status_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[pay_rolls] DROP CONSTRAINT [pay_rolls_status_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[personal_infos] DROP CONSTRAINT [personal_infos_department_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[personal_infos] DROP CONSTRAINT [personal_infos_designation_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[sessions] DROP CONSTRAINT [sessions_user_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[time_sheets] DROP CONSTRAINT [time_sheets_status_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[users] DROP CONSTRAINT [users_role_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[users] DROP CONSTRAINT [users_status_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[leaves] ALTER COLUMN [no_of_days] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[salaries] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[sessions] ALTER COLUMN [session] NVARCHAR NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[users] ALTER COLUMN [status_id] INT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[addresses] ADD CONSTRAINT [addresses_address_type_id_fkey] FOREIGN KEY ([address_type_id]) REFERENCES [dbo].[address_type]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[leaves] ADD CONSTRAINT [leaves_leave_type_id_fkey] FOREIGN KEY ([leave_type_id]) REFERENCES [dbo].[leave_types]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[leaves] ADD CONSTRAINT [leaves_status_id_fkey] FOREIGN KEY ([status_id]) REFERENCES [dbo].[leave_statuses]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pay_rolls] ADD CONSTRAINT [pay_rolls_status_id_fkey] FOREIGN KEY ([status_id]) REFERENCES [dbo].[pay_roll_statuses]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[personal_infos] ADD CONSTRAINT [personal_infos_department_id_fkey] FOREIGN KEY ([department_id]) REFERENCES [dbo].[departments]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[personal_infos] ADD CONSTRAINT [personal_infos_designation_id_fkey] FOREIGN KEY ([designation_id]) REFERENCES [dbo].[designations]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[time_sheets] ADD CONSTRAINT [time_sheets_status_id_fkey] FOREIGN KEY ([status_id]) REFERENCES [dbo].[time_sheet_statuses]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_role_id_fkey] FOREIGN KEY ([role_id]) REFERENCES [dbo].[roles]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_status_id_fkey] FOREIGN KEY ([status_id]) REFERENCES [dbo].[user_statuses]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[sessions] ADD CONSTRAINT [sessions_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
