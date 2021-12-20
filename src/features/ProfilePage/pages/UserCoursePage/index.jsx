import userApi from 'api/userApi';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

CoursePage.propTypes = {};

function CoursePage(props) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  const {
    current: { id, role },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      if (role === 'user') {
        const { dataObj } = await userApi.getUserHistoryList(id);

        setHistory(dataObj);
      }
    })();
    setLoading(false);
  }, [id, role]);

  return (
    <div>
      This is course page
      {!loading && JSON.stringify(history)}
    </div>
  );
}

export default CoursePage;
