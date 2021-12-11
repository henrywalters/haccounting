import {MigrationInterface, QueryRunner} from "typeorm";

export class AddInvoiceId1639249279319 implements MigrationInterface {
    name = 'AddInvoiceId1639249279319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `invoice_item` ADD `invoiceItemId` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `invoice` ADD `invoiceId` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `invoice_item` DROP FOREIGN KEY `FK_553d5aac210d22fdca5c8d48ead`");
        await queryRunner.query("ALTER TABLE `invoice_item` CHANGE `id` `id` varchar(36) NOT NULL");
        await queryRunner.query("ALTER TABLE `invoice_item` DROP COLUMN `invoiceId`");
        await queryRunner.query("ALTER TABLE `invoice_item` ADD `invoiceId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `invoice` CHANGE `id` `id` varchar(36) NOT NULL");
        await queryRunner.query("CREATE INDEX `IDX_fa82eb7a43872a13fcb9aa36fb` ON `invoice_item` (`invoiceItemId`)");
        await queryRunner.query("CREATE INDEX `IDX_c7e255ecd0c1a5ba5cb11e959a` ON `invoice` (`invoiceId`)");
        await queryRunner.query("ALTER TABLE `invoice_item` ADD CONSTRAINT `FK_553d5aac210d22fdca5c8d48ead` FOREIGN KEY (`invoiceId`) REFERENCES `invoice`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `invoice_item` DROP FOREIGN KEY `FK_553d5aac210d22fdca5c8d48ead`");
        await queryRunner.query("DROP INDEX `IDX_c7e255ecd0c1a5ba5cb11e959a` ON `invoice`");
        await queryRunner.query("DROP INDEX `IDX_fa82eb7a43872a13fcb9aa36fb` ON `invoice_item`");
        await queryRunner.query("ALTER TABLE `invoice` CHANGE `id` `id` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `invoice_item` DROP COLUMN `invoiceId`");
        await queryRunner.query("ALTER TABLE `invoice_item` ADD `invoiceId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `invoice_item` CHANGE `id` `id` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `invoice_item` ADD CONSTRAINT `FK_553d5aac210d22fdca5c8d48ead` FOREIGN KEY (`invoiceId`) REFERENCES `invoice`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `invoice` DROP COLUMN `invoiceId`");
        await queryRunner.query("ALTER TABLE `invoice_item` DROP COLUMN `invoiceItemId`");
    }

}
