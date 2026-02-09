import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IParticipant } from '../../entities/participant';

export const participantsApi = createApi({
  reducerPath: 'participantsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Participants'],
  endpoints: (builder) => ({
    getParticipants: builder.query<IParticipant[], void>({
      query: () => '/participants',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Participants' as const, id })),
              { type: 'Participants', id: 'LIST' },
            ]
          : [{ type: 'Participants', id: 'LIST' }],
    }),
  }),
});

export const { useGetParticipantsQuery } = participantsApi;
