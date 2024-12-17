import logger from "../utils/logger";
import config from "../config";
import { TelegramGetFileResponse, TelegramMessage } from "../types/telegram";
import { User } from "../types/models";

export const sendTelegramMessage = async (message: string, chatId: number) => {
   try {
      const response = await fetch("https://api.telegram.org/bot" + config.telegram.token + "/sendMessage", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            chat_id: chatId,
            text: message,
         }),
      });
      const result = await response.json();
      logger.info("Message sent successfully", result);
   } catch (error) {
      logger.error("Error sending message", error);
   }
};

export const getFileInfo = async (fileId: string) => {
   try {
      const response = await fetch("https://api.telegram.org/bot" + config.telegram.token + "/getFile?file_id=" + fileId);
      const result = await response.json() as TelegramGetFileResponse;
      return result.result.file_path;
   } catch (error) {
      logger.error("Error getting file", error);
   }
};

export const downloadFile = async (filePath: string) => {
   try {
      const response = await fetch("https://api.telegram.org/file/bot" + config.telegram.token + "/" + filePath);
      const blob = await response.blob();
      return blob;
   } catch (error) {
      logger.error("Error downloading file", error);
   }
};

export const parseMessageIntoUser = (message: TelegramMessage): User => {
   return {
      telegram_id: message.from.id,
      username: message.from.username,
      first_name: message.from.first_name,
      last_name: message.from.last_name,
      is_admin: false,
      created_at: new Date(),
      updated_at: new Date(),
   } as User;
};