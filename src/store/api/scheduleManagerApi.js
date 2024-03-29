import queryString from 'query-string';

import {api} from './api';

export const scheduleManagerApi = api.injectEndpoints({
  endpoints: builder => ({
    listSchedule: builder.query({
      query: (start = new Date(), end = undefined) => {
        const timeRangeQuery = queryString.stringify({
          startTime: start.valueOf(),
          endTime: end ? end.valueOf() : undefined,
        });
        return `schedule?${timeRangeQuery}`;
      },
      transformResponse: (response, meta, args) => response.schedules,
      providesTags: result => {
        return [
          ...(result ?? []).map(({_id}) => ({type: 'Schedules', id: _id})),
          {type: 'Schedules', id: 'LIST'},
        ];
      },
    }),
    createSchedule: builder.mutation({
      query: schedule => ({
        url: 'schedule/',
        method: 'POST',
        body: schedule,
      }),
      invalidatesTags: [{type: 'Schedules', id: 'LIST'}],
    }),
    updateSchedule: builder.mutation({
      query: (scheduleId, schedule) => ({
        url: `schedule/${scheduleId}`,
        method: 'POST',
        body: schedule,
      }),
      invalidatesTags: result => [{type: 'Schedules', id: result.schedule.id}],
    }),
    deleteSchedule: builder.mutation({
      query: id => ({
        url: `schedule/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: result => [{type: 'Schedules', id: result.scheduleId}],
    }),
  }),
});

export const {
  useListScheduleQuery,
  useLazyListScheduleQuery,
  useCreateScheduleMutation,
  useDeleteScheduleMutation,
} = scheduleManagerApi;
