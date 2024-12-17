import { RoomAvailability } from "../types/models";
import * as db from "../db/roomAvailability";

export const checkRoomAvailability = async (roomId: string, startTime: Date, endTime: Date): Promise<[boolean, RoomAvailability[]]> => {
   const roomCheck = await db.getRoomAvailabilityByTimeRange(roomId, startTime, endTime);
   if (roomCheck.length > 0) {
      return [true, roomCheck];
   }
   return [false, []];
};