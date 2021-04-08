import { useState, useCallback } from 'react';

import InputField from '../components/InputField';
import InputDate from '../components/InputDate';
import AlertDisplay from '../components/AlertDisplay';
import WorkPlaceList from './WorkPlaceList';

import axios from '../utils/api';

const defaultValue = {
  first_name: '',
  last_name: '',
  email_address: '',
  birthdate: '',
  passport: '',
};

const BIN_NAME = 'workbook';
const COLLECTION_ID = '606c208163976918647471da';

const regexLettersOnly = /^[a-zA-Z ]*$/;
const regexEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const regexDate = /^(0?[1-9]|1[012])[-/](0?[1-9]|[12][0-9]|3[01])[-/]\d{4}$/;

const Workbook = () => {
  const [fields, setFields] = useState(defaultValue);
  const [errors, setErrors] = useState(defaultValue);
  const [status, setStatus] = useState('');
  const [workplaces, setWorkplaces] = useState([]);

  const updateField = async (name, val) => {
    setStatus('');
    setFields(
      (prevState) => ({ ...prevState, [name]: val }),
      handleError(name, val)
    );
  };

  const handleError = useCallback((name, val) => {
    let error = '';

    if (!val.trim()) {
      error = 'Required field';
    }

    if (val) {
      // Letters only for First name and last Name
      if (name === 'first_name' || name === 'last_name') {
        const checkValue = !regexLettersOnly.test(val);

        if (checkValue) {
          error = 'Only letters';
        }
      }
      // Email Validation
      if (name === 'email_address') {
        const checkValue = !regexEmail.test(val);
        if (checkValue) {
          error = 'Please use valid email address';
        }
      }

      if (name === 'birthdate') {
        const today = new Date();
        const birthdateCheck = new Date(val);
        const dateCompare =
          today.getFullYear() - birthdateCheck.getFullYear() < 18;

        if (!regexDate.test(val) || isNaN(birthdateCheck.valueOf())) {
          error = 'Please enter valid Date';
        }

        if (dateCompare) {
          error = 'User must be above 18 years old';
        }
      }
    }

    setErrors((prevState) => ({ ...prevState, [name]: error }));
    return error;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = '';

    Object.entries(fields).forEach(([key, value]) => {
      if (!value) {
        hasError = handleError(key, value);
      }
    });

    if (workplaces.length === 0) {
      setStatus('worplace');
      return;
    }

    if (hasError) return;

    const isEmpty = Object.values(errors).some((x) => x === null || x === '');
    if (isEmpty) {
      setStatus('loading');
      try {
        const response = await axios.post(
          '/b',
          { ...fields, workplaces },
          {
            headers: {
              'X-Bin-Name': BIN_NAME,
              'X-Collection-Id': COLLECTION_ID,
            },
          }
        );
        setStatus('success');
        handleReset();
      } catch (error) {
        setStatus('error');
      }
    }
  };

  const handleReset = () => {
    setFields(defaultValue);
    setErrors(defaultValue);
    setWorkplaces(['']);
  };

  const handleSelectWorkplace = (status, val) => {
    if (status === 'add') {
      setWorkplaces([...val]);
    }

    if (status === 'update') {
      setWorkplaces((prevState) => [...prevState, val]);
    }

    setStatus('');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit}>
        <div className="px-4 py-5 bg-white border-2 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Use a permanent address where you can receive mail.
              </p>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
              {status === 'success' && (
                <AlertDisplay status="success" message="Successfully created" />
              )}
              {status === 'error' && (
                <AlertDisplay status="error" message="Failed Submission" />
              )}

              {status === 'worplace' && (
                <AlertDisplay
                  status="error"
                  message="Please select at least one Workplace"
                />
              )}

              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    label="First name"
                    name="first_name"
                    value={fields.first_name}
                    onChange={(e) => updateField('first_name', e.target.value)}
                    error={errors.first_name}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <InputField
                    label="Last name"
                    name="last_name"
                    value={fields.last_name}
                    onChange={(e) => updateField('last_name', e.target.value)}
                    error={errors.last_name}
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <InputField
                    label="Email address"
                    type="email"
                    name="email_address"
                    value={fields.email_address}
                    onChange={(e) =>
                      updateField('email_address', e.target.value)
                    }
                    error={errors.email_address}
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <InputDate
                    label="Birthdate"
                    name="birthdate"
                    value={fields.birthdate}
                    onChange={(e) => updateField('birthdate', e.target.value)}
                    error={errors.birthdate}
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <InputField
                    label="Passport"
                    name="passport"
                    value={fields.passport}
                    onChange={(e) => updateField('passport', e.target.value)}
                    error={errors.passport}
                  />
                </div>
              </div>
            </div>
          </div>
          <WorkPlaceList
            workplaces={workplaces}
            setWorkplaces={handleSelectWorkplace}
          />
        </div>
        <div className="flex mt-5">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Workbook;
