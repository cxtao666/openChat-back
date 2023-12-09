import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

// 这里需要注意window 和 unix 系统的换行符是不一样的
export const readEnv = () => {
  const urlPath = path.join(process.cwd(), './.env');
  const content = fs.readFileSync(urlPath, {
    encoding: 'utf-8',
  });
  content
    .split(os.EOL)
    .filter((item) => {
      return item !== '';
    })
    .forEach((item: string) => {
      const arr = item.split('=');
      process.env[arr[0]] = arr[1];
    });
};
