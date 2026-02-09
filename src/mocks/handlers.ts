import { http, HttpResponse } from 'msw';
import { fakerRU as faker } from '@faker-js/faker';
import type { IApplication } from '../features/entities/applications';
import type { IParticipant } from '../features/entities/participant';
import { ViewEnum } from '../features/entities/applications';
import type { ApplicationStatusType } from '../features/entities/applications/types';

const STATUSES: ApplicationStatusType[] = ['new', 'in_progress', 'completed', 'rejected'];

const РУССКИЕ_ФРАЗЫ: string[] = [
  'Нужна помощь с переездом.',
  'Ищу репетитора по математике.',
  'Требуется консультация юриста.',
  'Предлагаю услуги фотографа.',
  'Ищем няню на выходные.',
  'Нужен мастер по ремонту техники.',
  'Предлагаю доставку продуктов.',
  'Ищу попутчиков в другой город.',
];

const PARTICIPANTS: IParticipant[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
}));

function getApplications(): IApplication[] {
  return Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    participant: faker.helpers.arrayElement(PARTICIPANTS),
    view: {
      id: i + 1,
      type: faker.helpers.arrayElement([ViewEnum.MY, ViewEnum.OTHER]),
    },
    city: faker.location.city(),
    isCheck: faker.datatype.boolean(),
    need: faker.helpers.arrayElement(РУССКИЕ_ФРАЗЫ),
    search: faker.helpers.arrayElement(РУССКИЕ_ФРАЗЫ),
    status: faker.helpers.arrayElement(STATUSES),
  }));
}

let applicationsData = getApplications();

export const handlers = [
  http.get('/api/participants', () => {
    return HttpResponse.json(PARTICIPANTS);
  }),
  http.get('/api/applications', () => {
    if (applicationsData.length === 0) {
      applicationsData = getApplications();
    }
    return HttpResponse.json(applicationsData);
  }),
  http.post('/api/applications', async ({ request }) => {
    const body = (await request.json()) as Omit<IApplication, 'id'>;
    const newApp: IApplication = {
      ...body,
      id: applicationsData.length > 0 ? Math.max(...applicationsData.map((a) => a.id)) + 1 : 1,
    };
    applicationsData = [...applicationsData, newApp];
    return HttpResponse.json(newApp, { status: 201 });
  }),
];
