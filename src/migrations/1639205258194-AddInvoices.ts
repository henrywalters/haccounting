import {MigrationInterface, QueryRunner} from "typeorm";

export class AddInvoices1639205258194 implements MigrationInterface {
    name = 'AddInvoices1639205258194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `client` (`id` varchar(36) NOT NULL, `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `rate` float NOT NULL, `contactName` varchar(255) NULL, `contactEmail` varchar(255) NULL, `phone` varchar(255) NOT NULL, `stripeId` varchar(255) NULL, `invoicePrefix` varchar(255) NOT NULL DEFAULT 2021, `billingAddressId` varchar(36) NULL, `shippingAddressId` varchar(36) NULL, UNIQUE INDEX `REL_0a308d3578511f26970c693a7e` (`billingAddressId`), UNIQUE INDEX `REL_2c2cedfbb2f55fe7fc203f97cd` (`shippingAddressId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `address` (`id` varchar(36) NOT NULL, `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `streetAddress` varchar(255) NOT NULL, `unitType` varchar(255) NULL, `unitNumber` varchar(255) NULL, `city` varchar(255) NOT NULL, `state` varchar(255) NOT NULL, `zipCode` varchar(255) NOT NULL, `clientId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `invoice_item` (`updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` varchar(255) NOT NULL, `title` varchar(255) NOT NULL, `description` varchar(255) NULL, `rate` float NOT NULL, `quantity` float NOT NULL, `invoiceId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `invoice` (`updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` varchar(255) NOT NULL, `date` datetime NOT NULL, `amountPaid` float NOT NULL DEFAULT '0', `status` enum ('Invoiced', 'Paid', 'Void') NOT NULL, `clientId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `project_task` (`id` varchar(36) NOT NULL, `title` varchar(255) NOT NULL, `description` varchar(255) NULL, `complete` tinyint NOT NULL DEFAULT 0, `estimatedHours` float NOT NULL, `actualHours` float NULL DEFAULT '0', `billedHours` float NOT NULL DEFAULT '0', `projectId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `project` (`id` varchar(36) NOT NULL, `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `lastUpdate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedOn` datetime(6) NULL, `title` varchar(255) NOT NULL, `status` enum ('Lead', 'Quoted', 'In Progress', 'Complete', 'Void') NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_0a308d3578511f26970c693a7e5` FOREIGN KEY (`billingAddressId`) REFERENCES `address`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_2c2cedfbb2f55fe7fc203f97cd7` FOREIGN KEY (`shippingAddressId`) REFERENCES `address`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `address` ADD CONSTRAINT `FK_3d3e29e99d821fd75d7cb117e04` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `invoice_item` ADD CONSTRAINT `FK_553d5aac210d22fdca5c8d48ead` FOREIGN KEY (`invoiceId`) REFERENCES `invoice`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `invoice` ADD CONSTRAINT `FK_f18e9b95fe80b1f554d1cb6c23b` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `project_task` ADD CONSTRAINT `FK_a81f1f3ca71d469236a55e2bcaa` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `project_task` DROP FOREIGN KEY `FK_a81f1f3ca71d469236a55e2bcaa`");
        await queryRunner.query("ALTER TABLE `invoice` DROP FOREIGN KEY `FK_f18e9b95fe80b1f554d1cb6c23b`");
        await queryRunner.query("ALTER TABLE `invoice_item` DROP FOREIGN KEY `FK_553d5aac210d22fdca5c8d48ead`");
        await queryRunner.query("ALTER TABLE `address` DROP FOREIGN KEY `FK_3d3e29e99d821fd75d7cb117e04`");
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_2c2cedfbb2f55fe7fc203f97cd7`");
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_0a308d3578511f26970c693a7e5`");
        await queryRunner.query("DROP TABLE `project`");
        await queryRunner.query("DROP TABLE `project_task`");
        await queryRunner.query("DROP TABLE `invoice`");
        await queryRunner.query("DROP TABLE `invoice_item`");
        await queryRunner.query("DROP TABLE `address`");
        await queryRunner.query("DROP INDEX `REL_2c2cedfbb2f55fe7fc203f97cd` ON `client`");
        await queryRunner.query("DROP INDEX `REL_0a308d3578511f26970c693a7e` ON `client`");
        await queryRunner.query("DROP TABLE `client`");
    }

}
