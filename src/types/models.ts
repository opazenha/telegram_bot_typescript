export interface Room {
  id: string;
  name: string;
  capacity: number;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface RoomAvailability {
  id: string;
  room_id: string;
  start_time: Date;
  end_time: Date;
  is_available: boolean;
  booked_by?: string;
  booking_reason?: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action_type: string;
  table_name: string;
  record_id: string;
  changes: Record<string, any>;
  created_at: Date;
}
