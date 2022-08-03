import {MigrationInterface, QueryRunner} from "typeorm";

export class AddsPaymentIDToPayment1659566424167 implements MigrationInterface {
    name = 'AddsPaymentIDToPayment1659566424167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a16cbc02eb409da87ede523fe9\` ON \`quote\``);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD \`paymentId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`client\` CHANGE \`invoicePrefix\` \`invoicePrefix\` varchar(255) NOT NULL DEFAULT 2022`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`client\` CHANGE \`invoicePrefix\` \`invoicePrefix\` varchar(255) NOT NULL DEFAULT '2021'`);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP COLUMN \`paymentId\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a16cbc02eb409da87ede523fe9\` ON \`quote\` (\`signatureId\`)`);
    }

}
