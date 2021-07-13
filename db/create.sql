CREATE TABLE site_theme (
    id SERIAL PRIMARY KEY,
    theme VARCHAR(255) NOT NULL
);

CREATE TABLE user_theme (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
	theme_id integer,
	CONSTRAINT theme_fk FOREIGN KEY (theme_id) REFERENCES site_theme (id)
);

INSERT INTO site_theme (theme) VALUES ('Dark'), ('Light');
