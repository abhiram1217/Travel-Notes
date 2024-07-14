import { useCities } from '../../contexts/CitiesContext';
import CityItem from './CityItem';
import styles from './CityList.module.css';
import Message from './Message';
import Spinner from './Spinner';

export default function CityList() {
  const {cities,isLoading}=useCities();
  if (isLoading) return <Spinner />;
  if(!cities.length) return <Message message="Click on the map to add your first city"/>
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

// CityList.propTypes = {
//   cities: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       // Add other city properties as needed
//     })
//   ).isRequired,
//   isLoading: PropTypes.bool.isRequired,
// };
