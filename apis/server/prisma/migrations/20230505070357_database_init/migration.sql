BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[address_type] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [address_type_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [address_type_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [address_type_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[addresses] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [address_type_id] INT NOT NULL,
    [street] NVARCHAR(1000) NOT NULL,
    [city] NVARCHAR(1000) NOT NULL,
    [state] NVARCHAR(1000) NOT NULL,
    [country] NVARCHAR(1000) NOT NULL,
    [pincode] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [addresses_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [addresses_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[departments] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [departments_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [departments_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [departments_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[designations] (
    [id] INT NOT NULL IDENTITY(1,1),
    [department_id] INT NOT NULL,
    [name] VARCHAR(64) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [designations_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [designations_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [designations_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[relationship_types] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [relationship_types_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [relationship_types_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [relationship_types_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[family_details] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [relationship_type_id] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [date_of_birth] DATE NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [family_details_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [family_details_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[leave_types] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [days_alloted] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [leave_types_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [leave_types_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [leave_types_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[leave_statuses] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [leave_statuses_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [leave_statuses_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [leave_statuses_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[leaves] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [leave_type_id] INT NOT NULL,
    [from_date] DATETIME2 NOT NULL,
    [to_date] DATETIME2 NOT NULL,
    [no_of_days] DECIMAL NOT NULL,
    [remarks] NVARCHAR(1000),
    [status_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [leaves_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [leaves_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[pay_roll_statuses] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [pay_roll_statuses_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [pay_roll_statuses_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [pay_roll_statuses_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[pay_rolls] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [month] DATE NOT NULL,
    [salary_id] INT NOT NULL,
    [status_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [pay_rolls_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [pay_rolls_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[personal_infos] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [first_name] VARCHAR(32) NOT NULL,
    [middle_name] VARCHAR(32),
    [last_name] VARCHAR(32) NOT NULL,
    [date_of_birth] DATE NOT NULL,
    [date_of_joining] DATE NOT NULL,
    [department_id] INT NOT NULL,
    [designation_id] INT NOT NULL,
    [reporting_manager_user_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [personal_infos_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [personal_infos_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [personal_infos_user_id_key] UNIQUE NONCLUSTERED ([user_id])
);

-- CreateTable
CREATE TABLE [dbo].[roles] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [roles_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT,
    CONSTRAINT [roles_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [roles_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[salaries] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [amount] DECIMAL NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [salaries_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [salaries_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [salaries_user_id_key] UNIQUE NONCLUSTERED ([user_id])
);

-- CreateTable
CREATE TABLE [dbo].[time_sheet_statuses] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [time_sheet_statuses_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [time_sheet_statuses_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [time_sheet_statuses_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[time_sheets] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [in_time] DATETIME2,
    [out_time] DATETIME2,
    [status_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [time_sheets_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [time_sheets_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[user_statuses] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [user_statuses_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [user_statuses_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [user_statuses_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] VARCHAR(64) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [role_id] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [mobile] VARCHAR(32),
    [email] VARCHAR(256),
    [otp] VARCHAR(8),
    [status_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [users_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT,
    CONSTRAINT [users_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [users_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [users_mobile_key] UNIQUE NONCLUSTERED ([mobile]),
    CONSTRAINT [users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[sessions] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [session_id] NVARCHAR(1000) NOT NULL,
    [session] NVARCHAR NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [sessions_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [sessions_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [sessions_session_id_key] UNIQUE NONCLUSTERED ([session_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[address_type] ADD CONSTRAINT [address_type_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[address_type] ADD CONSTRAINT [address_type_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[addresses] ADD CONSTRAINT [addresses_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[addresses] ADD CONSTRAINT [addresses_address_type_id_fkey] FOREIGN KEY ([address_type_id]) REFERENCES [dbo].[address_type]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[addresses] ADD CONSTRAINT [addresses_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[addresses] ADD CONSTRAINT [addresses_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[departments] ADD CONSTRAINT [departments_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[departments] ADD CONSTRAINT [departments_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[designations] ADD CONSTRAINT [designations_department_id_fkey] FOREIGN KEY ([department_id]) REFERENCES [dbo].[departments]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[designations] ADD CONSTRAINT [designations_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[designations] ADD CONSTRAINT [designations_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[relationship_types] ADD CONSTRAINT [relationship_types_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[relationship_types] ADD CONSTRAINT [relationship_types_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[family_details] ADD CONSTRAINT [family_details_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[family_details] ADD CONSTRAINT [family_details_relationship_type_id_fkey] FOREIGN KEY ([relationship_type_id]) REFERENCES [dbo].[relationship_types]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[family_details] ADD CONSTRAINT [family_details_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[family_details] ADD CONSTRAINT [family_details_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[leave_types] ADD CONSTRAINT [leave_types_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[leave_types] ADD CONSTRAINT [leave_types_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[leave_statuses] ADD CONSTRAINT [leave_statuses_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[leave_statuses] ADD CONSTRAINT [leave_statuses_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[leaves] ADD CONSTRAINT [leaves_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[leaves] ADD CONSTRAINT [leaves_leave_type_id_fkey] FOREIGN KEY ([leave_type_id]) REFERENCES [dbo].[leave_types]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[leaves] ADD CONSTRAINT [leaves_status_id_fkey] FOREIGN KEY ([status_id]) REFERENCES [dbo].[leave_statuses]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[leaves] ADD CONSTRAINT [leaves_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[leaves] ADD CONSTRAINT [leaves_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pay_roll_statuses] ADD CONSTRAINT [pay_roll_statuses_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pay_roll_statuses] ADD CONSTRAINT [pay_roll_statuses_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pay_rolls] ADD CONSTRAINT [pay_rolls_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pay_rolls] ADD CONSTRAINT [pay_rolls_salary_id_fkey] FOREIGN KEY ([salary_id]) REFERENCES [dbo].[salaries]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pay_rolls] ADD CONSTRAINT [pay_rolls_status_id_fkey] FOREIGN KEY ([status_id]) REFERENCES [dbo].[pay_roll_statuses]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[pay_rolls] ADD CONSTRAINT [pay_rolls_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pay_rolls] ADD CONSTRAINT [pay_rolls_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[personal_infos] ADD CONSTRAINT [personal_infos_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[personal_infos] ADD CONSTRAINT [personal_infos_department_id_fkey] FOREIGN KEY ([department_id]) REFERENCES [dbo].[departments]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[personal_infos] ADD CONSTRAINT [personal_infos_designation_id_fkey] FOREIGN KEY ([designation_id]) REFERENCES [dbo].[designations]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[personal_infos] ADD CONSTRAINT [personal_infos_reporting_manager_user_id_fkey] FOREIGN KEY ([reporting_manager_user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[personal_infos] ADD CONSTRAINT [personal_infos_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[personal_infos] ADD CONSTRAINT [personal_infos_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[roles] ADD CONSTRAINT [roles_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[roles] ADD CONSTRAINT [roles_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[salaries] ADD CONSTRAINT [salaries_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[salaries] ADD CONSTRAINT [salaries_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[salaries] ADD CONSTRAINT [salaries_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[time_sheet_statuses] ADD CONSTRAINT [time_sheet_statuses_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[time_sheet_statuses] ADD CONSTRAINT [time_sheet_statuses_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[time_sheets] ADD CONSTRAINT [time_sheets_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[time_sheets] ADD CONSTRAINT [time_sheets_status_id_fkey] FOREIGN KEY ([status_id]) REFERENCES [dbo].[time_sheet_statuses]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[time_sheets] ADD CONSTRAINT [time_sheets_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[time_sheets] ADD CONSTRAINT [time_sheets_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[user_statuses] ADD CONSTRAINT [user_statuses_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[user_statuses] ADD CONSTRAINT [user_statuses_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_role_id_fkey] FOREIGN KEY ([role_id]) REFERENCES [dbo].[roles]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_status_id_fkey] FOREIGN KEY ([status_id]) REFERENCES [dbo].[user_statuses]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[users] ADD CONSTRAINT [users_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[sessions] ADD CONSTRAINT [sessions_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
