"use client";

const data = [
  { id: 1, first: "Mark", last: "Otto", service: "Haircut" },
  { id: 2, first: "Jacob", last: "Thornton", service: "Message" },
  { id: 3, first: "Lilyana", last: "Manning", service: "Haircut" },
  { id: 4, first: "Kaydence", last: "Bird", service: "Haircut" },
  { id: 5, first: "Lacey", last: "Roach", service: "Haircut" },
  { id: 6, first: "Malik", last: "Mohammed", service: "Haircut" },
  { id: 7, first: "Marcel", last: "Schimitt", service: "Haircut" },
  { id: 8, first: "Wise", last: "Hartmen", service: "Haircut" },
  { id: 9, first: "Burgess", last: "Watts", service: "Haircut" },
  { id: 10, first: "Lee", last: "McDaniel", service: "Haircut" },
];

export default function Table() {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              First
            </th>
            <th scope="col" className="px-6 py-3">
              Last
            </th>
            <th scope="col" className="px-6 py-3">
              Most used service
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((each) => {
            return (
              <tr className="bg-white border-b" key={each.id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {each.id}
                </th>
                <td className="px-6 py-4">{each.first}</td>
                <td className="px-6 py-4">{each.last}</td>
                <td className="px-6 py-4">{each.service}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
