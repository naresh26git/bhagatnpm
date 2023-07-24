BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[leaves] ALTER COLUMN [no_of_days] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[salaries] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[help_desk_categories] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [help_desk_categories_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [help_desk_categories_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [help_desk_categories_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[help_desk_statuses] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [help_desk_statuses_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [help_desk_statuses_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [help_desk_statuses_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[help_desks] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [date] DATE NOT NULL,
    [tittle] VARCHAR(128) NOT NULL,
    [description] VARCHAR(2048) NOT NULL,
    [remarks] VARCHAR(1024) NOT NULL,
    [category_id] INT NOT NULL,
    [status_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [help_desks_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [help_desks_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[help_desk_categories] ADD CONSTRAINT [help_desk_categories_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[help_desk_categories] ADD CONSTRAINT [help_desk_categories_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[help_desk_statuses] ADD CONSTRAINT [help_desk_statuses_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[help_desk_statuses] ADD CONSTRAINT [help_desk_statuses_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[help_desks] ADD CONSTRAINT [help_desks_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[help_desks] ADD CONSTRAINT [help_desks_category_id_fkey] FOREIGN KEY ([category_id]) REFERENCES [dbo].[help_desk_categories]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[help_desks] ADD CONSTRAINT [help_desks_status_id_fkey] FOREIGN KEY ([status_id]) REFERENCES [dbo].[help_desk_statuses]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[help_desks] ADD CONSTRAINT [help_desks_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[help_desks] ADD CONSTRAINT [help_desks_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
