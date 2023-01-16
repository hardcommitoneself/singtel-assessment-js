import React, { useMemo } from "react"
import { Table } from "./components/Table";
import {
    useMediaQuery
} from "react-responsive"

function App() {
  const isExtraSmall = useMediaQuery({ query: "(max-width: 640px)" })

  const columns = useMemo(() => [
    {
      Header: 'Operator',
      accessor: 'operator',
      show: !isExtraSmall
    },
    {
      Header: 'Headset Display',
      accessor: 'headset',
      show: !isExtraSmall
    },
    {
      Header: '3G Availability',
      accessor: 'is3GAvailable',
      disableSortBy: true,
      show: !isExtraSmall
    },
    {
      Header: 'Singtel',
      accessor: 'singtel',
      disableSortBy: true,
      Cell: ({ row }) => {
        return (
          <div className="flex gap-4">
            <div className="flex flex-col">
              {row.allCells.filter(c => c.column.id !== 'selection' && c.column.id !== 'singtel' && c.column.id !== 'radio').map((c, key) => (
                  <span className="font-bold" key={key}>
                      {c.render('Header')}:
                  </span>
              ))}
            </div>
            <div className="flex flex-col">
              {row.allCells.filter(c => c.column.id !== 'selection' && c.column.id !== 'singtel' && c.column.id !== 'radio').map((c, key) => (
                  <span key={key}>
                      {c.render('Cell')}
                  </span>
              ))}
            </div>
          </div>
        )
      },
      show: isExtraSmall
    }
  ], [isExtraSmall])

  const data = [
    {
      id: 0,
      operator: '*Celcom Axiata (LTE)',
      headset: 'CELCOM / My Celcom / 502 19',
      is3GAvailable: "Yes"
    },
    {
      id: 1,
      operator: '*DiGi Telecom (LTE)',
      headset: 'DiGi 1800 / DiGi /  MYMY18',
      is3GAvailable: "Yes"
    },
    {
      id: 2,
      operator: '*Maxis (LTE)',
      headset: 'U Mobile / MYS 18 / MY 18',
      is3GAvailable: "Yes"
    },
    {
      id: 3,
      operator: 'U Mobile (LTE)',
      headset: 'U Mobile / MYS 18 / MY 18',
      is3GAvailable: "Yes"
    }
  ]

  return (
    <div className="px-10 mx-auto mt-10">
      <Table columns={columns} data={data} showRadio />
    </div>
  );
}

export default App;
