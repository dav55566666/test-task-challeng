import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IApplication } from '../../entities/applications';

export const applicationsApi = createApi({
  reducerPath: 'applicationsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Applications'],
  endpoints: (builder) => ({
    getApplications: builder.query<IApplication[], void>({
      query: () => '/applications',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Applications' as const, id })),
              { type: 'Applications', id: 'LIST' },
            ]
          : [{ type: 'Applications', id: 'LIST' }],
    }),
    createApplication: builder.mutation<IApplication, Omit<IApplication, 'id'>>({
      query: (body) => ({
        url: '/applications',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Applications', id: 'LIST' }],
    }),
  }),
});

export const { useGetApplicationsQuery, useCreateApplicationMutation } = applicationsApi;
