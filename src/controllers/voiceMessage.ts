import { TelegramMessage } from "../types/telegram";
import logger from "../utils/logger";
import { getFileInfo } from "../services/telegram";
import { downloadFile } from "../services/telegram";
import { saveBytesToFile } from "../utils/fileHandler";
import { whisperTranscribe } from "../services/groq";
import { makeGeminiCall } from "../services/gemini";
import { sendTelegramMessage } from "../services/telegram";
import path from 'path';
import { deleteFile } from "../utils/fileHandler"; // Added import statement

export const handleVoiceMessage = async(message: TelegramMessage) => {
   if (!message.voice) {
       console.error('No voice message found');
       return;
   }

   getFileInfo(message.voice.file_id).then((filePath) => {
      if (!filePath) {
         logger.error('Failed to get file path from Telegram');
         return;
      }
      downloadFile(filePath).then(async (file) => {
         let downloadPath: string;
         const outputPath = path.join(__dirname, '../../downloads/voice/output.mp3');
         
         if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const byteArray = new Uint8Array(arrayBuffer);
            downloadPath = path.join(__dirname, '../../downloads/voice', path.basename(filePath));
            saveBytesToFile(byteArray, downloadPath);
         } else {
            logger.error('Downloaded file is undefined');
         }
         
         const audioPath = path.join(__dirname, '../../downloads/' + filePath);
         whisperTranscribe(audioPath).then((result) => {
            makeGeminiCall(result).then((response) => {
               sendTelegramMessage(response, message.chat.id);
            });
            deleteFile(outputPath);
            deleteFile(audioPath);
         }).catch(error => {
            logger.error('Error transcribing voice message:', error);
         });
         
         
      }).catch(error => {
         logger.error('Error downloading file:', error);
      });
   }).catch(error => {
      logger.error('Error getting file info:', error);
   });
}