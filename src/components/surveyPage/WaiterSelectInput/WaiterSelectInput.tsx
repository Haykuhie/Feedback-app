import { useEffect, useState } from 'react';
import { getWaiters } from '../../../api/api';
import { useQuery } from 'react-query';
import styles from './WaiterSelectInput.module.css';

type Props = {
  onWaiterSelect: (waiterName: { waiterId: number | undefined }) => void;
  formResetStatus: boolean;
};

const WaiterSelectDropdown: React.FC<Props> = ({
  onWaiterSelect,
  formResetStatus,
}) => {
  const [selectedWaiter, setSelectedWaiter] = useState<any>({});
  const { data =[]} = useQuery('waiters',  () => getWaiters());
  

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWaiter({
      name: data ? data[event.target.selectedIndex - 1].name : '',
      id: event.target.selectedIndex,
    });
  };

  useEffect(() => {
    if (!!selectedWaiter) {
      onWaiterSelect({ waiterId: selectedWaiter.id });
    }
  }, [selectedWaiter]);

  useEffect(() => {
    if (!!formResetStatus) {
      setSelectedWaiter({ name: '' });
    }
  }, [formResetStatus]);

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor="waiter">Select the waiter</label>
      <select
        name="waiter"
        id="waiter"
        onChange={handleChange}
        className={styles.select}
        value={selectedWaiter.name}
      >
        <option value="" hidden></option>
        {data.map((waiter: any) => (
          <option key={waiter.id} value={waiter.name}>
            {waiter.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default WaiterSelectDropdown;
