import { spawn } from 'node:child_process';

const args = process.argv.slice(2);
const portFlag = args.findIndex((arg) => arg === '-p' || arg === '--port');
const port = portFlag >= 0 ? args[portFlag + 1] : '4200';

const child = spawn('ng.cmd', ['serve', '--port', port, '--host', '127.0.0.1'], {
  cwd: process.cwd(),
  shell: true,
  stdio: 'inherit',
});

child.on('exit', (code) => process.exit(code ?? 0));
