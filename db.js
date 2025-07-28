import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('sacco.db');

export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT,
        national_id TEXT UNIQUE
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS savings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        member_id INTEGER,
        amount REAL,
        date TEXT
      );`
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS loans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        member_id INTEGER,
        amount REAL,
        total_repayable REAL,
        outstanding REAL,
        status TEXT,
        issue_date TEXT,
        due_date TEXT
      );`
    );
  });
};

export default db;
