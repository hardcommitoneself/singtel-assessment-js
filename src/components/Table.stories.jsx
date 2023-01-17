import React from "react";
import { Table } from "./Table";

export default {
    title: 'Singtel/Table',
    component: Table,
    argTypes: {
        showCheckbox: {
            control: 'boolean'
        },
        showRadio: {
            control: 'boolean'
        }
    }
}

const Template = (args) => <Table {...args} />

export const BasicTable = Template.bind({})

let isExtraSmall = false;
let data = [
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
let columns = [
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
    }
]

BasicTable.args = {
    columns: columns,
    data: data
}

export const CheckboxTable = Template.bind({})

isExtraSmall = false
data = [
    {
        id: 0,
        brn: '198702333K',
        company: 'Blue Ocean International'
    },
    {
        id: 1,
        brn: '198900364N',
        company: 'Red Electronics'
    },
    {
        id: 2,
        brn: '196700335H',
        company: 'Yellow Gaming'
    },
    {
        id: 3,
        brn: '196800306E',
        company: 'Purple Automobiles'
    },
    {
        id: 4,
        brn: '199131124V',
        company: 'Diamond Interiors Holdings'
    },
    {
        id: 5,
        brn: '200201624D',
        company: 'Omnichannel Solutions International'
    },
]
columns = [
    {
        Header: 'BRN',
        accessor: 'brn',
        show: !isExtraSmall
    },
    {
        Header: 'Company Name',
        accessor: 'company',
        show: !isExtraSmall
    }
]

CheckboxTable.args = {
    columns: columns,
    data: data,
    showCheckbox: true
}

export const RadioTable = Template.bind({})

isExtraSmall = false;
data = [
    {
        id: 0,
        name: 'Mavis Chen',
        mobile: '8899 7654',
        expiry: 'Dec 2022',
        penalty: '$600'
    },
    {
        id: 1,
        name: 'Rodney Artichoke',
        mobile: '9988 7676',
        expiry: 'Dec 2022',
        penalty: '$600'
    },
    {
        id: 2,
        name: 'Valentino Morose',
        mobile: '8900 7654',
        expiry: 'Dec 2022',
        penalty: '$600'
    },
    {
        id: 3,
        name: 'Eric Widget',
        mobile: '8900 7654',
        expiry: 'Dec 2022',
        penalty: '$600'
    }
]
columns = [
    {
        Header: 'Name',
        accessor: 'name',
        show: !isExtraSmall
    },
    {
        Header: 'Mobile',
        accessor: 'mobile',
        show: !isExtraSmall
    },
    {
        Header: 'Expiry',
        accessor: 'expiry',
        show: !isExtraSmall
    },
    {
        Header: 'Penalty',
        accessor: 'penalty',
        show: !isExtraSmall
    }
]

RadioTable.args = {
    columns: columns,
    data: data,
    showRadio: true
}

export const ExtraSmallTable = Template.bind({})

isExtraSmall = true;
data = [
    {
        id: 0,
        name: 'Mavis Chen',
        mobile: '8899 7654',
        expiry: 'Dec 2022',
        penalty: '$600'
    },
    {
        id: 1,
        name: 'Rodney Artichoke',
        mobile: '9988 7676',
        expiry: 'Dec 2022',
        penalty: '$600'
    },
    {
        id: 2,
        name: 'Valentino Morose',
        mobile: '8900 7654',
        expiry: 'Dec 2022',
        penalty: '$600'
    },
    {
        id: 3,
        name: 'Eric Widget',
        mobile: '8900 7654',
        expiry: 'Dec 2022',
        penalty: '$600'
    }
]
columns = [
    {
        Header: 'Name',
        accessor: 'name',
        show: !isExtraSmall
    },
    {
        Header: 'Mobile',
        accessor: 'mobile',
        show: !isExtraSmall
    },
    {
        Header: 'Expiry',
        accessor: 'expiry',
        show: !isExtraSmall
    },
    {
        Header: 'Penalty',
        accessor: 'penalty',
        show: !isExtraSmall
    },
    {
        Header: 'Contact Detail',
        accessor: 'contact',
        Cell: ({ row }) => {
          return (
            <div className="flex gap-4">
              <div className="flex flex-col">
                {row.allCells.filter(c => c.column.id !== 'selection' && c.column.id !== 'contact' && c.column.id !== 'radio').map((c, key) => (
                    <span className="font-bold" key={key}>
                        {c.render('Header')}:
                    </span>
                ))}
              </div>
              <div className="flex flex-col">
                {row.allCells.filter(c => c.column.id !== 'selection' && c.column.id !== 'contact' && c.column.id !== 'radio').map((c, key) => (
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
]

ExtraSmallTable.args = {
    columns: columns,
    data: data,
    showRadio: true
}