import { useSelector } from "react-redux";
import { getCurrencyChartTimeseries } from "../../../features/currency/currencySlice";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function Chart() {
  const currenciesTimeSeries = useSelector(getCurrencyChartTimeseries);
  const chartContainerStyle = { flex: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', postition: 'relative', width: '100%', height: 350 }

  return (
    <>
      <div style={chartContainerStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={currenciesTimeSeries}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="4" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: '12px', fontWeight: '400', transform: 'translate(0, 6)' }}/>
            <YAxis 
              tick={{ fontSize: '12px', fontWeight: '500', transform: 'translate(-3, -5)' }}
            />
            <Tooltip labelStyle={{color: 'rgb(99 102 241)'}}/>
            <Area
              type="monotone"
              dataKey="exchangeRate"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
