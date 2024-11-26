import { Ref, forwardRef, memo, useEffect, useRef } from 'react';
import { User } from '../../types/users';
import styles from './styles.module.css';
import arrow from '../../ui/icons/arrow-down.svg';

interface SelectProps {
  users: User[];
  user: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  placeholder?: string;
  setUser: (user: string) => void;
}

export default memo(
  forwardRef(function Select(
    {
      users,
      placeholder = 'LastName FirstName, jobTitle',
      user,
      setUser,
      open,
      setOpen,
    }: SelectProps,
    ref: Ref<HTMLUListElement>,
  ) {
    const selectRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
      setOpen(!open);
    };

    const handleChangeUser = (user: User) => {
      setUser(`${user.last_name} ${user.first_name}, ${user.job}`);
      setOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);

    return (
      <label htmlFor="users" className={styles.label}>
        Users
        <div className={styles.custom_select} id="users" ref={selectRef}>
          <div className={!open ? styles.header : styles.headerActive} onClick={handleToggle}>
            {user ? user : placeholder}
            <img
              src={arrow}
              alt=""
              className={open ? styles.iconOpen : styles.iconClosed}
              width={12}
              height={12}
            />
          </div>
          {open && (
            <ul ref={ref} className={styles.list}>
              {users.map((user) => (
                <li key={user.id} className={styles.option} onClick={() => handleChangeUser(user)}>
                  <span className={styles.initials}>{user.last_name[0]}</span> {user.last_name}
                  {user.first_name}, {user?.job}
                </li>
              ))}
            </ul>
          )}
        </div>
      </label>
    );
  }),
);
