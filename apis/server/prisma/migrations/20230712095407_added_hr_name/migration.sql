/*
  Warnings:

  - You are about to drop the column `name` on the `hrs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `hrs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `hrs` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[hrs] DROP CONSTRAINT [hrs_name_key];

-- AlterTable
ALTER TABLE [dbo].[hrs] DROP COLUMN [name];
ALTER TABLE [dbo].[hrs] ADD [user_id] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[leaves] ALTER COLUMN [no_of_days] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[salaries] ALTER COLUMN [amount] DECIMAL NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[task] ALTER COLUMN [no_of_hours] DECIMAL NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[hrs] ADD CONSTRAINT [hrs_user_id_key] UNIQUE NONCLUSTERED ([user_id]);

-- AddForeignKey
ALTER TABLE [dbo].[hrs] ADD CONSTRAINT [hrs_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
