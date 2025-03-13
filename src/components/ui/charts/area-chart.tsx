
import * as React from "react";
import { Area, AreaChart as RechartsAreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface AreaChartProps {
  data: any[];
  categories: string[];
  index: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  yAxisWidth?: number;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  height?: number;
}

export function AreaChart({
  data,
  categories,
  index,
  colors = ["#2563eb", "#8b5cf6", "#10b981", "#ef4444"],
  valueFormatter = (value: number) => `${value}`,
  yAxisWidth = 40,
  showLegend = false,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  height = 300,
}: AreaChartProps) {
  const config = React.useMemo(() => {
    return categories.reduce(
      (acc, category, idx) => ({
        ...acc,
        [category]: {
          color: colors[idx % colors.length],
        },
      }),
      {}
    );
  }, [categories, colors]);

  return (
    <ChartContainer config={config}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
          {showXAxis && <XAxis dataKey={index} tickLine={false} axisLine={false} />}
          {showYAxis && <YAxis width={yAxisWidth} tickLine={false} axisLine={false} tickFormatter={valueFormatter} />}
          <ChartTooltip content={<ChartTooltipContent />} />
          {categories.map((category, idx) => (
            <Area
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[idx % colors.length]}
              fill={colors[idx % colors.length]}
              fillOpacity={0.1}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
