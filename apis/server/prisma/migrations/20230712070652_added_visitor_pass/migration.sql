/*
  Warnings:

  - You are about to drop the `company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HrName` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `visitor-pass` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[company] DROP CONSTRAINT [company_created_by_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[company] DROP CONSTRAINT [company_updated_by_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[HrName] DROP CONSTRAINT [HrName_company_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[HrName] DROP CONSTRAINT [HrName_created_by_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[HrName] DROP CONSTRAINT [HrName_updated_by_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[visitor-pass] DROP CONSTRAINT [visitor-pass_created_by_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[visitor-pass] DROP CONSTRAINT [visitor-pass_hr_company_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[visitor-pass] DROP CONSTRAINT [visitor-pass_hr_name_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[visitor-pass] DROP CONSTRAINT [visitor-pass_updated_by_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[visitor-pass] DROP CONSTRAINT [visitor-pass_user_id_fkey];

-- AlterTable
ALTER TABLE [dbo].[leaves] ALTER COLUMN [no_of_days] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[salaries] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- DropTable
DROP TABLE [dbo].[company];

-- DropTable
DROP TABLE [dbo].[HrName];

-- DropTable
DROP TABLE [dbo].[visitor-pass];

-- CreateTable
CREATE TABLE [dbo].[task_billed_team] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [task_billed_team_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [task_billed_team_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [task_billed_team_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[task_project] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [task_project_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [task_project_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [task_project_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[task] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [project_id] INT NOT NULL,
    [task_date] DATETIME2 NOT NULL,
    [task_name] VARCHAR(64) NOT NULL,
    [task_description] VARCHAR(256) NOT NULL,
    [no_of_hours] DECIMAL NOT NULL,
    [remarks] TEXT NOT NULL,
    [team_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [task_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [task_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[companies] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [companies_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [companies_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [companies_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[hrs] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [company_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [hrs_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [hrs_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [hrs_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[visitor_passes] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [hr_name_id] INT NOT NULL,
    [visitor_date] DATETIME2 NOT NULL,
    [hr_company] INT NOT NULL,
    [from_place] VARCHAR(64) NOT NULL,
    [in_time] DATETIME2 NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [visitor_passes_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [visitor_passes_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [visitor_passes_name_key] UNIQUE NONCLUSTERED ([name])
);

-- AddForeignKey
ALTER TABLE [dbo].[task_billed_team] ADD CONSTRAINT [task_billed_team_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[task_billed_team] ADD CONSTRAINT [task_billed_team_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[task_project] ADD CONSTRAINT [task_project_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[task_project] ADD CONSTRAINT [task_project_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[task] ADD CONSTRAINT [task_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[task] ADD CONSTRAINT [task_project_id_fkey] FOREIGN KEY ([project_id]) REFERENCES [dbo].[task_project]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[task] ADD CONSTRAINT [task_team_id_fkey] FOREIGN KEY ([team_id]) REFERENCES [dbo].[task_billed_team]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[task] ADD CONSTRAINT [task_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[task] ADD CONSTRAINT [task_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[companies] ADD CONSTRAINT [companies_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[companies] ADD CONSTRAINT [companies_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[hrs] ADD CONSTRAINT [hrs_company_id_fkey] FOREIGN KEY ([company_id]) REFERENCES [dbo].[companies]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[hrs] ADD CONSTRAINT [hrs_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[hrs] ADD CONSTRAINT [hrs_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[visitor_passes] ADD CONSTRAINT [visitor_passes_hr_name_id_fkey] FOREIGN KEY ([hr_name_id]) REFERENCES [dbo].[hrs]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[visitor_passes] ADD CONSTRAINT [visitor_passes_hr_company_fkey] FOREIGN KEY ([hr_company]) REFERENCES [dbo].[companies]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[visitor_passes] ADD CONSTRAINT [visitor_passes_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[visitor_passes] ADD CONSTRAINT [visitor_passes_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
