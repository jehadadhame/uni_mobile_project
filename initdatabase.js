import { SQLiteDatabase } from "expo-sqlite";
/** 
 * @param {SQLiteDatabase} db 
 */
export const initializeDatabase = async (db) => {
    // Create a table for users
    try {

        await db.execAsync(`
            -- USERS
            DROP TABLE IF EXISTS users;
            CREATE TABLE users (
                uid TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                photoURL TEXT,
                role TEXT CHECK(role IN ('user', 'admin')) NOT NULL DEFAULT 'user'
            );

            -------------------------------------------------------

            -- ITEMS

            DROP TABLE IF EXISTS items;
            CREATE TABLE items (
                itemId TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                price REAL NOT NULL,
                category TEXT,
                description TEXT,
                condition TEXT,
                createdAt INTEGER NOT NULL,
                status TEXT CHECK(status IN ('active', 'sold', 'archived')) DEFAULT 'active',
                userId TEXT NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(uid)
            );

            -- IMAGES for each item (since SQLite has no array type)
            DROP TABLE IF EXISTS item_images;
            CREATE TABLE item_images (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                itemId TEXT NOT NULL,
                imageURL TEXT NOT NULL,
                FOREIGN KEY (itemId) REFERENCES items(itemId)
            );

            -------------------------------------------------------

            -- CHATS
            DROP TABLE IF EXISTS chats;
            CREATE TABLE chats (
                chatId TEXT PRIMARY KEY
            );

            -- CHAT PARTICIPANTS (many-to-many table)
            DROP TABLE IF EXISTS chat_users;
            CREATE TABLE chat_users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                chatId TEXT NOT NULL,
                userId TEXT NOT NULL,
                FOREIGN KEY (chatId) REFERENCES chats(chatId),
                FOREIGN KEY (userId) REFERENCES users(uid)
            );

            -- MESSAGES
            DROP TABLE IF EXISTS messages;
            CREATE TABLE messages (
                messageId TEXT PRIMARY KEY,
                chatId TEXT NOT NULL,
                senderId TEXT NOT NULL,
                text TEXT,
                createdAt INTEGER NOT NULL,
                FOREIGN KEY (chatId) REFERENCES chats(chatId),
                FOREIGN KEY (senderId) REFERENCES users(uid)
            );

            -------------------------------------------------------

            -- FAVORITES (each user can save many items)
            DROP TABLE IF EXISTS favorites;
            CREATE TABLE favorites (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId TEXT NOT NULL,
                itemId TEXT NOT NULL,
                savedAt INTEGER NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(uid),
                FOREIGN KEY (itemId) REFERENCES items(itemId),
                UNIQUE(userId, itemId) -- each item can be saved once per user
            );
    `);
    } catch (error) {
        console.error("Error initializing database:", error);
    }
};