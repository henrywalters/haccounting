import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSignatureTable1639546425407 implements MigrationInterface {
    name = 'AddSignatureTable1639546425407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`signature\` (\`timestamp\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`signedName\` varchar(255) NOT NULL, \`signedDate\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`quote\` ADD \`approved\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`quote\` ADD \`signatureId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`quote\` ADD UNIQUE INDEX \`IDX_a16cbc02eb409da87ede523fe9\` (\`signatureId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_610e14c9897634a33bb4c582f0\` ON \`quote_item\` (\`quoteItemId\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_88778de0e0cd0f6aa68759539a\` ON \`quote\` (\`quoteId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a16cbc02eb409da87ede523fe9\` ON \`quote\` (\`signatureId\`)`);
        await queryRunner.query(`ALTER TABLE \`quote_item\` ADD CONSTRAINT \`FK_6296266787152fd91f74cb9d1d1\` FOREIGN KEY (\`quoteId\`) REFERENCES \`quote\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quote\` ADD CONSTRAINT \`FK_8b8c48876f6fdcf3e143c41596b\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quote\` ADD CONSTRAINT \`FK_a16cbc02eb409da87ede523fe9a\` FOREIGN KEY (\`signatureId\`) REFERENCES \`signature\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quote\` DROP FOREIGN KEY \`FK_a16cbc02eb409da87ede523fe9a\``);
        await queryRunner.query(`ALTER TABLE \`quote\` DROP FOREIGN KEY \`FK_8b8c48876f6fdcf3e143c41596b\``);
        await queryRunner.query(`ALTER TABLE \`quote_item\` DROP FOREIGN KEY \`FK_6296266787152fd91f74cb9d1d1\``);
        await queryRunner.query(`DROP INDEX \`REL_a16cbc02eb409da87ede523fe9\` ON \`quote\``);
        await queryRunner.query(`DROP INDEX \`IDX_88778de0e0cd0f6aa68759539a\` ON \`quote\``);
        await queryRunner.query(`DROP INDEX \`IDX_610e14c9897634a33bb4c582f0\` ON \`quote_item\``);
        await queryRunner.query(`ALTER TABLE \`quote\` DROP INDEX \`IDX_a16cbc02eb409da87ede523fe9\``);
        await queryRunner.query(`ALTER TABLE \`quote\` DROP COLUMN \`signatureId\``);
        await queryRunner.query(`ALTER TABLE \`quote\` DROP COLUMN \`approved\``);
        await queryRunner.query(`DROP TABLE \`signature\``);
    }

}
