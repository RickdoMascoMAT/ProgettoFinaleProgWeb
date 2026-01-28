export interface ProfilesRoot {
  success: boolean;
  profiles: ProfileElement[];
}

export interface ProfileElement {
  profile_id: string;
  community_upgrades: CommunityUpgrades;
  created_at?: number;
  members: Members;
  game_mode?: string;
  cute_name: string;
  selected: boolean;
  banking?: Banking;
}

export interface Banking {
  balance: number;
  transactions: Transaction[];
}

export interface Transaction {
  amount: number;
  timestamp: number;
  action: string;
  initiator_name: string;
}

export interface CommunityUpgrades {
  upgrade_states: UpgradeState[];
  currently_upgrading?: CurrentlyUpgrading | null;
}

export interface CurrentlyUpgrading {
  upgrade: string;
  new_tier: number;
  start_ms: number;
  who_started: string;
}

export interface UpgradeState {
  upgrade: string;
  tier: number;
  started_ms: number;
  started_by: string;
  claimed_by: string;
}

export interface Members {
  [uuid: string]: SkyblockProfileMember;
}

export interface SkyblockProfileMember {
  player_id: string;
  profile: MemberProfile;
  player_data: PlayerData;
  currencies?: Currencies;
  leveling: Leveling;
  objectives: Objectives;
  pets_data: PetsData;
  experimentation: Experimentation;
  events: Events;
  rift?: Rift;
  accessory_bag_storage?: AccessoryBagStorage;
  mining_core?: MiningCore;
  bestiary?: Bestiary;
  quests?: Quests;
  player_stats?: PlayerStats;
  forge?: Forge;
  fairy_soul?: FairySoul;
  glacite_player_data?: GlacitePlayerData;
  garden_player_data?: GardenPlayerData;
  item_data?: ItemData;
  jacobs_contest?: JacobsContest;
  dungeons?: Dungeons;
  nether_island_player_data?: NetherIslandPlayerData;
  winter_player_data?: Record<string, unknown>;
  trophy_fish?: TrophyFish;
  slayer?: Slayer;
  inventory?: Inventory;
  shared_inventory?: SharedInventory;
  collection?: Record<string, number>;
}

// Member Profile
export interface MemberProfile {
  first_join: number;
  cookie_buff_active: boolean;
  personal_bank_upgrade?: number;
  bank_account?: number;
  deletion_notice?: DeletionNotice;
  coop_invitation?: CoopInvitation;
}

export interface DeletionNotice {
  timestamp: number;
}

export interface CoopInvitation {
  timestamp: number;
  invited_by: string;
  confirmed: boolean;
  confirmed_timestamp: number;
}

// Player Data
export interface PlayerData {
  visited_zones?: string[];
  last_death?: number;
  perks?: Record<string, number>;
  active_effects: ActiveEffect[];
  temp_stat_buffs?: unknown[];
  death_count?: number;
  visited_modes: string[];
  unlocked_coll_tiers?: string[];
  crafted_generators?: string[];
  paused_effects?: unknown[];
  reaper_peppers_eaten?: number;
  disabled_potion_effects?: unknown[];
  achievement_spawned_island_types?: string[];
  fastest_target_practice?: number;
  fishing_treasure_caught?: number;
  experience?: Record<string, number>;
}

export interface ActiveEffect {
  effect: string;
  level: number;
  modifiers: Modifier[];
  ticks_remaining: number;
  infinite: boolean;
  flags: number;
}

export interface Modifier {
  key: string;
  amp: number;
}

// Currencies
export interface Currencies {
  coin_purse: number;
  motes_purse?: number;
  essence?: Essence;
}

export interface Essence {
  DRAGON?: EssenceAmount;
  DIAMOND?: EssenceAmount;
  WITHER?: EssenceAmount;
  SPIDER?: EssenceAmount;
  UNDEAD?: EssenceAmount;
  ICE?: EssenceAmount;
  GOLD?: EssenceAmount;
  CRIMSON?: EssenceAmount;
}

export interface EssenceAmount {
  current: number;
}

// Leveling
export interface Leveling {
  experience: number;
  completed_tasks: string[];
  completions?: Completions;
  highest_pet_score?: number;
  mining_fiesta_ores_mined?: number;
  migrated?: boolean;
  migrated_completions_2?: boolean;
  fishing_festival_sharks_killed?: number;
  guide_sort?: string;
  category_expanded?: boolean;
  claimed_talisman?: boolean;
  bop_bonus?: string;
  emblem_unlocks?: string[];
  task_sort?: string;
  selected_symbol?: string;
  last_viewed_tasks?: string[];
}

export interface Completions {
  NUCLEUS_RUNS?: number;
  REFINED_DARK_CACAO_TRUFFLE?: number;
}

// Objectives
export interface Objectives {
  [key: string]: Objective | string[];
}

export interface Objective {
  status: string;
  progress: number;
  completed_at: number;
  [key: string]: unknown;
}

// Pets
export interface PetsData {
  pets: Pet[];
  autopet?: Autopet;
  pet_care?: PetCare;
}

export interface Pet {
  uuid: string | null;
  uniqueId: string;
  type: string;
  exp: number;
  active: boolean;
  tier: string;
  heldItem: string | null;
  candyUsed: number;
  skin: string | null;
  petSoulbound?: boolean;
  extra?: Record<string, unknown>;
}

export interface Autopet {
  rules_limit?: number;
  rules?: AutopetRule[];
  migrated?: boolean;
  migrated_2?: boolean;
}

export interface AutopetRule {
  uuid: string;
  id: string;
  name: string;
  uniqueId: string;
  exceptions: AutopetException[];
  disabled: boolean;
  data: Record<string, string>;
}

export interface AutopetException {
  id: string;
  data: Record<string, string>;
}

export interface PetCare {
  coins_spent: number;
  pet_types_sacrificed: string[];
}

// Experimentation
export interface Experimentation {
  claimed_retroactive_rng?: boolean;
  charge_track_timestamp?: number;
  pairings?: ExperimentationGame;
  simon?: ExperimentationGame;
  numbers?: ExperimentationGame;
  claims_resets?: number;
  claims_resets_timestamp?: number;
  serums_drank?: number;
}

export interface ExperimentationGame {
  last_attempt?: number;
  last_claimed?: number;
  bonus_clicks?: number;
  claimed?: boolean;
  [key: string]: unknown;
}

// Events
export interface Events {
  easter?: Easter;
}

export interface Easter {
  rabbits: EasterRabbits;
  time_tower?: TimeTower;
  shop?: EasterShop;
  employees?: Record<string, number>;
  chocolate: number;
  total_chocolate: number;
  chocolate_since_prestige: number;
  last_viewed_chocolate_factory?: number;
  rabbit_hitmen?: RabbitHitmen;
  rabbit_sort?: string;
  rabbit_barn_capacity_level?: number;
  chocolate_level?: number;
  rabbit_filter?: string;
  click_upgrades?: number;
  chocolate_multiplier_upgrades?: number;
  rabbit_rarity_upgrades?: number;
  refined_dark_cacao_truffles?: number;
  supreme_chocolate_bars?: number;
  golden_click_amount?: number;
  golden_click_year?: number;
  rabbit_hotspot_filer?: string;
  el_dorado_progress?: number;
}

export interface EasterRabbits {
  collected_locations: Record<string, string[]>;
  collected_eggs: Record<string, number>;
  [rabbitName: string]: unknown;
}

export interface TimeTower {
  charges?: number;
  level?: number;
  activation_time?: number;
}

export interface EasterShop {
  year?: number;
  rabbits?: string[];
  chocolate_spent?: number;
  cocoa_fortune_upgrades?: number;
  rabbits_purchased?: string[];
}

export interface RabbitHitmen {
  rabbit_hitmen_slots?: number;
  missed_uncollected_eggs?: number;
  egg_slot_cooldown_mark?: number;
  egg_slot_cooldown_sum?: number;
}

// Rift
export interface Rift {
  village_plaza?: RiftVillagePlaza;
  wither_cage?: Record<string, unknown>;
  black_lagoon?: RiftBlackLagoon;
  dead_cats?: RiftDeadCats;
  wizard_tower?: RiftWizardTower;
  enigma?: RiftEnigma;
  gallery?: RiftGallery;
  west_village?: RiftWestVillage;
  wyld_woods?: RiftWyldWoods;
  castle?: RiftCastle;
  access?: RiftAccess;
  dreadfarm?: RiftDreadfarm;
  slayer_quest?: RiftSlayerQuest;
  lifetime_purchased_boundaries?: string[];
  inventory?: RiftInventory;
}

export interface RiftVillagePlaza {
  murder?: Record<string, unknown>;
  barry_center?: Record<string, unknown>;
  cowboy?: Record<string, unknown>;
  barter_bank?: Record<string, unknown>;
  lonely?: Record<string, unknown>;
  seraphine?: Record<string, unknown>;
  got_scammed?: boolean;
}

export interface RiftBlackLagoon {
  completed_step?: number;
  talked_to_edwin?: boolean;
  received_science_paper?: boolean;
  delivered_science_paper?: boolean;
}

export interface RiftDeadCats {
  talked_to_jacquelle?: boolean;
  found_cats?: string[];
  picked_up_detector?: boolean;
  unlocked_pet?: boolean;
  montezuma?: Pet;
}

export interface RiftWizardTower {
  wizard_quest_step?: number;
  crumbs_laid_out?: number;
}

export interface RiftEnigma {
  bought_cloak?: boolean;
  found_souls?: string[];
  claimed_bonus_index?: number;
}

export interface RiftGallery {
  elise_step?: number;
  secured_trophies?: SecuredTrophy[];
}

export interface SecuredTrophy {
  type: string;
  timestamp: number;
  visits: number;
}

export interface RiftWestVillage {
  crazy_kloon?: Record<string, unknown>;
  mirrorverse?: Record<string, unknown>;
  kat_house?: Record<string, unknown>;
  glyphs?: Record<string, unknown>;
}

export interface RiftWyldWoods {
  bughunter_step?: number;
  sirius_started_q_a?: boolean;
  talked_threebrothers?: string[];
  sirius_q_a_chain_done?: boolean;
  sirius_completed_q_a?: boolean;
  sirius_claimed_doubloon?: boolean;
}

export interface RiftCastle {
  unlocked_pathway_skip?: boolean;
  fairy_step?: number;
  grubber_stacks?: number;
}

export interface RiftAccess {
  charge_track_timestamp?: number;
  last_free?: number;
  consumed_prism?: boolean;
}

export interface RiftDreadfarm {
  shania_stage?: number;
  caducous_feeder_uses?: number[];
}

export interface RiftSlayerQuest {
  type: string;
  tier: number;
  start_timestamp: number;
  completion_state: number;
  used_armor: boolean;
  solo: boolean;
  combat_xp: number;
  last_killed_mob_island: string;
  recent_mob_kills: RecentMobKill[];
  spawn_timestamp: number;
}

export interface RecentMobKill {
  xp: number;
  timestamp: number;
}

export interface RiftInventory {
  inv_contents?: InventoryData;
  inv_armor?: InventoryData;
  ender_chest_contents?: InventoryData;
  ender_chest_page_icons?: null[];
  equipment_contents?: InventoryData;
}

// Accessory Bag
export interface AccessoryBagStorage {
  tuning?: Tuning;
  highest_magical_power: number;
  unlocked_powers?: string[];
  selected_power?: string;
  bag_upgrades_purchased?: number;
}

export interface Tuning {
  [slot: string]: TuningStats;
}

export interface TuningStats {
  health?: number;
  defense?: number;
  walk_speed?: number;
  strength?: number;
  critical_damage?: number;
  critical_chance?: number;
  attack_speed?: number;
  intelligence?: number;
}

// Mining Core
export interface MiningCore {
  received_free_tier: boolean;
  powder_mithril: number;
  powder_mithril_total: number;
  powder_spent_mithril: number;
  daily_ores_mined_day_mithril_ore?: number;
  daily_ores_mined_mithril_ore?: number;
  daily_ores_mined_day_gemstone?: number;
  daily_ores_mined_gemstone?: number;
  daily_ores_mined_day_glacite?: number;
  daily_ores_mined_glacite?: number;
  daily_ores_mined_day?: number;
  daily_ores_mined?: number;
  crystals?: Crystals;
  retroactive_tier2_token?: boolean;
  tokens?: number;
  greater_mines_last_access?: number;
  biomes?: MiningBiomes;
  powder_gemstone?: number;
  powder_gemstone_total?: number;
  powder_spent_gemstone?: number;
  powder_glacite?: number;
  powder_glacite_total?: number;
  powder_spent_glacite?: number;
}

export interface Crystals {
  [crystalName: string]: Crystal;
}

export interface Crystal {
  state?: string;
  total_placed?: number;
  total_found?: number;
}

export interface MiningBiomes {
  dwarven?: Record<string, unknown>;
  precursor?: PrecursorBiome;
  goblin?: GoblinBiome;
  jungle?: JungleBiome;
}

export interface PrecursorBiome {
  parts_delivered?: unknown[];
  claiming_with_precursor_apparatus?: boolean;
  talked_to_professor?: boolean;
}

export interface GoblinBiome {
  king_quest_active?: boolean;
  king_quests_completed?: number;
}

export interface JungleBiome {
  jungle_temple_open?: boolean;
  jungle_temple_chest_uses?: number;
}

// Bestiary
export interface Bestiary {
  miscellaneous?: BestiaryMiscellaneous;
  kills: Record<string, number>;
  milestone?: BestiaryMilestone;
  deaths: Record<string, number>;
  migrated_stats?: boolean;
  migration?: boolean;
}

export interface BestiaryMiscellaneous {
  max_kills_visible?: boolean;
}

export interface BestiaryMilestone {
  last_claimed_milestone?: number;
}

// Quests
export interface Quests {
  trapper_quest?: TrapperQuest;
}

export interface TrapperQuest {
  last_task_time: number;
  pelt_count: number;
}

// Player Stats
export interface PlayerStats {
  pets?: PetStats;
  mythos?: MythosStats;
  gifts?: GiftStats;
  highest_critical_damage?: number;
  highest_damage?: number;
  kills?: Record<string, number>;
  deaths?: Record<string, number>;
  winter?: WinterStats;
  candy_collected?: CandyCollected;
  auctions?: AuctionStats;
  races?: RaceStats;
  items_fished?: ItemsFished;
  end_island?: EndIslandStats;
  sea_creature_kills?: number;
  shredder_rod?: ShredderRodStats;
  glowing_mushrooms_broken?: number;
  rift?: RiftStats;
  spooky?: SpookyStats;
  shard_combat_hunts?: number;
  shard_fishing_hunts?: number;
  shard_forest_hunts?: number;
  unique_shards?: number;
  shard_trap_hunts?: number;
  shard_salt_hunts?: number;
}

export interface PetStats {
  milestone?: Record<string, number>;
  total_exp_gained?: number;
}

export interface MythosStats {
  burrows_dug_next?: BurrowStats;
  burrows_dug_combat?: BurrowStats;
  kills?: number;
  burrows_dug_treasure?: BurrowStats;
  burrows_chains_complete?: BurrowStats;
}

export interface BurrowStats {
  total: number;
  COMMON?: number;
  RARE?: number;
  LEGENDARY?: number;
  MYTHIC?: number;
  none?: number;
  null?: number;
}

export interface GiftStats {
  total_received: number;
  total_given: number;
}

export interface WinterStats {
  most_snowballs_hit?: number;
  most_damage_dealt?: number;
  most_magma_damage_dealt?: number;
  most_cannonballs_hit?: number;
}

export interface CandyCollected {
  total: number;
  green_candy: number;
  purple_candy: number;
  [festivalKey: string]: number | CandyFestival;
}

export interface CandyFestival {
  total: number;
  purple_candy?: number;
  green_candy: number;
}

export interface AuctionStats {
  bids?: number;
  highest_bid?: number;
  won?: number;
  total_bought?: ItemRarityCount;
  gold_spent?: number;
  created?: number;
  fees?: number;
  completed?: number;
  total_sold?: ItemRarityCount;
  gold_earned?: number;
  no_bids?: number;
}

export interface ItemRarityCount {
  total?: number;
  COMMON?: number;
  UNCOMMON?: number;
  RARE?: number;
  EPIC?: number;
  LEGENDARY?: number;
  MYTHIC?: number;
  SPECIAL?: number;
  ULTIMATE?: number;
}

export interface RaceStats {
  foraging_race_best_time?: number;
  end_race_best_time?: number;
  dungeon_hub?: Record<string, number>;
  chicken_race_best_time_2?: number;
  rift_race_best_time?: number;
}

export interface ItemsFished {
  total: number;
  normal: number;
  treasure: number;
  large_treasure?: number;
  trophy_fish?: number;
  outstanding?: number;
}

export interface EndIslandStats {
  dragon_fight: DragonFight;
  summoning_eyes_collected: number;
  special_zealot_loot_collected: number;
}

export interface DragonFight {
  ender_crystals_destroyed: number;
  most_damage: DragonTypeStats;
  fastest_kill: DragonTypeStats;
  highest_rank: DragonTypeStats;
  amount_summoned: DragonTypeStats;
  summoning_eyes_contributed: DragonTypeStats;
}

export interface DragonTypeStats {
  total?: number;
  unstable: number;
  old: number;
  strong: number;
  young: number;
  superior: number;
  protector: number;
  best?: number;
  wise?: number;
}

export interface ShredderRodStats {
  bait: number;
}

export interface RiftStats {
  visits: number;
  pass_consumed: number;
  lifetime_motes_earned: number;
  motes_orb_pickup: number;
  [key: string]: number | Record<string, number>;
}

export interface SpookyStats {
  bats_spawned: Record<string, number>;
}

// Forge
export interface Forge {
  forge_processes: ForgeProcesses;
}

export interface ForgeProcesses {
  [forgeSlot: string]: Record<string, unknown>;
}

// Fairy Soul
export interface FairySoul {
  unspent_souls: number;
  total_collected: number;
  fairy_exchanges?: number;
}

// Glacite Player Data
export interface GlacitePlayerData {
  fossils_donated: string[];
  fossil_dust: number;
  corpses_looted: CorpsesLooted;
  mineshafts_entered: number;
}

export interface CorpsesLooted {
  lapis: number;
  umber: number;
  tungsten: number;
  vanguard: number;
}

// Garden Player Data
export interface GardenPlayerData {
  copper: number;
  larva_consumed: number;
}

// Item Data
export interface ItemData {
  soulflow: number;
  favorite_arrow: string;
}

// Jacob's Contest
export interface JacobsContest {
  medals_inv: MedalsInventory;
  perks: JacobsPerks;
  contests: Record<string, Contest>;
  talked: boolean;
  unique_brackets?: UniqueBrackets;
  migration?: boolean;
  personal_bests?: Record<string, number>;
}

export interface MedalsInventory {
  bronze?: number;
  silver?: number;
  gold?: number;
}

export interface JacobsPerks {
  double_drops?: number;
  farming_level_cap?: number;
  personal_bests?: boolean;
}

export interface Contest {
  collected: number;
  claimed_rewards?: boolean;
  claimed_position?: number;
  claimed_participants?: number;
  claimed_medal?: string;
}

export interface UniqueBrackets {
  bronze: string[];
  silver: string[];
  gold: string[];
  diamond: string[];
  platinum: string[];
}

// Dungeons
export interface Dungeons {
  dungeon_types: DungeonTypes;
  player_classes: PlayerClasses;
  dungeon_journal: DungeonJournal;
  dungeons_blah_blah: string[];
  selected_dungeon_class: string;
  daily_runs?: DailyRuns;
  treasures: Treasures;
  dungeon_hub_race_settings: DungeonHubRaceSettings;
  last_dungeon_run?: string;
  secrets: number;
}

export interface DungeonTypes {
  catacombs: Catacombs;
  master_catacombs: MasterCatacombs;
}

export interface Catacombs {
  times_played: TierStats;
  experience: number;
  tier_completions: TierStats;
  milestone_completions: TierStats;
  fastest_time: TierStats;
  best_runs: Record<string, BestRun[]>;
  best_score: TierStats;
  mobs_killed: TierStats;
  most_mobs_killed: TierStats;
  most_damage_mage: TierStats;
  watcher_kills: TierStats;
  most_damage_berserk: TierStats;
  most_healing: TierStats;
  highest_tier_completed: number;
  most_damage_archer: TierStats;
  fastest_time_s: TierStats;
  fastest_time_s_plus: TierStats;
  most_damage_tank: TierStats;
  most_damage_healer: TierStats;
}

export interface MasterCatacombs {
  tier_completions: TierStats;
  times_played?: Record<string, unknown>;
  milestone_completions?: TierStats;
  best_score?: TierStats;
  fastest_time?: TierStats;
  highest_tier_completed?: number;
  fastest_time_s_plus?: TierStats;
  best_runs?: Record<string, BestRun[]>;
  mobs_killed?: TierStats;
  most_mobs_killed?: TierStats;
  most_damage_archer?: TierStats;
  fastest_time_s?: TierStats;
  most_damage_berserk?: TierStats;
  most_healing?: TierStats;
  most_damage_healer?: TierStats;
  most_damage_mage?: TierStats;
  watcher_kills?: Record<string, unknown>;
  most_damage_tank?: TierStats;
}

export interface TierStats {
  0?: number;
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
  6?: number;
  7?: number;
  best?: number;
  total?: number;
}

export interface BestRun {
  timestamp: number;
  score_exploration: number;
  score_speed: number;
  score_skill: number;
  score_bonus: number;
  dungeon_class: string;
  teammates: string[];
  elapsed_time: number;
  damage_dealt: number;
  deaths: number;
  mobs_killed: number;
  secrets_found: number;
  damage_mitigated: number;
  ally_healing?: number;
}

export interface PlayerClasses {
  healer: DungeonClass;
  mage: DungeonClass;
  berserk: DungeonClass;
  archer: DungeonClass;
  tank: DungeonClass;
}

export interface DungeonClass {
  experience: number;
}

export interface DungeonJournal {
  unlocked_journals: string[];
}

export interface DailyRuns {
  current_day_stamp: number;
  completed_runs_count: number;
}

export interface Treasures {
  runs?: unknown[];
  chests?: unknown[];
}

export interface DungeonHubRaceSettings {
  selected_race: string;
  selected_setting: string;
  runback: boolean;
}

// Nether Island Player Data
export interface NetherIslandPlayerData {
  quests?: NetherQuests;
  kuudra_completed_tiers: KuudraCompletedTiers;
  dojo?: Record<string, number>;
  abiphone: Abiphone;
  matriarch?: Matriarch;
  last_minibosses_killed?: string[];
  mages_reputation?: number;
  kuudra_party_finder?: KuudraPartyFinder;
  selected_faction?: string;
  barbarians_reputation?: number;
  mages_reputation_highest?: number;
}

export interface NetherQuests {
  quest_data?: QuestData;
  miniboss_data?: Record<string, boolean>;
  miniboss_daily?: Record<string, unknown>;
  kuuda_boss_daily?: Record<string, unknown>;
  quest_rewards?: Record<string, unknown>;
  [questName: string]: unknown;
}

export interface QuestData {
  fetch?: QuestProgress;
  fishing?: QuestProgress;
  wanted_mini_boss?: QuestProgress;
  dojo?: QuestProgress;
  boss?: QuestProgress;
  quest_list?: string[];
}

export interface QuestProgress {
  status: string;
  progress: number;
  completed_at: number;
}

export interface KuudraCompletedTiers {
  none?: number;
  highest_wave_none?: number;
  hot?: number;
  highest_wave_hot?: number;
  burning?: number;
  highest_wave_burning?: number;
  fiery?: number;
  highest_wave_fiery?: number;
  infernal?: number;
  highest_wave_infernal?: number;
}

export interface Abiphone {
  contact_data: Record<string, Contact>;
  games: AbiphoneGames;
  operator_chip: OperatorChip;
  active_contacts?: string[];
  trio_contact_addons?: number;
  selected_sort?: string;
  last_dye_called_year?: number;
  has_used_sirius_personal_phone_number_item?: boolean;
}

export interface Contact {
  talked_to?: boolean;
  completed_quest?: boolean;
  last_call?: number;
  dnd_enabled?: boolean;
  specific?: Record<string, unknown>;
  incoming_calls_count?: number;
  last_call_incoming?: number;
}

export interface AbiphoneGames {
  tic_tac_toe_draws?: number;
  tic_tac_toe_losses?: number;
}

export interface OperatorChip {
  repaired_index?: number;
}

export interface Matriarch {
  pearls_collected?: number;
  last_attempt?: number;
  recent_refreshes?: number[];
}

export interface KuudraPartyFinder {
  search_settings: SearchSettings;
  group_builder: GroupBuilder;
}

export interface SearchSettings {
  tier?: string;
  search?: string;
}

export interface GroupBuilder {
  tier: string;
  note: string;
  combat_level_required: number;
}

// Trophy Fish
export interface TrophyFish {
  rewards: number[];
  total_caught?: number;
  [fishName: string]: number | number[] | string | undefined;
}

// Slayer
export interface Slayer {
  slayer_bosses: SlayerBosses;
  slayer_quest?: SlayerQuest;
}

export interface SlayerBosses {
  zombie: SlayerBoss;
  spider: SlayerBoss;
  wolf: SlayerBoss;
  enderman: SlayerBoss;
  blaze: SlayerBoss;
  vampire: SlayerBoss;
}

export interface SlayerBoss {
  claimed_levels: Record<string, boolean>;
  boss_kills_tier_0?: number;
  xp?: number;
  boss_kills_tier_1?: number;
  boss_kills_tier_2?: number;
  boss_kills_tier_3?: number;
  boss_kills_tier_4?: number;
  boss_attempts_tier_0?: number;
  boss_attempts_tier_1?: number;
  boss_attempts_tier_2?: number;
  boss_attempts_tier_3?: number;
  boss_attempts_tier_4?: number;
}

export interface SlayerQuest {
  type: string;
  tier: number;
  start_timestamp: number;
  completion_state: number;
  combat_xp: number;
  recent_mob_kills: RecentMobKill[];
  last_killed_mob_island: string;
  xp_on_last_follower_spawn?: number;
}

// Inventory
export interface Inventory {
  inv_contents: InventoryData;
  ender_chest_contents: InventoryData;
  backpack_icons: Record<string, InventoryData>;
  bag_contents: BagContents;
  inv_armor: InventoryData;
  equipment_contents: InventoryData;
  personal_vault_contents: InventoryData;
  wardrobe_equipped_slot: number;
  backpack_contents: Record<string, InventoryData>;
  sacks_counts: Record<string, number>;
  wardrobe_contents: InventoryData;
}

export interface InventoryData {
  type: number;
  data: string;
}

export interface BagContents {
  potion_bag: InventoryData;
  talisman_bag: InventoryData;
  fishing_bag: InventoryData;
  sacks_bag: InventoryData;
  quiver: InventoryData;
}

// Shared Inventory
export interface SharedInventory {
  candy_inventory_contents?: InventoryData;
  carnival_mask_inventory_contents: InventoryData;
}
