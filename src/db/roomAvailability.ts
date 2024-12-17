import { RoomAvailability } from '../types/models';
import db from './index';

export const createRoomAvailability = async (roomAvailability: RoomAvailability): Promise<RoomAvailability> => {
   const result = await db.query<RoomAvailability>(
      'INSERT INTO room_availability (room_id, start_time, end_time, is_available, booked_by, booking_reason, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
         roomAvailability.room_id,
         roomAvailability.start_time,
         roomAvailability.end_time,
         roomAvailability.is_available,
         roomAvailability.booked_by,
         roomAvailability.booking_reason,
         roomAvailability.created_at,
         roomAvailability.updated_at,
      ]
   );
   return result.rows[0];
};

export const updateRoomAvailability = async (roomAvailability: RoomAvailability): Promise<RoomAvailability> => {
   const result = await db.query<RoomAvailability>(
      'UPDATE room_availability SET room_id = $2, start_time = $3, end_time = $4, is_available = $5, booked_by = $6, booking_reason = $7, updated_at = $8 WHERE id = $1 RETURNING *',
      [
         roomAvailability.id,
         roomAvailability.room_id,
         roomAvailability.start_time,
         roomAvailability.end_time,
         roomAvailability.is_available,
         roomAvailability.booked_by,
         roomAvailability.booking_reason,
         roomAvailability.updated_at,
      ]
   );
   return result.rows[0];
};

export const getRoomAvailabilityById = async (id: string): Promise<RoomAvailability | null> => {
   const result = await db.query<RoomAvailability>('SELECT * FROM room_availability WHERE id = $1', [id]);
   return result.rows[0] || null;
};

export const getAllRoomAvailability = async (): Promise<RoomAvailability[]> => {
   const result = await db.query<RoomAvailability>('SELECT * FROM room_availability');
   return result.rows;
};

export const deleteRoomAvailabilityById = async (id: string): Promise<void> => {
   await db.query('DELETE FROM room_availability WHERE id = $1', [id]);
};

export const deleteRoomAvailabilityByRoomId = async (roomId: string): Promise<void> => {
   await db.query('DELETE FROM room_availability WHERE room_id = $1', [roomId]);
};

export const getRoomAvailabilityByBookedBy = async (bookedBy: string): Promise<RoomAvailability[]> => {
   const result = await db.query<RoomAvailability>(
      'SELECT * FROM room_availability WHERE booked_by = $1 AND is_available = true',
      [bookedBy]
   );
   return result.rows;
};

export const getRoomAvailabilityByTimeRange = async (room_id: string, startDate: Date, endDate: Date): Promise<RoomAvailability[]> => {
   const result = await db.query<RoomAvailability>(
      'SELECT * FROM room_availability WHERE start_time >= $1 AND end_time <= $2 AND room_id = $3',
      [startDate, endDate, room_id]
   );
   return result.rows;
};