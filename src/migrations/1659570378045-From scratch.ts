import {MigrationInterface, QueryRunner} from "typeorm";

export class FromScratch1659570378045 implements MigrationInterface {
    name = 'FromScratch1659570378045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`client\` (\`id\` varchar(36) NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`rate\` float NOT NULL, \`contactName\` varchar(255) NULL, \`contactEmail\` varchar(255) NULL, \`phone\` varchar(255) NOT NULL, \`stripeId\` varchar(255) NULL, \`invoicePrefix\` varchar(255) NOT NULL DEFAULT 2022, \`billingAddressId\` varchar(36) NULL, \`shippingAddressId\` varchar(36) NULL, UNIQUE INDEX \`REL_0a308d3578511f26970c693a7e\` (\`billingAddressId\`), UNIQUE INDEX \`REL_2c2cedfbb2f55fe7fc203f97cd\` (\`shippingAddressId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` varchar(36) NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`streetAddress\` varchar(255) NOT NULL, \`unitType\` varchar(255) NULL, \`unitNumber\` varchar(255) NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`zipCode\` varchar(255) NOT NULL, \`clientId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`invoice_item\` (\`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`invoiceItemId\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`rate\` float NOT NULL, \`quantity\` float NOT NULL, \`invoiceId\` varchar(36) NULL, INDEX \`IDX_fa82eb7a43872a13fcb9aa36fb\` (\`invoiceItemId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment\` (\`timestamp\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`paymentId\` varchar(255) NOT NULL, \`amount\` float NOT NULL, \`clientId\` varchar(36) NULL, \`invoiceId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`invoice\` (\`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`invoiceId\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`amountPaid\` float NOT NULL DEFAULT '0', \`status\` enum ('Invoiced', 'Paid', 'Void') NOT NULL, \`clientId\` varchar(36) NULL, INDEX \`IDX_c7e255ecd0c1a5ba5cb11e959a\` (\`invoiceId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` varchar(36) NOT NULL, \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`lastUpdate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedOn\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`status\` enum ('Lead', 'Quoted', 'In Progress', 'Complete', 'Void') NOT NULL, \`clientId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_task\` (\`id\` varchar(36) NOT NULL, \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`lastUpdate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`complete\` tinyint NOT NULL DEFAULT 0, \`estimatedHours\` float NOT NULL, \`actualHours\` float NULL DEFAULT '0', \`billedHours\` float NOT NULL DEFAULT '0', \`projectId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`logged_hours\` (\`timestamp\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`hours\` float NOT NULL DEFAULT '0', \`notes\` text NOT NULL, \`taskId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quote_item\` (\`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`quoteItemId\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`rate\` float NOT NULL, \`quantity\` float NOT NULL, \`quoteId\` varchar(36) NULL, INDEX \`IDX_610e14c9897634a33bb4c582f0\` (\`quoteItemId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`signature\` (\`timestamp\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`signedName\` varchar(255) NOT NULL, \`signedDate\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quote\` (\`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`quoteId\` varchar(255) NOT NULL, \`date\` datetime NOT NULL, \`status\` enum ('Pending', 'Invoiced', 'Lost', 'Void') NOT NULL, \`approved\` tinyint NOT NULL DEFAULT 0, \`clientId\` varchar(36) NULL, \`signatureId\` varchar(36) NULL, INDEX \`IDX_88778de0e0cd0f6aa68759539a\` (\`quoteId\`), UNIQUE INDEX \`REL_a16cbc02eb409da87ede523fe9\` (\`signatureId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`client\` ADD CONSTRAINT \`FK_0a308d3578511f26970c693a7e5\` FOREIGN KEY (\`billingAddressId\`) REFERENCES \`address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`client\` ADD CONSTRAINT \`FK_2c2cedfbb2f55fe7fc203f97cd7\` FOREIGN KEY (\`shippingAddressId\`) REFERENCES \`address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_3d3e29e99d821fd75d7cb117e04\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoice_item\` ADD CONSTRAINT \`FK_553d5aac210d22fdca5c8d48ead\` FOREIGN KEY (\`invoiceId\`) REFERENCES \`invoice\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_bbbabef6ffa9572acb68cb0f217\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_87223c7f1d4c2ca51cf69927844\` FOREIGN KEY (\`invoiceId\`) REFERENCES \`invoice\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`invoice\` ADD CONSTRAINT \`FK_f18e9b95fe80b1f554d1cb6c23b\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_816f608a9acf4a4314c9e1e9c66\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_task\` ADD CONSTRAINT \`FK_a81f1f3ca71d469236a55e2bcaa\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`logged_hours\` ADD CONSTRAINT \`FK_f411248c83bd9c4ce66dd864919\` FOREIGN KEY (\`taskId\`) REFERENCES \`project_task\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quote_item\` ADD CONSTRAINT \`FK_6296266787152fd91f74cb9d1d1\` FOREIGN KEY (\`quoteId\`) REFERENCES \`quote\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quote\` ADD CONSTRAINT \`FK_8b8c48876f6fdcf3e143c41596b\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quote\` ADD CONSTRAINT \`FK_a16cbc02eb409da87ede523fe9a\` FOREIGN KEY (\`signatureId\`) REFERENCES \`signature\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quote\` DROP FOREIGN KEY \`FK_a16cbc02eb409da87ede523fe9a\``);
        await queryRunner.query(`ALTER TABLE \`quote\` DROP FOREIGN KEY \`FK_8b8c48876f6fdcf3e143c41596b\``);
        await queryRunner.query(`ALTER TABLE \`quote_item\` DROP FOREIGN KEY \`FK_6296266787152fd91f74cb9d1d1\``);
        await queryRunner.query(`ALTER TABLE \`logged_hours\` DROP FOREIGN KEY \`FK_f411248c83bd9c4ce66dd864919\``);
        await queryRunner.query(`ALTER TABLE \`project_task\` DROP FOREIGN KEY \`FK_a81f1f3ca71d469236a55e2bcaa\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_816f608a9acf4a4314c9e1e9c66\``);
        await queryRunner.query(`ALTER TABLE \`invoice\` DROP FOREIGN KEY \`FK_f18e9b95fe80b1f554d1cb6c23b\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_87223c7f1d4c2ca51cf69927844\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_bbbabef6ffa9572acb68cb0f217\``);
        await queryRunner.query(`ALTER TABLE \`invoice_item\` DROP FOREIGN KEY \`FK_553d5aac210d22fdca5c8d48ead\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_3d3e29e99d821fd75d7cb117e04\``);
        await queryRunner.query(`ALTER TABLE \`client\` DROP FOREIGN KEY \`FK_2c2cedfbb2f55fe7fc203f97cd7\``);
        await queryRunner.query(`ALTER TABLE \`client\` DROP FOREIGN KEY \`FK_0a308d3578511f26970c693a7e5\``);
        await queryRunner.query(`DROP INDEX \`REL_a16cbc02eb409da87ede523fe9\` ON \`quote\``);
        await queryRunner.query(`DROP INDEX \`IDX_88778de0e0cd0f6aa68759539a\` ON \`quote\``);
        await queryRunner.query(`DROP TABLE \`quote\``);
        await queryRunner.query(`DROP TABLE \`signature\``);
        await queryRunner.query(`DROP INDEX \`IDX_610e14c9897634a33bb4c582f0\` ON \`quote_item\``);
        await queryRunner.query(`DROP TABLE \`quote_item\``);
        await queryRunner.query(`DROP TABLE \`logged_hours\``);
        await queryRunner.query(`DROP TABLE \`project_task\``);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP INDEX \`IDX_c7e255ecd0c1a5ba5cb11e959a\` ON \`invoice\``);
        await queryRunner.query(`DROP TABLE \`invoice\``);
        await queryRunner.query(`DROP TABLE \`payment\``);
        await queryRunner.query(`DROP INDEX \`IDX_fa82eb7a43872a13fcb9aa36fb\` ON \`invoice_item\``);
        await queryRunner.query(`DROP TABLE \`invoice_item\``);
        await queryRunner.query(`DROP TABLE \`address\``);
        await queryRunner.query(`DROP INDEX \`REL_2c2cedfbb2f55fe7fc203f97cd\` ON \`client\``);
        await queryRunner.query(`DROP INDEX \`REL_0a308d3578511f26970c693a7e\` ON \`client\``);
        await queryRunner.query(`DROP TABLE \`client\``);
    }

}
