import { useState, useCallback } from 'react';
import AlertDisplay from '../components/AlertDisplay';

const workPlaces = [
  {
    id: 1,
    start_date: '12-01-2020',
    end_date: '02-28-2021',
    company: 'Google',
    country: 'Philippines',
  },
  {
    id: 2,
    start_date: '02-01-2021',
    end_date: '03-30-2021',
    company: 'Facebook',
    country: 'Japan',
  },
  {
    id: 3,
    start_date: '03-01-2021',
    end_date: '05-30-2021',
    company: 'Amazon',
    country: 'USA',
  },
  {
    id: 4,
    start_date: '04-01-2021',
    end_date: '06-30-2021',
    company: 'Tesla',
    country: 'Taiwan',
  },
];

function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
  if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
  if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
  if (b_start < a_start && a_end < b_end) return true; // a in b
  return false;
}

const WorkPlaceList = ({ workplaces, setWorkplaces }) => {
  const [error, setError] = useState(false);

  const handleSelectWorkplace = useCallback(
    (workPlace) => {
      const forDelete = workplaces.some((item) => item.id === workPlace.id);

      if (forDelete) {
        const newWorkplace = [...workplaces].filter(
          (item) => item.id !== workPlace.id
        );

        if (newWorkplace.length > 0) {
          const checkOverlapStatus = [...newWorkplace].reduce((acc, item) => {
            if (acc) return true;

            const firstItem = newWorkplace[0];
            if (firstItem.id === item.id) return acc;

            const statusCheker = dateRangeOverlaps(
              new Date(item.start_date),
              new Date(item.end_date),
              new Date(firstItem.start_date),
              new Date(firstItem.end_date)
            );

            return statusCheker;
          }, false);

          setError(checkOverlapStatus);
        }
        return setWorkplaces('add', newWorkplace);
      }

      if (workplaces.length > 0) {
        const checkOverlapStatus = [...workplaces].reduce((acc, item) => {
          if (acc) return true;
          const statusCheker = dateRangeOverlaps(
            new Date(item.start_date),
            new Date(item.end_date),
            new Date(workPlace.start_date),
            new Date(workPlace.end_date)
          );

          return statusCheker;
        }, false);

        setError(checkOverlapStatus);
      }

      return setWorkplaces('update', workPlace);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [workplaces]
  );

  return (
    <div className="pt-10 md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Work places
        </h3>
      </div>

      <div className="mt-5 md:mt-0 md:col-span-2">
        {error && (
          <AlertDisplay
            status="error"
            message="You can only select one company during the same period date"
          />
        )}
        <fieldset>
          <legend className="sr-only">Pricing plans</legend>
          <div className="relative -space-y-px bg-white rounded-md">
            {workPlaces.map((workplace) => {
              return (
                <label
                  key={workplace.id}
                  className="relative flex flex-col p-4 border border-gray-200 cursor-pointer rounded-tl-md rounded-tr-md md:pl-4 md:pr-6 md:grid md:grid-cols-3"
                >
                  <div className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      name={workplace.company}
                      checked={workplaces.some((item) => {
                        return item.id === workplace.id;
                      })}
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      onChange={() => handleSelectWorkplace(workplace)}
                    />
                    <span
                      id="pricing-plans-0-label"
                      className="ml-3 font-medium text-gray-900"
                    >
                      {workplace.company}
                    </span>
                  </div>
                  <p
                    id="pricing-plans-0-description-0"
                    className="pl-1 ml-6 text-sm md:ml-0 md:pl-0 md:text-center"
                  >
                    <span className="italic font-medium text-gray-900">
                      {workplace.start_date}
                    </span>{' '}
                    -{' '}
                    <span className="italic font-medium text-gray-500">
                      {workplace.end_date}
                    </span>
                  </p>

                  <p
                    id="pricing-plans-0-description-1"
                    className="pl-1 ml-6 text-sm text-gray-500 md:ml-0 md:pl-0 md:text-right"
                  >
                    {workplace.country}
                  </p>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default WorkPlaceList;
