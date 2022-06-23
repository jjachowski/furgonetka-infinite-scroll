import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getPackages, Pagination } from '../../api/FurgonetkaApi';
import { Package } from '../../types/package';

interface TableProps {}

export const PackagesTable: React.FC<TableProps> = ({}) => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    limit: 30,
    page: 1,
  });

  useEffect(() => {
    const test = async () => {
      const res = await getPackages(pagination);

      if (res?.status === 200) {
        setPackages((p) => [...p, ...res.data]);
        if (res.data.length === 0) {
          setHasMore(false);
        }
      }
    };
    test();
  }, [pagination]);

  const observer = useRef<IntersectionObserver>();
  const lastBookElementRef = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        console.log('ENTRIES: ', entries);
        if (entries[0].isIntersecting && hasMore) {
          setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  return (
    // for the sake of demo app I won't use css modules and use inline styles instead
    <div style={{ height: '100vh', width: '800px', overflow: 'scroll' }}>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Data</th>
            <th>Kurier</th>
            <th>Odbiorca</th>
            <th>Nadawca</th>
            <th>Przesyłka </th>
          </tr>
        </thead>
        <tbody>
          {packages.map((p, i) => (
            <tr
              key={p.id}
              style={{ backgroundColor: i % 2 === 0 ? '#b5e0fc' : undefined }}
            >
              {packages.length - 10 === i ? (
                <td ref={lastBookElementRef}>{p.datetime_send}</td>
              ) : (
                <td>{p.datetime_send}</td>
              )}
              <td>{p.service}</td>
              <td>{`${p.receiver.name} ${p.receiver.surname}`}</td>
              <td>{`${p.sender.name} ${p.sender.surname}`}</td>
              <td>{p.parcels.package_no} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
