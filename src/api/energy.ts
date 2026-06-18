import type {BestCharingTimeResponse, DailyMixResponse} from "../types/energy.ts";

const BASE_URL = 'http://127.0.0.1:8080'

export async function fetchDailyAvg(){
    try{
        const response = await fetch(`${BASE_URL}/energy/days/avg`)
        if(!response.ok) throw new Error(`HTTP error ${response.status}`)
        return await response.json() as DailyMixResponse;
    }catch (error){
        console.error("Error: ", error);
        return null;
    }
}

export async function fetchPredictionData(chargingTimeHours: number){
    if(chargingTimeHours < 1 || chargingTimeHours > 6){
        throw new Error("Charging hours must be a number in range 1 - 6")
    }

    try{
        const response = await fetch(`${BASE_URL}/energy/prediction/${chargingTimeHours}`)
        if(!response.ok) throw new Error(`HTTP error ${response.status}`);
        return await response.json() as BestCharingTimeResponse;
    }catch (error){
        console.error("Error: ", error);
        return null;
    }
}