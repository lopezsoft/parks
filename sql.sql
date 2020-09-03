 ALTER TABLE `tb_cash_closing`
	ADD COLUMN `opening_date` DATE NULL DEFAULT NULL AFTER `total`,
	ADD COLUMN `opening_time` TIME NULL DEFAULT NULL AFTER `opening_date`,
	ADD COLUMN `closing_date` DATETIME NULL DEFAULT NULL AFTER `opening_time`,
	ADD COLUMN `opened` TINYINT(1) NOT NULL DEFAULT 1 AFTER `document`,
	CHANGE COLUMN `date` `date` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() AFTER `opened`,
	ADD UNIQUE INDEX `id_user_opening_date` (`id_user`, `opening_date`);

ALTER TABLE `tb_access_users`
	ALTER `id_user` DROP DEFAULT;
ALTER TABLE `tb_access_users`
	CHANGE COLUMN `id_user` `id_user` INT(30) NOT NULL AFTER `id`,
	ADD CONSTRAINT `FK_tb_access_users_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

ALTER TABLE `tb_products`
	ADD COLUMN `detail` TEXT NULL DEFAULT NULL AFTER `mime`,
	ADD COLUMN `package` TINYINT(1) NOT NULL DEFAULT 0 AFTER `detail`;


-------------------------

ALTER TABLE `tb_cash_closing`
	CHANGE COLUMN `opening_time` `opening_time` DATE NULL DEFAULT NULL AFTER `opening_date`;

ALTER TABLE `tb_cash_closing`
	CHANGE COLUMN `opening_time` `opening_time` DATETIME NULL DEFAULT NULL AFTER `opening_date`;



---------  01 Noviembre --------------
TRUNCATE `tb_sales_users`;
ALTER TABLE `tb_sales_users`
	ALTER `id_user` DROP DEFAULT;
ALTER TABLE `tb_sales_users`
	CHANGE COLUMN `id_user` `id_cash` INT(30) NOT NULL AFTER `id`,
	DROP INDEX `id_user`,
	ADD INDEX `id_cash` (`id_cash`),
	DROP FOREIGN KEY `FK_tb_sales_users_users`,
	ADD CONSTRAINT `FK_tb_sales_users_tb_cash_closing` FOREIGN KEY (`id_cash`) REFERENCES `tb_cash_closing` (`id`);

ALTER TABLE `tb_cash_closing`
	DROP INDEX `id_user_opening_date`,
	ADD INDEX `id_user_opening_date` (`id_user`, `opening_date`, `opened`);