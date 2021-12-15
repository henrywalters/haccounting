import {MigrationInterface, QueryRunner} from "typeorm";

export class FixQuoteStatus1639538509128 implements MigrationInterface {
    name = 'FixQuoteStatus1639538509128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_25937e3b16c7058eb99eb9cd23\` ON \`quote_item\``);
        await queryRunner.query(`ALTER TABLE \`quote_item\` CHANGE \`invoiceItemId\` \`quoteItemId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`quote_item\` DROP COLUMN \`quoteItemId\``);
        await queryRunner.query(`ALTER TABLE \`quote_item\` ADD \`quoteItemId\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_610e14c9897634a33bb4c582f0\` ON \`quote_item\` (\`quoteItemId\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_610e14c9897634a33bb4c582f0\` ON \`quote_item\``);
        await queryRunner.query(`ALTER TABLE \`quote_item\` DROP COLUMN \`quoteItemId\``);
        await queryRunner.query(`ALTER TABLE \`quote_item\` ADD \`quoteItemId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`quote_item\` CHANGE \`quoteItemId\` \`invoiceItemId\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_25937e3b16c7058eb99eb9cd23\` ON \`quote_item\` (\`invoiceItemId\`)`);
    }

}
