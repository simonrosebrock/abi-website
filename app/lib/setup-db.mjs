import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { sql } from "@vercel/postgres";

async function setupDB() {
    try {
        console.log("Creating tables...");

        await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`

        await sql`
        CREATE TABLE users (
            token UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            username VARCHAR(255) UNIQUE NOT NULL,
            password TEXT NOT NULL
        );
        `;

        await sql`
        CREATE TABLE termine (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            title VARCHAR(255) NOT NULL,
            description TEXT,
            ort VARCHAR(255),
            date DATE NOT NULL,
            start_time TIME NOT NULL,
            end_time TIME NOT NULL,
            helfer JSONB
        );
        `;


        // mottos
        await sql`
        CREATE TABLE mottos (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            type TEXT UNIQUE NOT NULL,
            title TEXT,
            addition TEXT,
            date TEXT
        );
        `;

        const mottosToInsert = ["montag", "dienstag", "mittwoch", "donnerstag", "freitag", "abimotto"]
        for (const motto of mottosToInsert) {
            await sql`
                INSERT INTO features (type, title, addition, date)
                VALUES (${motto}, ${""}, ${""}, ${""});
            `;
        }


        // finanzen
        await sql`
        CREATE TABLE finanzen (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name TEXT NOT NULL,
            value INTEGER NOT NULL,
            type TEXT NOT NULL
        );
        `;

        const finanzenToInsert = [
            {name: "einnahmen", value: 0, type: "general"},
            {name: "customcardprice", value: 0, type: "general"},
            {name: "customziel", value: 0, type: "general"},
            {name: "guestcount", value: 0, type: "general"}
        ]

        for (const finanz of finanzenToInsert) {
            await sql`
                INSERT INTO features (name, value, type)
                VALUES (${finanz.name}, ${finanz.value}, ${finanz.type});
            `;
        }



        // adding features
        await sql`
        CREATE TABLE features (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            feature TEXT UNIQUE NOT NULL,
            value BOOLEAN NOT NULL,
            type TEXT NOT NULL
        );
        `;

        const featuresToInsert = [
            { feature: 'finanzen', value: true, type: 'general' },
            { feature: 'abipulli', value: true, type: 'mottos' },
            { feature: 'Mottowoche Homepage', value: true, type: 'homepage' },
            { feature: 'mottowoche', value: true, type: 'mottos' },
            { feature: 'fotos', value: true, type: 'general' },
            { feature: 'Kosten pro Person', value: true, type: 'finanzen' },
            { feature: 'mottos', value: true, type: 'general' },
            { feature: 'Einnahmeziel', value: true, type: 'finanzen' },
            { feature: 'Abimotto Homepage', value: true, type: 'homepage' },
            { feature: 'Kartenpreis', value: true, type: 'finanzen' },
            { feature: 'Fixkosten', value: true, type: 'finanzen' },
            { feature: 'vorschläge', value: true, type: 'general' },
            { feature: 'termine', value: true, type: 'general' },
            { feature: 'abimotto', value: true, type: 'mottos' },
            { feature: 'Nächster Termin Dashbo...', value: true, type: 'dashboard' },
        ];
      
        for (const feature of featuresToInsert) {
        await sql`
            INSERT INTO features (feature, value, type)
            VALUES (${feature.feature}, ${feature.value}, ${feature.type});
        `;
        }

        // vorschläge
        await sql`
        CREATE TABLE kategorien (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name TEXT NOT NULL,
            enabled BOOLEAN NOT NULL
        );
        `;

        await sql`
        CREATE TABLE vorschläge (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            kategorie_id UUID,
            author_token UUID,
            vorschlag TEXT NOT NULL,
            FOREIGN KEY (kategorie_id) REFERENCES kategorien(id) ON DELETE CASCADE,
            FOREIGN KEY (author_token) REFERENCES users(token) ON DELETE CASCADE
        );
        `;

        await sql`
        CREATE TABLE likes (
            vorschlag_id UUID,
            schüler_token UUID,
            PRIMARY KEY (vorschlag_id, schüler_token),
            FOREIGN KEY (vorschlag_id) REFERENCES vorschläge(id) ON DELETE CASCADE,
            FOREIGN KEY (schüler_token) REFERENCES users(token) ON DELETE CASCADE
        );
        `;

        console.log("Tables created successfully!");
    } catch (error) {
        console.error("Error setting up database:", error);
    }
  }
  
  setupDB();