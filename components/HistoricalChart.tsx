
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { HistoricalDataPoint } from '../types';

interface HistoricalChartProps {
  data: HistoricalDataPoint[];
}

const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { notation: 'compact', compactDisplay: 'short' }).format(value);
const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};


const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-700 p-3 border border-gray-600 rounded-md shadow-lg">
          <p className="label text-gray-300">{`${formatDate(label)}`}</p>
          <p className="intro text-blue-400 font-semibold">{`Value: ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(payload[0].value)}`}</p>
        </div>
      );
    }
  
    return null;
};

const HistoricalChart: React.FC<HistoricalChartProps> = ({ data }) => {
  return (
    <div className="bg-gray-800 p-4 pt-8 rounded-lg shadow-lg h-96">
      <h3 className="text-xl font-semibold mb-4 text-white px-4">Historical Portfolio Value (INR)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af" 
            tickFormatter={formatDate}
            tick={{ fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            stroke="#9ca3af" 
            tickFormatter={formatCurrency}
            tick={{ fontSize: 12 }}
            domain={['dataMin', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ bottom: 0 }} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={false}
            name="Portfolio Value"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoricalChart;
