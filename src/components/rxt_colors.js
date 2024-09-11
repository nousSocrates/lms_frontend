import React from 'react';

const ColorTable = () => {
  // Define the colors
  const colors = [
    { name: 'Blue', hex: '#007BFF' },
    { name: 'Red', hex: '#DC3545' },
    { name: 'Green', hex: '#28A745' },
    { name: 'Yellow', hex: '#FFC107' },
    { name: 'Purple', hex: '#6F42C1' },
    { name: 'Teal', hex: '#20C997' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Black', hex: '#000000' },
    { name: 'Gray (Light)', hex: '#F8F9FA' },
    { name: 'Gray (Medium)', hex: '#6C757D' },
    { name: 'Gray (Dark)', hex: '#343A40' },
    { name: 'Orange', hex: '#FD7E14' },
    { name: 'Cyan', hex: '#17A2B8' },
    { name: 'Pink', hex: '#E83E8C' },
    { name: 'Indigo', hex: '#6610F2' },
    { name: 'Light Blue', hex: '#D0E7FF' }
  ];

  return (
    <div className='mt-5' style={{ padding: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead >
          <tr  >
            <th className='bg-success text-warning' style={{ border: '1px solid #000', padding: '10px', backgroundColor: '#343A40', color: '#FFFFFF' }}>Color Name</th>
            <th className='bg-success text-warning' style={{ border: '1px solid #000', padding: '10px', backgroundColor: '#343A40', color: '#FFFFFF' }}>Hex Code</th>
            <th className='bg-success text-warning' style={{ border: '1px solid #000', padding: '10px', backgroundColor: '#343A40', color: '#FFFFFF' }}>Sample</th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#F8F9FA' : '#FFFFFF' }}>
              <td style={{ border: '1px solid #000', padding: '10px' }}>{color.name}</td>
              <td style={{ border: '1px solid #000', padding: '10px' }}>{color.hex}</td>
              <td style={{ border: '1px solid #000', padding: '10px', backgroundColor: color.hex }}></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ColorTable;
