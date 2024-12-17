import fs from 'fs';
import path from 'path';

export const saveBytesToFile = (bytes: Uint8Array, filename: string) => {
    const buffer = Buffer.from(bytes);
    const dir = path.dirname(filename);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filename, buffer);
};

export const deleteFile = (filename: string) => {
    if (fs.existsSync(filename)) {
        fs.unlinkSync(filename);
    }
};