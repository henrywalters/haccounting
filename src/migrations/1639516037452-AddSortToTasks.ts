import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSortToTasks1639516037452 implements MigrationInterface {
    name = 'AddSortToTasks1639516037452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project_task\` ADD \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`project_task\` ADD \`lastUpdate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project_task\` DROP COLUMN \`lastUpdate\``);
        await queryRunner.query(`ALTER TABLE \`project_task\` DROP COLUMN \`createdOn\``);
    }

}
