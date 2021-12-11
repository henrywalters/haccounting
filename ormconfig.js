// noinspection NpmUsedModulesInstalled -- do not need as its required by NestJS itself
require("dotenv").config({path: require("path").resolve(__dirname, "../.env")});

const Config = [
    {
        name: "default",
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        entities: [ "dist/entities/**/*.entity{.ts,.js}" ],
        logging: true,
        synchronize: false,
    },
    {
        name: "cli",
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        logging: true,
        synchronize: false,
        entities: [ "dist/entities/**/*.entity{.ts,.js}" ],
        migrationsTableName: "migrations",
        migrations: [
            "dist/migrations/*.js"
        ],
        cli: {
            "migrationsDir": "src/migrations"
        },
    }
];

module.exports = Config;
