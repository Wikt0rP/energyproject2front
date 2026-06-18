import { useEffect, useState } from "react";
import {fetchDailyAvg} from "../api/energy";
import type {DailyMixResponse} from "../types/energy";
import EnergyPieChart from "./EnergyPieChart.tsx";
import {CircularProgress} from "@mui/material";

function EnergyDashboard() {
    const [data, setData] = useState<DailyMixResponse | null>(null);


    useEffect(() => {
        fetchDailyAvg().then(setData)
    }, []);

    if (!data) {
        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <CircularProgress sx={{ color: "#808080" }} />
                <p style={{ marginTop: "10px" }}>
                    The backend service may still be starting up.
                </p>
            </div>
        );
    }


    return (
        <div>
            <h2>Daily energy mix</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {data.dailyData.map(day => (
                    <div key={day.date} style={{ flex: '1 1 30%', minWidth: '350px' }}>
                        <EnergyPieChart
                            data={day.generationmix}
                            date={day.date}
                            greenEnergyPerc={day.greenEnergyPerc}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default EnergyDashboard;