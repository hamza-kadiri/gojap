/* Migrate USER table */
ALTER TABLE "user" DROP CONSTRAINT user_email_key;
ALTER TABLE "user" DROP CONSTRAINT user_phone_key;
ALTER TABLE "user" ALTER COLUMN phone DROP NOT NULL;
ALTER TABLE "user" ADD COLUMN avatar_url VARCHAR(120);

/* Migrate JAP_EVENT table */
ALTER TABLE jap_event RENAME COLUMN nom TO event_name;
ALTER TABLE jap_event ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW();
ALTER TABLE jap_event ADD COLUMN creator_id INTEGER REFERENCES "user"(id);

/* MIGRATE JAP_PLACE table */
ALTER TABLE jap_place RENAME COLUMN nom TO name;

/* Migrate TABLE table */
DELETE FROM "table_users" WHERE 1=1;
DELETE FROM "table" WHERE 1=1;
ALTER TABLE "table" ADD COLUMN status BOOLEAN;
ALTER TABLE "table" ALTER COLUMN emperor TYPE INTEGER USING emperor::integer;
ALTER TABLE "table" ADD FOREIGN KEY (emperor) REFERENCES "user"(id);
INSERT INTO "table" (emperor, jap_event_id) VALUES (2, 3);
INSERT INTO "table_users" (table_id, user_id) VALUES (1, 1), (1, 2), (1, 3), (1, 6), (1, 7);