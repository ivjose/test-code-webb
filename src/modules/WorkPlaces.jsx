import { useEffect } from 'react';
import axios from '../utils/api';

const WorkPlaces = () => {
  useEffect(() => {
    const fetchWorkPlace = async () => {
      try {
        const response = await axios('/b');
        console.log(response);
      } catch (error) {
        console.log(error, 'error');
      }
    };
    fetchWorkPlace();
  }, []);

  return <div>WorkPlaces</div>;
};

export default WorkPlaces;
