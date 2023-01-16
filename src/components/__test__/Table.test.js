import { render, screen, fireEvent, within } from '@testing-library/react';
import { Table } from '../Table';

const isExtraSmall = false

const columns = [
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
]

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

describe("Basic Table", () => {
    // check the row's, col's count of body and header
    it("The count of rows and cols should be match", () => {
        // arrange
        render(<Table columns={columns} data={data} />)
        
        const rows =  screen.getAllByRole("row");
        const header = rows[0];
        const body = [...rows.slice(1)];
        
        expect(within(header).getAllByRole("columnheader").length).toBe(3);
        expect(body.length).toBe(4);
    })

    // check sort function
    it("The sort function should be working properly", async () => {
        // arrange
        render(<Table columns={columns} data={data} />)

        fireEvent.click(screen.getByText("Operator"));

        const rows = await screen.findAllByRole("row");
        const body = [...rows.slice(1)];
        const tds = await within(body[0]).findAllByRole("cell");
        
        expect(tds[0].childNodes[0].innerHTML).toBe("U Mobile (LTE)");
    })
})

describe("Table with checkbox", () => {
    // check col's count of header
    it("The count of header should be 1 more", () => {
        // arrange
        render(<Table columns={columns} data={data} showCheckbox />)
        
        const rows =  screen.getAllByRole("row");
        const header = rows[0];

        expect(within(header).getAllByRole("columnheader").length).toBe(4);
    })

    // check the action of checkbox of header
    it("Once click the header checkbox, the other ones should be interact", async () => {
        // arrange
        render(<Table columns={columns} data={data} showCheckbox />)

        let rows =  screen.getAllByRole("row");
        const header = rows[0];

        fireEvent.click(within(header).getByTitle("Toggle All Rows Selected"));
        
        rows = await screen.findAllByRole("row");
        const body = [...rows.slice(1)];

        body.forEach(row => {
            // check bg color
            expect(row).toHaveClass("bg-[#EFEDFD] z-10 relative");
            // check whether checked or not
            expect(within(row).getByTitle("Toggle Row Selected").checked).toBe(true);
        });
    })

    // check the action of checkbox of each row
    it("Once click the checkbox of one row, the checked value should be true and the bg color of row should be #EFEDFD", async () => {
        // arrange
        render(<Table columns={columns} data={data} showCheckbox />)

        let rows =  screen.getAllByRole("row");
        let body = [...rows.slice(1)];
        
        fireEvent.click(within(body[0]).getByTitle("Toggle Row Selected"));

        rows = await screen.findAllByRole("row");
        body = [...rows.slice(1)];

        // check bg color
        expect(body[0]).toHaveClass("bg-[#EFEDFD] z-10 relative");
        // check whether checked or not
        expect(within(body[0]).getByTitle("Toggle Row Selected").checked).toBe(true);
    })
})

describe('Table with audio', () => {
    // check col's count of header and hidden attribute
    it("The count of header should be 1 more", () => {
        // arrange
        render(<Table columns={columns} data={data} showRadio />)
        
        const rows =  screen.getAllByRole("row");
        const header = rows[0];

        expect(within(header).getByTitle("Toggle All Rows Selected")).toHaveAttribute('hidden');
        expect(within(header).getAllByRole("columnheader").length).toBe(4);
    })

    // check action of each radio
    it("Once click one audio, then the audio should be checked and the other ones should be unchecked", async () => {
        // arrange
        render(<Table columns={columns} data={data} showRadio />)

        let rows = screen.getAllByRole("row");
        
        fireEvent.click(within(rows[1]).getByTitle("Toggle Row Selected"));

        rows = await screen.findAllByRole("row");
        const first = rows[1];
        const others = [...rows.slice(2)];

        expect(first).toHaveClass("bg-[#EFEDFD] z-10 relative");
        expect(within(first).getByTitle("Toggle Row Selected").checked).toBe(true);
        others.forEach(row => {
            expect(row).not.toHaveClass("");
            expect(within(row).getByTitle("Toggle Row Selected").checked).toBe(false);
        })
    })
})