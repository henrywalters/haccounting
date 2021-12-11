import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPayment1639251180717 implements MigrationInterface {
    name = 'AddPayment1639251180717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `payment` (`timestamp` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id` varchar(36) NOT NULL, `amount` float NOT NULL, `clientId` varchar(36) NULL, `invoiceId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `payment` ADD CONSTRAINT `FK_bbbabef6ffa9572acb68cb0f217` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `payment` ADD CONSTRAINT `FK_87223c7f1d4c2ca51cf69927844` FOREIGN KEY (`invoiceId`) REFERENCES `invoice`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `payment` DROP FOREIGN KEY `FK_87223c7f1d4c2ca51cf69927844`");
        await queryRunner.query("ALTER TABLE `payment` DROP FOREIGN KEY `FK_bbbabef6ffa9572acb68cb0f217`");
        await queryRunner.query("DROP TABLE `payment`");
    }

}
