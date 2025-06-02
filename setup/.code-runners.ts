import { defineCodeRunnersSetup } from '@slidev/types'
import { exec } from 'child_process'

export default defineCodeRunnersSetup(() => {
  return {
    async go(code, ctx) {
        const result = await runGoLocally(code, ctx);
        return {
            text: result,
        }
    },
    // or other languages, key is the language id
  }
})


function runGoLocally(code: string, ctx: any): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(`go version`, (error: any, stdout: string, stderr: string) => {
            if (error) {
                console.error(`Error executing Go: ${error.message}`);
                resolve(`Error executing Go: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Go stderr: ${stderr}`);
                resolve(`Go stderr: ${stderr}`);
                return;
            }
            console.log(`Go version: ${stdout}`);
            resolve(`Go version: ${stdout}`);
        });
    });
}


        // stdout.write(`Running Go code locally...\n`);
//     return new Promise((resolve, reject) => {
//         const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'goworkshop-'));
//         const filePath = path.join(tmpDir, 'main.go');
//         fs.writeFileSync(filePath, code);

//         exec(`go run "${filePath}"`, { cwd: tmpDir }, (error: any, stdout: string, stderr: string) => {
//             // Clean up temp files
//             fs.rmSync(tmpDir, { recursive: true, force: true });
//             if (error) {
//                 resolve(stderr || error.message);
//             } else {
//                 resolve(stdout);
//             }
//         });
