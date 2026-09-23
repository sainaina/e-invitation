import { execSync } from 'child_process'

export async function GET() {
  try {
    const log = execSync('git log -n 5 --stat', { cwd: process.cwd() }).toString()
    const status = execSync('git status -s', { cwd: process.cwd() }).toString()
    return Response.json({ log, status })
  } catch (e: any) {
    return Response.json({ error: e.message })
  }
}

