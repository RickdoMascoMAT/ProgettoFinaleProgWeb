export interface ItemsRoot {
    success:     boolean;
    lastUpdated: number;
    items:       Item[];
}

export interface Item {
    material:                            string;
    durability?:                         number | string;
    skin?:                               Skin;
    name:                                string;
    category?:                           string;
    tier?:                               string;
    npc_sell_price?:                     number;
    id:                                  string;
    salvages?:                           SalvageElement[];
    rarity_salvageable?:                 boolean;
    description?:                        string;
    item_model?:                         string;
    stats?:                              { [key: string]: number };
    unstackable?:                        boolean;
    dungeon_item_conversion_cost?:       DungeonItemConversionCost;
    upgrade_costs?:                      Array<SalvageElement[]>;
    museum_data?:                        MuseumData;
    requirements?:                       ItemRequirement[];
    color?:                              string;
    soulbound?:                          string;
    has_uuid?:                           boolean | string;
    can_auction?:                        boolean;
    gemstone_slots?:                     GemstoneSlot[];
    glowing?:                            boolean;
    can_trade?:                          boolean;
    can_place?:                          boolean;
    museum?:                             boolean;
    generator?:                          string;
    generator_tier?:                     number;
    furniture?:                          string;
    item_specific?:                      ItemSpecific;
    gear_score?:                         number;
    dungeon_item?:                       boolean;
    catacombs_requirements?:             CatacombsRequirement[];
    hide_from_api?:                      boolean;
    can_recombobulate?:                  boolean;
    salvageable_from_recipe?:            boolean;
    motes_sell_price?:                   number;
    double_tap_to_drop?:                 boolean;
    enchantments?:                       { [key: string]: number };
    rift_transferrable?:                 boolean;
    origin?:                             string;
    hide_from_viewrecipe_command?:       boolean;
    ability_damage_scaling?:             number;
    tiered_stats?:                       TieredStats;
    crystal?:                            string;
    can_burn_in_furnace?:                boolean;
    salvage?:                            PurpleSalvage;
    serializable?:                       boolean;
    can_have_attributes?:                boolean;
    can_interact?:                       boolean;
    can_interact_right_click?:           boolean;
    private_island?:                     string;
    can_have_power_scroll?:              boolean;
    can_interact_entity?:                boolean;
    MINING_FORTUNE?:                     number;
    rarity?:                             string;
    sword_type?:                         string;
    is_upgradeable_without_soulbinding?: boolean;
    recipes?:                            Recipe[];
    cannot_reforge?:                     boolean;
    lose_motes_value_on_transfer?:       boolean;
    can_have_booster?:                   boolean;
    prestige?:                           Prestige;
}

export interface CatacombsRequirement {
    type:         string;
    dungeon_type: string;
    level:        number;
}

export interface DungeonItemConversionCost {
    essence_type: string;
    amount:       number;
}

export interface GemstoneSlot {
    slot_type:     string;
    costs?:        SalvageElement[];
    requirements?: GemstoneSlotRequirement[];
}

export interface SalvageElement {
    type:          string;
    item_id?:      string;
    amount?:       number;
    coins?:        number;
    essence_type?: string;
}

export interface GemstoneSlotRequirement {
    type:     string;
    data_key: string;
    value:    string;
    operator: string;
}

export interface ItemSpecific {
    memorable_event_key?:             string;
    permanent_health?:                number;
    permanent_crops_farming_fortune?: number;
    max_contacts?:                    number;
    model?:                           string;
    has_contact_directory?:           boolean;
    max_musicdiscs?:                  number;
    particle_color?:                  ParticleColor;
    has_dnd?:                         boolean;
    portal?:                          Portal;
    ray_texture?:                     Skin;
    bonus_experience_chance?:         number;
    speed_boost?:                     number;
    effect_duration_seconds?:         number;
    cooldown_seconds?:                number;
    mana_cost?:                       number;
    slow_duration_seconds?:           number;
    stats?:                           Stats;
    rift_stats?:                      RiftStats;
    duration_seconds?:                number;
    range?:                           number;
    max_other_players?:               number;
    chisel_charges?:                  number;
    scaling?:                         Scaling;
    rift_time_regain_on_kill?:        number;
    hearts_reduction?:                number;
    swappables?:                      { [key: string]: Swappable };
    range_blocks?:                    number;
    max_players?:                     number;
    damage_per_player?:               number;
    mana_regen_per_player?:           number;
    regained_rift_time?:              number;
    flex_skins?:                      FlexSkin[];
    mana_refund?:                     number;
    rift_time_gain?:                  number;
    experience_gained?:               number;
    charges?:                         number;
    consumed_item?:                   string;
    bonus_fishing_speed_per_bucket?:  number;
    max_bonus_fishing_speed?:         number;
    speed_duration_seconds?:          number;
    stats_on_rift?:                   StatsOnRift;
    rift_time_per_eat?:               number;
    motes_percent_per_eat?:           number;
    motes_on_join_per_eat?:           number;
    duration_ticks?:                  number;
    damage_multiplier?:               number;
    bonus_rift_damage_vs_vampire?:    number;
    heal_on_hit?:                     number;
    heal?:                            number;
    bonus_heal?:                      number;
    default_skin?:                    Skin;
    rarity_skins?:                    Skin[];
    capture_skins?:                   Skin[];
    speed_on_farming_island?:         number;
    extra_pelts?:                     number;
    bundled_item_id?:                 string;
    bundled_amount?:                  number;
}

export interface Skin {
    value:      string;
    signature?: string;
}

export interface FlexSkin {
    skin:        Skin;
    name:        string;
    description: string;
}

export interface ParticleColor {
    red:   number;
    green: number;
    blue:  number;
}

export interface Portal {
    holo_name:              string;
    description_name?:      string;
    destination_mode:       string;
    location_tag?:          string;
    schematic_file:         string;
    offset?:                string;
    skill_requirement?:     SkillRequirement;
    requirements?:          PortalRequirement[];
    objective_requirement?: ObjectiveRequirement;
}

export interface ObjectiveRequirement {
    objective_id:     string;
    objective_status: string;
}

export interface PortalRequirement {
    type:   string;
    skill?: string;
    level?: number;
    quest?: string;
}

export interface SkillRequirement {
    skill: string;
    level: number;
}

export interface RiftStats {
    rift_damage:     number;
    rift_walk_speed: number;
}

export interface Scaling {
    tiers: Tier[];
}

export interface Tier {
    numeric:    number;
    stats:      { [key: string]: number };
    item_tier?: string;
}

export interface Stats {
    strength:         number;
    walk_speed:       number;
    critical_damage?: number;
    attack_speed?:    number;
}

export interface StatsOnRift {
    rift_time:         number;
    rift_intelligence: number;
    rift_mana_regen:   number;
}

export interface Swappable {
    color:     string;
    value:     string;
    signature: string;
}

export interface MuseumData {
    donation_xp?:           number;
    type:                   string;
    parent?:                { [key: string]: string };
    mapped_item_ids?:       string[];
    game_stage:             string;
    armor_set_donation_xp?: { [key: string]: number };
}

export interface Prestige {
    item_id: string;
    costs:   SalvageElement[];
}

export interface Recipe {
    output:               Output;
    ingredient_symbols:   IngredientSymbols;
    matrix:               string[];
    allow_quick_crafting: boolean;
}

export interface IngredientSymbols {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
    F: string;
}

export interface Output {
    item_id: string;
}

export interface ItemRequirement {
    type:              string;
    slayer_boss_type?: string;
    level?:            number;
    skill?:            string;
    reward?:           string;
    faction?:          string;
    reputation?:       number;
    dungeon_type?:     string;
    tier?:             number;
    collection?:       string;
    rabbit?:           string;
    mode?:             string;
    requirements?:     RequirementRequirement[];
    lore_index?:       number;
    kuudra_tier?:      string;
    minimum_age_unit?: string;
    minimum_age?:      number;
}

export interface RequirementRequirement {
    type:          string;
    profile_type?: string;
    tier?:         number;
}

export interface PurpleSalvage {
    item_id: string;
    amount:  number;
}

export interface TieredStats {
    WALK_SPEED?:            number[];
    DEFENSE?:               number[];
    HEALTH?:                number[];
    CRITICAL_DAMAGE?:       number[];
    CRITICAL_CHANCE?:       number[];
    DAMAGE?:                number[];
    WEAPON_ABILITY_DAMAGE?: number[];
    INTELLIGENCE?:          number[];
    STRENGTH?:              number[];
    ATTACK_SPEED?:          number[];
}
