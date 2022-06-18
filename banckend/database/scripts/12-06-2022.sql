ALTER TABLE `tb_configure_invoice`
    ADD COLUMN `active` TINYINT(1) NOT NULL DEFAULT 1 AFTER `timestamp`;

CREATE TABLE `tb_events` (
     `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
     `userId` INT(11) NOT NULL,
     `totalPeople` SMALLINT(6) NOT NULL DEFAULT '0',
     `url` VARCHAR(120) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
     `title` VARCHAR(120) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
     `calendar` VARCHAR(60) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
     `start` DATETIME NULL DEFAULT NULL,
     `end` DATETIME NULL DEFAULT NULL,
     `allDay` TINYINT(1) NOT NULL DEFAULT '0',
     `extendedProps` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb4_bin',
     `status` SMALLINT(1) NOT NULL DEFAULT '1',
     PRIMARY KEY (`id`) USING BTREE,
     INDEX `user_id` (`userId`) USING BTREE,
     CONSTRAINT `FK_tb_events_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT
)
    COMMENT='Eventos'
    COLLATE='utf8mb4_general_ci'
    ENGINE=InnoDB
    AUTO_INCREMENT=1
;


CREATE TABLE `tb_detail_events` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `eventId` BIGINT(20) NOT NULL,
    `productId` INT(11) NOT NULL,
    `paymentId` SMALLINT(6) NOT NULL,
    `amount` SMALLINT(6) NOT NULL DEFAULT '1',
    `price` DECIMAL(20,2) NOT NULL DEFAULT '0.00',
    `discount` DECIMAL(20,2) NOT NULL DEFAULT '0.00',
    `total` DECIMAL(20,2) NOT NULL DEFAULT '0.00',
    `balance` DECIMAL(20,2) NOT NULL DEFAULT '0.00',
    `advance` DECIMAL(20,2) NOT NULL DEFAULT '0.00',
    `info` VARCHAR(250) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
    `timestamp` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    `paymentDate` DATE NULL DEFAULT curdate(),
    PRIMARY KEY (`id`) USING BTREE,
    INDEX `eventId` (`eventId`) USING BTREE,
    INDEX `productId` (`productId`) USING BTREE,
    INDEX `paymentId` (`paymentId`) USING BTREE,
    CONSTRAINT `FK_tb_detail_events_payment_methods` FOREIGN KEY (`paymentId`) REFERENCES `payment_methods` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT `FK_tb_detail_events_tb_events` FOREIGN KEY (`eventId`) REFERENCES `tb_events` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `FK_tb_detail_events_tb_products` FOREIGN KEY (`productId`) REFERENCES `tb_products` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT
)
    COMMENT='Detalle de los eventos'
    COLLATE='utf8mb4_general_ci'
    ENGINE=InnoDB
    AUTO_INCREMENT=1
;

CREATE TABLE `tb_events_user` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `eventId` BIGINT(20) NOT NULL,
  `userId` INT(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `eventId` (`eventId`) USING BTREE,
  INDEX `userId` (`userId`) USING BTREE,
  CONSTRAINT `FK_tb_events_user_tb_events` FOREIGN KEY (`eventId`) REFERENCES `tb_events` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT `FK_tb_events_user_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE RESTRICT
)
    COLLATE='utf8mb4_general_ci'
    ENGINE=InnoDB
    AUTO_INCREMENT=1
;

