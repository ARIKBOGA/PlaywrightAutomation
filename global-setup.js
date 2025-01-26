import { existsSync, rmSync } from 'fs';
import { join } from 'path';

export default async () => {
  const foldersToDelete = [
    join(__dirname, 'test-results'),
    join(__dirname, 'videos'),
  ];

  foldersToDelete.forEach(folder => {
    if (existsSync(folder)) {
      rmSync(folder, { recursive: true, force: true });
      console.log(`Deleted all files from: ${folder}`);
    }
  });
};
