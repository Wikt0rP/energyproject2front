import type {GenerationMix} from "../types/energy.ts";

export interface ChartData {
    name: string;
    value: number;
    [key: string]: string | number;
}

export function mapGenerationMixToChartData(mix: GenerationMix[]):ChartData[]{
    return mix.map(entry => ({
        name: entry.fuel,
        value: entry.perc
    }))
}