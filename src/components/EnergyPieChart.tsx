import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { GenerationMix } from "../types/energy";
import { type ChartData, mapGenerationMixToChartData } from "../utils/mappers";

const COLORS: Record<string, string> = {
    biomass: "#2ecc71",
    nuclear: "#27ae60",
    hydro: "#3498db",
    wind: "#1abc9c",
    solar: "#f1c40f",
    coal: "#7b241c",
    gas: "#c0392b",
    imports: "#a04000",
    other: "#922b21"
};

interface Props {
    data: GenerationMix[];
    date: string;
    greenEnergyPerc: number;
}

function EnergyPieChart({ data, date, greenEnergyPerc }: Props) {
    const safeData = data ?? [];

    const chartData: ChartData[] = mapGenerationMixToChartData(safeData ?? []);

    return (
        <div style={{
            width: "100%",
            height: 500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <h2 style={{ textAlign: "center", marginBottom: "1px" }}>
                {date}
            </h2>

            <h4 style={{ textAlign: "center", marginBottom: "25px" }}>
                Green energy: {(greenEnergyPerc ?? 0).toFixed(1)}%
            </h4>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={135}
                    >
                        {chartData.map((entry) => (
                            <Cell
                                key={entry.name}
                                fill={COLORS[entry.name] || "#bdc3c7"}
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        formatter={(value) =>
                            typeof value === "number"
                                ? value.toFixed(2)
                                : value
                        }
                    />

                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        wrapperStyle={{ paddingTop: "20px" }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default EnergyPieChart;