import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialEntityCreation1615230914157 implements MigrationInterface {
  name = 'initialEntityCreation1615230914157';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, "categoryID" integer NOT NULL, "isFirstDutyStation" boolean NOT NULL, "isFirstTermAirman" boolean NOT NULL, "isOfficer" boolean NOT NULL, "verificationRequired" boolean NOT NULL, "location" character varying NOT NULL, "office" character varying NOT NULL, "pocName" character varying NOT NULL, "pocPhoneNumber" character varying NOT NULL, "pocEmail" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "task"`);
  }
}
