import {MigrationInterface, QueryRunner} from "typeorm";

export class AddQuotesTable1639537805520 implements MigrationInterface {
    name = 'AddQuotesTable1639537805520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`quote_item\` (\`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`invoiceItemId\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`rate\` float NOT NULL, \`quantity\` float NOT NULL, \`quoteId\` varchar(36) NULL, INDEX \`IDX_25937e3b16c7058eb99eb9cd23\` (\`invoiceItemId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quote\` (\`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`quoteId\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`status\` enum ('Pending', 'Invoiced', 'Lost', 'Void') NOT NULL, \`clientId\` varchar(36) NULL, INDEX \`IDX_88778de0e0cd0f6aa68759539a\` (\`quoteId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`quote_item\` ADD CONSTRAINT \`FK_6296266787152fd91f74cb9d1d1\` FOREIGN KEY (\`quoteId\`) REFERENCES \`quote\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quote\` ADD CONSTRAINT \`FK_8b8c48876f6fdcf3e143c41596b\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quote\` DROP FOREIGN KEY \`FK_8b8c48876f6fdcf3e143c41596b\``);
        await queryRunner.query(`ALTER TABLE \`quote_item\` DROP FOREIGN KEY \`FK_6296266787152fd91f74cb9d1d1\``);
        await queryRunner.query(`DROP INDEX \`IDX_88778de0e0cd0f6aa68759539a\` ON \`quote\``);
        await queryRunner.query(`DROP TABLE \`quote\``);
        await queryRunner.query(`DROP INDEX \`IDX_25937e3b16c7058eb99eb9cd23\` ON \`quote_item\``);
        await queryRunner.query(`DROP TABLE \`quote_item\``);
    }

}
