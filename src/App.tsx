import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import Select from './components/select';
import { User } from './types/users';
import getUsers from './api/users';

function App() {
  const [user, setUser] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [hasMore, setHasMore] = useState(true);
  const selectRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);

  const fetchUsers = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const data = await getUsers(page, limit);
      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        setUsers((prevUsers) => [...prevUsers, ...data.data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log('Ошибка загрузки', error);
    } finally {
      setLoading(false);
    }
  }, [hasMore, limit, loading, page]);

  const handleScroll = useCallback(() => {
    const select = selectRef.current;
    if (!select) return;

    const { scrollTop, scrollHeight, clientHeight } = select;
    if (scrollTop + clientHeight >= scrollHeight - 10 && hasMore) {
      fetchUsers();
    }
  }, [fetchUsers, hasMore]);

  useEffect(() => {
    const select = selectRef.current;
    if (select && open) {
      select.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (select) {
        select.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasMore, open, handleScroll]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <Select
        open={open}
        setOpen={setOpen}
        users={users}
        user={user}
        ref={selectRef}
        setUser={setUser}
      />
    </div>
  );
}

export default App;
