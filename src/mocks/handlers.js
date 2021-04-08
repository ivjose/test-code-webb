import { rest } from 'msw';

export const handlers = [
  rest.post('https://api.jsonbin.io/v3/b', (req, res, ctx) => {
    return res(
      ctx.json({
        record: {
          first_name: 'John',
          last_name: 'Doe',
          email_address: 'jonDoe@email.com',
          birthdate: '12-21-2001',
          passport: 'ad123123',
          workplaces: [
            {
              id: 1,
              start_date: '12-01-2020',
              end_date: '02-28-2021',
              company: 'Google',
              country: 'Philippines',
            },
          ],
        },
        metadata: {
          id: '606eba269c59a9732caf6985',
          createdAt: '2021-04-08T08:09:10.774Z',
          private: true,
          name: 'workbook',
          collectionId: '606c208163976918647471da',
        },
      })
    );
  }),
];
