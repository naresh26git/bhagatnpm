BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[leaves] ALTER COLUMN [no_of_days] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[salaries] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[company] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [company_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [company_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [company_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[HrName] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [company_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [HrName_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [HrName_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [HrName_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[visitor-pass] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [hr_name_id] INT NOT NULL,
    [visitor_date] DATETIME2 NOT NULL,
    [hr_company] INT NOT NULL,
    [from_place] VARCHAR(64) NOT NULL,
    [in_time] DATETIME2 NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [visitor-pass_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    [user_id] INT NOT NULL,
    CONSTRAINT [visitor-pass_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [visitor-pass_name_key] UNIQUE NONCLUSTERED ([name])
);

-- AddForeignKey
ALTER TABLE [dbo].[company] ADD CONSTRAINT [company_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[company] ADD CONSTRAINT [company_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[HrName] ADD CONSTRAINT [HrName_company_id_fkey] FOREIGN KEY ([company_id]) REFERENCES [dbo].[company]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[HrName] ADD CONSTRAINT [HrName_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[HrName] ADD CONSTRAINT [HrName_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[visitor-pass] ADD CONSTRAINT [visitor-pass_hr_name_id_fkey] FOREIGN KEY ([hr_name_id]) REFERENCES [dbo].[HrName]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[visitor-pass] ADD CONSTRAINT [visitor-pass_hr_company_fkey] FOREIGN KEY ([hr_company]) REFERENCES [dbo].[company]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[visitor-pass] ADD CONSTRAINT [visitor-pass_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[visitor-pass] ADD CONSTRAINT [visitor-pass_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[visitor-pass] ADD CONSTRAINT [visitor-pass_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
