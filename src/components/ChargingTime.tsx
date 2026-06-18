import { useState } from "react";
import { fetchPredictionData } from "../api/energy";
import type { BestCharingTimeResponse } from "../types/energy";

type ChargingTimeSliderProps = {
    initialValue?: number;
};

const getTimeZone = () =>
    Intl.DateTimeFormat().resolvedOptions().timeZone;

export default function ChargingTime({ initialValue = 3 }: ChargingTimeSliderProps) {
    const [pendingValue, setPendingValue] = useState(initialValue);
    const [prediction, setPrediction] = useState<BestCharingTimeResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCalculate = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await fetchPredictionData(pendingValue);
            setPrediction(result);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch prediction");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginTop: "30px", textAlign: "center" }}>
            <h2>Pick charging time (1–6h):</h2>

            <input
                type="range"
                min={1}
                max={6}
                value={pendingValue}
                onChange={(e) => setPendingValue(Number(e.target.value))}
                style={{ width: "300px" }}
            />

            <div>Charging time: {pendingValue} h</div>

            <button onClick={handleCalculate} style={{ marginTop: "10px" }}>
                {loading ? "Loading..." : "Calculate"}
            </button>

            {error && (
                <div style={{ color: "red", marginTop: "10px" }}>
                    {error}
                </div>
            )}

            {prediction && (
                <div
                    style={{
                        marginTop: "20px",
                        textAlign: "center",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "15px",
                        maxWidth: "400px",
                        marginInline: "auto"
                    }}
                >
                    <h3>Best time to charge your car</h3>

                    <p>
                        <strong>Start:</strong>{" "}
                        {new Date(prediction.chargingStartUTC).toLocaleString()}
                    </p>

                    <p>
                        <strong>End:</strong>{" "}
                        {new Date(prediction.chargingEndUTC).toLocaleString()}
                    </p>

                    <p>
                        <strong>Time zone:</strong>{" "}
                        {getTimeZone()}
                    </p>

                    <p>
                        <strong>Green energy:</strong>{" "}
                        {(prediction.greenEnergyPerc ?? 0).toFixed(1)}%
                    </p>
                </div>
            )}
        </div>
    );
}