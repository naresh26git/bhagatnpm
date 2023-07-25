BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[leaves] ALTER COLUMN [no_of_days] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[salaries] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[task] ALTER COLUMN [no_of_hours] DECIMAL NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[qualifications] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(128) NOT NULL,
    [user_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [qualifications_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [qualifications_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [qualifications_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[indentification_types] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(128) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [indentification_types_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [indentification_types_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [indentification_types_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[identifications] (
    [id] INT NOT NULL IDENTITY(1,1),
    [type_id] INT NOT NULL,
    [number] VARCHAR(128) NOT NULL,
    [user_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [identifications_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [identifications_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [identifications_number_key] UNIQUE NONCLUSTERED ([number]),
    CONSTRAINT [identifications_type_id_user_id_key] UNIQUE NONCLUSTERED ([type_id],[user_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[qualifications] ADD CONSTRAINT [qualifications_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[qualifications] ADD CONSTRAINT [qualifications_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[qualifications] ADD CONSTRAINT [qualifications_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[indentification_types] ADD CONSTRAINT [indentification_types_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[indentification_types] ADD CONSTRAINT [indentification_types_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[identifications] ADD CONSTRAINT [identifications_type_id_fkey] FOREIGN KEY ([type_id]) REFERENCES [dbo].[indentification_types]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[identifications] ADD CONSTRAINT [identifications_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[identifications] ADD CONSTRAINT [identifications_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[identifications] ADD CONSTRAINT [identifications_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
