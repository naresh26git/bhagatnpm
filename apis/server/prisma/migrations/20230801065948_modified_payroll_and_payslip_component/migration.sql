/*
  Warnings:

  - You are about to drop the column `salary_id` on the `pay_rolls` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `pay_slip_components` table. All the data in the column will be lost.
  - You are about to drop the `pay_slip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salaries` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[component_type_id,pay_roll_id]` on the table `pay_slip_components` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `year` to the `pay_rolls` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `month` on the `pay_rolls` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `amount` to the `pay_slip_components` table without a default value. This is not possible if the table is not empty.
  - Added the required column `component_type_id` to the `pay_slip_components` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pay_roll_id` to the `pay_slip_components` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[pay_rolls] DROP CONSTRAINT [pay_rolls_salary_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[pay_slip] DROP CONSTRAINT [pay_slip_component_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[pay_slip] DROP CONSTRAINT [pay_slip_created_by_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[pay_slip] DROP CONSTRAINT [pay_slip_updated_by_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[pay_slip] DROP CONSTRAINT [pay_slip_user_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[salaries] DROP CONSTRAINT [salaries_created_by_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[salaries] DROP CONSTRAINT [salaries_updated_by_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[salaries] DROP CONSTRAINT [salaries_user_id_fkey];

-- DropIndex
ALTER TABLE [dbo].[pay_slip_components] DROP CONSTRAINT [pay_slip_components_name_key];

-- AlterTable
ALTER TABLE [dbo].[leaves] ALTER COLUMN [no_of_days] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[pay_rolls] DROP COLUMN [salary_id],
[month];
ALTER TABLE [dbo].[pay_rolls] ADD [year] INT NOT NULL,
[month] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[pay_slip_components] DROP COLUMN [name];
ALTER TABLE [dbo].[pay_slip_components] ADD [amount] DECIMAL NOT NULL,
[component_type_id] INT NOT NULL,
[pay_roll_id] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[task] ALTER COLUMN [no_of_hours] DECIMAL NOT NULL;

-- DropTable
DROP TABLE [dbo].[pay_slip];

-- DropTable
DROP TABLE [dbo].[salaries];

-- CreateTable
CREATE TABLE [dbo].[pay_slip_component_types] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] VARCHAR(64) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [pay_slip_component_types_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    [created_by_id] INT NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    [updated_by_id] INT NOT NULL,
    CONSTRAINT [pay_slip_component_types_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [pay_slip_component_types_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateIndex
ALTER TABLE [dbo].[pay_slip_components] ADD CONSTRAINT [pay_slip_components_component_type_id_pay_roll_id_key] UNIQUE NONCLUSTERED ([component_type_id], [pay_roll_id]);

-- AddForeignKey
ALTER TABLE [dbo].[pay_slip_component_types] ADD CONSTRAINT [pay_slip_component_types_created_by_id_fkey] FOREIGN KEY ([created_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pay_slip_component_types] ADD CONSTRAINT [pay_slip_component_types_updated_by_id_fkey] FOREIGN KEY ([updated_by_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pay_slip_components] ADD CONSTRAINT [pay_slip_components_component_type_id_fkey] FOREIGN KEY ([component_type_id]) REFERENCES [dbo].[pay_slip_component_types]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[pay_slip_components] ADD CONSTRAINT [pay_slip_components_pay_roll_id_fkey] FOREIGN KEY ([pay_roll_id]) REFERENCES [dbo].[pay_rolls]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
