export interface GenerationMix{
    fuel:string;
    perc:number;
}
export interface DailyMix{
    date:string;
    generationmix:GenerationMix[];
    greenEnergyPerc: number;
}
export interface DailyMixResponse{
    dailyData: DailyMix[];
}

export interface BestCharingTimeResponse{
    chargingStartUTC: string;
    chargingEndUTC: string;
    greenEnergyPerc: number;
}