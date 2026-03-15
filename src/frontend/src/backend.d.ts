import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CircleScore {
    timestamp: Time;
    percentage: bigint;
}
export interface ResourceCategory {
    name: string;
    description: string;
    items: Array<ResourceItem>;
}
export interface ResourceItem {
    tag: string;
    url: string;
    title: string;
    description: string;
}
export type Time = bigint;
export interface backendInterface {
    addCategory(name: string, description: string): Promise<void>;
    addItemToCategory(categoryIndex: bigint, title: string, description: string, url: string, tag: string): Promise<void>;
    getCategories(): Promise<Array<ResourceCategory>>;
    getTopCircleScores(limit: bigint): Promise<Array<CircleScore>>;
    submitCircleScore(percentage: bigint): Promise<void>;
}
