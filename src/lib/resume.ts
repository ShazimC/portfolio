import { getEntry } from 'astro:content';

export async function getResume() {
  const entry = await getEntry('resume', 'resume');
  if (!entry) throw new Error('Missing `resume` entry in src/content/resume/resume.yaml');
  return entry.data;
}

export function formatMonth(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export function formatRange(start: Date, end?: Date): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`;
}
