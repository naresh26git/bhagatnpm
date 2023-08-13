BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[pay_slip_components] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[import_pay_slip_components] (
    [id] INT NOT NULL IDENTITY(1,1),
    [component_type_id] INT NOT NULL,
    [amount] DECIMAL NOT NULL,
    [user_id] INT NOT NULL,
    [year] INT NOT NULL,
    [month] INT NOT NULL,
    [status_id] INT NOT NULL,
    CONSTRAINT [import_pay_slip_components_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [import_pay_slip_components_component_type_id_user_id_key] UNIQUE NONCLUSTERED ([component_type_id],[user_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[import_pay_slip_components] ADD CONSTRAINT [import_pay_slip_components_component_type_id_fkey] FOREIGN KEY ([component_type_id]) REFERENCES [dbo].[pay_slip_component_types]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[import_pay_slip_components] ADD CONSTRAINT [import_pay_slip_components_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[import_pay_slip_components] ADD CONSTRAINT [import_pay_slip_components_status_id_fkey] FOREIGN KEY ([status_id]) REFERENCES [dbo].[pay_roll_statuses]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
