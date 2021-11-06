import * as path from 'path';
import * as fs from 'fs';

export const readEnv = () => {
  const urlPath = path.join(process.cwd(), './.env');
  const content = fs.readFileSync(urlPath, {
    encoding: 'utf-8',
  });
  content
    .split('\r\n')
    .filter((item) => {
      return item !== '';
    })
    .forEach((item: string) => {
      const arr = item.split('=');
      process.env[arr[0]] = arr[1];
    });
};
