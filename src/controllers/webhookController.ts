// src/controllers/webhookController.ts
import { Request, Response } from 'express';
import logger from '../utils/logger';
import { TelegramMessage } from '../types/telegram';
import { sendTelegramMessage } from '../services/telegram';
import { makeGeminiCall } from '../services/gemini';
import { handleVoiceMessage } from './voiceMessage';
import * as db from '../db/user';
import { parseMessageIntoUser } from '../services/telegram';

export const handleWebhook = async (req: Request, res: Response) => {
    try {
        const body = req.body.message || req.body;
        if (!body) {
            logger.error('Invalid webhook data: missing update data');
            return res.status(400).json({ message: 'Bad Request: Missing update data' });
        }

        const message = body as unknown as TelegramMessage;
        logger.info('Webhook message: ', message);

        let user = await db.getUserByTelegramId(message.from.id);
        if (!user) {
            user = parseMessageIntoUser(message);
            await db.createUser(user);
        }

        if (message.voice) {
            handleVoiceMessage(message);
        }
        if (message.text) {
            makeGeminiCall(message.text).then((result) => {
                sendTelegramMessage(result, message.chat.id);
            });
        }

        res.status(200).send('Webhook processed');
    } catch (error) {
        logger.error('Error processing webhook', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};