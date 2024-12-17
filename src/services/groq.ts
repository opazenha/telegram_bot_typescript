import { convertAudioToMP3 } from "../utils/ffmpeg";
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import config from '../config';

export interface WhisperResponse {
    text: string;
    x_groq: {
        id: string;
    };
}

export async function whisperTranscribe(audioPath: string): Promise<string> {
    await convertAudioToMP3(audioPath);

    const outputPath = path.join(path.dirname(audioPath), 'output.mp3');

    const formData = new FormData();
    formData.append("file", fs.createReadStream(outputPath));
    formData.append("model", "whisper-large-v3-turbo");
    formData.append("temperature", "0");
    formData.append("response_format", "json");
    formData.append("language", "pt");

    console.log('Sending request to transcription API with the following data:');
    // console.log('Form Data:', formData);

    const response = await axios.post("https://api.groq.com/openai/v1/audio/transcriptions", formData, {
        headers: {
            Authorization: `Bearer ${config.groq.apiKey}`,
            ...formData.getHeaders(),
        },
    });

    if (response.status !== 200) {
        throw new Error(`Unexpected status code: ${response.status}, response: ${response.data}`);
    }

    const result: WhisperResponse = response.data;
    return result.text;
}
