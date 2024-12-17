import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

export const convertAudioToMP3 = (filePath: string) => {
   ffmpeg.setFfmpegPath('/usr/bin/ffmpeg');

   return new Promise((resolve, reject) => {
      console.log('Input file path:', filePath);
      const outputPath = path.join(path.dirname(filePath), 'output.mp3');
      console.log('Output file path:', outputPath);

      ffmpeg()
         .input(filePath)
         .toFormat('mp3')
         .audioCodec('libmp3lame')
         .audioBitrate('128k')
         .output(outputPath)
         .on('end', () => {
            console.log('Conversion finished');
            resolve(true);
         })
         .on('error', (err) => {
            console.error('An error occurred:', err);
            reject(err);
         })
         .run();
   });
};