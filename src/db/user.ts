import { User } from '../types/models';
import db from './index';

export const getUser = async (telegramId: number): Promise<User | null> => {
   const result = await db.query<User>('SELECT * FROM users WHERE telegram_id = $1', [telegramId]);
   return result.rows[0] || null;
};

export const createUser = async (user: User): Promise<User> => {
   const result = await db.query<User>(
      'INSERT INTO users (telegram_id, username, first_name, last_name, is_admin, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
         user.telegram_id,
         user.username,
         user.first_name,
         user.last_name,
         user.is_admin,
         user.created_at,
         user.updated_at,
      ]
   );
   return result.rows[0];
};

export const updateUser = async (user: User): Promise<User> => {
   const result = await db.query<User>(
      'UPDATE users SET username = $2, first_name = $3, last_name = $4, is_admin = $5, updated_at = $6 WHERE id = $1 RETURNING *',
      [user.id, user.username, user.first_name, user.last_name, user.is_admin, user.updated_at]
   );
   return result.rows[0];
};

export const getAllUsers = async (): Promise<User[]> => {
   const result = await db.query<User>('SELECT * FROM users');
   return result.rows;
};

export const getUserById = async (id: string): Promise<User | null> => {
   const result = await db.query<User>('SELECT * FROM users WHERE id = $1', [id]);
   return result.rows[0] || null;
};

export const getUserByTelegramId = async (telegramId: number): Promise<User | null> => {
   const result = await db.query<User>('SELECT * FROM users WHERE telegram_id = $1', [telegramId]);
   return result.rows[0] || null;
};

export const deleteUserByTelegramId = async (telegramId: number): Promise<void> => {
   await db.query('DELETE FROM users WHERE telegram_id = $1', [telegramId]);
};