import { getCollection, type CollectionEntry } from 'astro:content';

export type Role = CollectionEntry<'experience'>['data'] & { id: string };

export interface Company {
  name: string;
  roles: Role[];
}

/** Roles newest first, grouped by consecutive company so promotions read as one stint. */
export async function getCompanies(): Promise<Company[]> {
  const roles = (await getCollection('experience'))
    .map(({ id, data }) => ({ id, ...data }))
    .sort((a, b) => b.start.valueOf() - a.start.valueOf());

  return roles.reduce<Company[]>((companies, role) => {
    const last = companies.at(-1);
    if (last?.name === role.company) last.roles.push(role);
    else companies.push({ name: role.company, roles: [role] });
    return companies;
  }, []);
}

export async function getProjects() {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => (b.data.start?.valueOf() ?? 0) - (a.data.start?.valueOf() ?? 0));
}

export async function getAwards() {
  const awards = await getCollection('awards');
  return awards.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatMonth(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export function formatRange(start: Date, end?: Date): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`;
}
