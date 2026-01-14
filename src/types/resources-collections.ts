export interface CollectionsRoot {
    success:     boolean;
    lastUpdated: number;
    version:     string;
    collections: Collections;
}

export interface Collections {
    FARMING:  Combat;
    MINING:   Combat;
    COMBAT:   Combat;
    FORAGING: Combat;
    FISHING:  Combat;
    RIFT:     Rift;
}

export interface Combat {
    name:  string;
    items: { [key: string]: Item };
}

export interface Item {
    name:     string;
    maxTiers: number;
    tiers:    Tier[];
}

export interface Tier {
    tier:           number;
    amountRequired: number;
    unlocks:        string[];
}

export interface Rift {
    name:  string;
    items: Items;
}

export interface Items {
    WILTED_BERBERIS:   Item;
    METAL_HEART:       Item;
    CADUCOUS_STEM:     Item;
    AGARICUS_CAP:      Item;
    HEMOVIBE:          Item;
    HALF_EATEN_CARROT: Item;
    TIMITE:            Item;
}
