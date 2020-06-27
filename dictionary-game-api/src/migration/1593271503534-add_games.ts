import {MigrationInterface, QueryRunner} from "typeorm";

export class addGames1593271503534 implements MigrationInterface {
    name = 'addGames1593271503534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "status" character varying(300) NOT NULL, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game_users_user" ("gameId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_62c499ba2e332c75509806a5ae7" PRIMARY KEY ("gameId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_18b373498a08ccdb4991621346" ON "game_users_user" ("gameId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1ee59806810ce428fa196a6120" ON "game_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "game_users_user" ADD CONSTRAINT "FK_18b373498a08ccdb49916213460" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game_users_user" ADD CONSTRAINT "FK_1ee59806810ce428fa196a61203" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game_users_user" DROP CONSTRAINT "FK_1ee59806810ce428fa196a61203"`);
        await queryRunner.query(`ALTER TABLE "game_users_user" DROP CONSTRAINT "FK_18b373498a08ccdb49916213460"`);
        await queryRunner.query(`DROP INDEX "IDX_1ee59806810ce428fa196a6120"`);
        await queryRunner.query(`DROP INDEX "IDX_18b373498a08ccdb4991621346"`);
        await queryRunner.query(`DROP TABLE "game_users_user"`);
        await queryRunner.query(`DROP TABLE "game"`);
    }

}
