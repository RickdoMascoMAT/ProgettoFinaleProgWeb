export interface PlayerRoot {
  success: boolean;
  player: Player;
}

// Component Props
export interface PlayerCardProps {
  player: Player;
  profile?: {
    cute_name: string;
    [key: string]: any;
  };
}

export interface Player {
  _id: string;
  uuid: string;
  firstLogin: number;
  playername: string;
  lastLogin: number;
  displayname: string;
  achievementsOneTime: string[];
  stats: PlayerStats;
  networkExp?: number;
  housingMeta: HousingMeta;
  achievements: { [key: string]: number };
  lastAdsenseGenerateTime: number;
  petConsumables: { [key: string]: number };
  vanityMeta: VanityMeta;
  lastLogout: number;
  network_update_book: string;
  achievementTracking: any[];
  spec_first_person: boolean;
  achievementPoints?: number;
  monthlycrates: Monthlycrates;
  challenges: Challenges;
  parkourCheckpointBests: ParkourCheckpointBests;
  parkourCompletions: ParkourCompletions;
  karma?: number;
  achievementSync: AchievementSync;
  claimed_potato_talisman: number;
  channel: string;
  achievementRewardsNew: { [key: string]: number };
  socialMedia: SocialMedia;
  skyblock_free_cookie: number;
  scorpius_bribe_96: number;
  quests: Quests;
  eugene: Eugene;
  claimed_century_cake: number;
  outfit: Outfit;
  newPackageRank: string;
  levelUp_VIP: number;
  levelUp_VIP_PLUS: number;
  adventRewards2020: AdventRewards2020;
  claimed_year143_cake: number;
  scorpius_bribe_144: number;
  userLanguage: string;
  scorpius_bribe_168: number;
  seasonal: Seasonal;
  adsense_tokens: number;
  skyblock_extra: SkyblockExtra;
  scorpius_bribe_216: number;
  leveling: Leveling;
  scorpius_bribe_240: number;
  scorpius_bribe_264: number;
  scorpius_bribe_288: number;
  rankPlusColor: string;
  scorpius_bribe_312: number;
  giftingMeta: GiftingMeta;
  tourney: Tourney;
  scorpius_bribe_336: number;
  scorpius_bribe_360: number;
  scorpius_bribe_384: number;
  monthlyPackageRank: string;
  mostRecentMonthlyPackageRank: string;
  scorpius_bribe_432: number;
  onetime_achievement_menu_sort: string;
  cachedData: CachedData;
}

export interface AchievementSync {
  quake_tiered: number;
}

export interface AdventRewards2020 {
  day1: number;
  day2: number;
  day18: number;
  day19: number;
}

export interface CachedData {
  superstarMonths: SuperstarMonths;
}

export interface SuperstarMonths {
  value: number;
  lastUpdated: number;
}

export interface Challenges {
  all_time: { [key: string]: number };
}

export interface Eugene {
  dailyTwoKExp: number;
}

export interface GiftingMeta {
  bundlesGiven: number;
  giftsGiven: number;
  realBundlesGiven: number;
}

export interface HousingMeta {
  tutorialStep: string;
  allowedBlocks: string[];
  packages: string[];
  given_cookies_105084: string[];
}

export interface Leveling {
  claimedRewards: number[];
}

export interface Monthlycrates {
  '1-2017': The12017;
  '6-2020': The12017;
  '7-2020': The12017;
  '10-2020': The12017;
  '5-2021': The102022;
  '10-2022': The102022;
}

export interface The12017 {
  REGULAR: boolean;
}

export interface The102022 {
  REGULAR: boolean;
  VIP: boolean;
  VIP_PLUS: boolean;
}

export interface Outfit {
  BOOTS: string;
  LEGGINGS: string;
  CHESTPLATE: string;
}

export interface ParkourCheckpointBests {
  Bedwars: { [key: string]: number };
  TNT: { [key: string]: number };
  Duels: { [key: string]: number };
  SkywarsAug2017: { [key: string]: number };
  Housing: { [key: string]: number };
  Prototype2025: { [key: string]: number };
}

export interface ParkourCompletions {
  Bedwars: Bedwar[];
  TNT: Bedwar[];
  Duels: Bedwar[];
  SkywarsAug2017: Bedwar[];
  Prototype2025: Bedwar[];
}

export interface Bedwar {
  timeStart: number;
  timeTook: number;
}

export interface Quests {
  skywars_halloween_harvest_2020: SkywarsHalloweenHarvest2020;
  mega_walls_win: MegaWalls;
  mega_walls_play: MegaWalls;
  mega_walls_kill: MegaWallsKill;
  mega_walls_weekly: MegaWallsWeekly;
  mega_walls_faithful: MegaWallsFaithful;
}

export interface MegaWallsFaithful {
  active: MegaWallsFaithfulActive;
}

export interface MegaWallsFaithfulActive {
  objectives: PurpleObjectives;
  started: number;
}

export interface PurpleObjectives {
  mega_walls_faithful_play: number;
}

export interface MegaWallsKill {
  completions: Completion[];
}

export interface Completion {
  time: number;
}

export interface MegaWalls {
  active: MegaWallsPlayActive;
}

export interface MegaWallsPlayActive {
  objectives: LeaderboardStatsClass;
  started: number;
}

export interface LeaderboardStatsClass {}

export interface MegaWallsWeekly {
  active: MegaWallsWeeklyActive;
}

export interface MegaWallsWeeklyActive {
  objectives: FluffyObjectives;
  started: number;
}

export interface FluffyObjectives {
  mega_walls_kill_weekly: number;
}

export interface SkywarsHalloweenHarvest2020 {
  active: SkywarsHalloweenHarvest2020_Active;
}

export interface SkywarsHalloweenHarvest2020_Active {
  objectives: TentacledObjectives;
  started: number;
}

export interface TentacledObjectives {
  skywars_halloween_kills: number;
}

export interface Seasonal {
  christmas: { [key: string]: Christmas };
  summer: { [key: string]: Christmas };
  silver: number;
  halloween: { [key: string]: Halloween };
  easter: { [key: string]: Easter };
}

export interface Christmas {
  adventRewards?: { [key: string]: number };
  levelling?: Levelling;
}

export interface Levelling {
  experience: number;
}

export interface Easter {
  levelling: Levelling;
  egghunt?: Egghunt;
}

export interface Egghunt {
  eggs: Eggs;
}

export interface Eggs {
  '0': boolean;
}

export interface Halloween {
  levelling: Levelling;
  skyBlockAlchemistIntro?: boolean;
}

export interface SkyblockExtra {
  ozanne_coins: number;
}

export interface SocialMedia {
  links: Links;
  prompt: boolean;
}

export interface Links {
  DISCORD: string;
}

export interface PlayerStats {
  Arcade: Arcade;
  SuperSmash: SuperSmash;
  SkyWars: SkyWars;
  Walls3: Walls3;
  Quake: Quake;
  GingerBread: GingerBread;
  Paintball: Paintball;
  VampireZ: VampireZ;
  BuildBattle: BuildBattle;
  SpeedUHC: SpeedUHC;
  HungerGames: HungerGames;
  TNTGames: TNTGames;
  Bedwars: Bedwars;
  UHC: Uhc;
  Pit: Pit;
  Duels: Duels;
  SkyBlock: SkyBlock;
  Battleground: Arena;
  Arena: Arena;
  Walls: Arena;
  MCGO: Mcgo;
  TrueCombat: Arena;
  Legacy: Legacy;
  MurderMystery: MurderMystery;
  Housing: VanityMeta;
  WoolGames: WoolGames;
  MainLobby: MainLobby;
}

export interface Arcade {
  coins: number;
  monthly_coins_a: number;
  weekly_coins_a: number;
  deaths_oneinthequiver: number;
  kills_oneinthequiver: number;
  monthly_coins_b: number;
  music: boolean;
  goals_soccer: number;
  dec2016_achievements2: boolean;
  dec2016_achievements: boolean;
  rounds_simon_says: number;
  lastTourneyAd: number;
  stamp_level: number;
  dropper: Dropper;
  party_pooper_seeker_wins_hide_and_seek: number;
  seeker_wins_hide_and_seek: number;
}

export interface Dropper {
  games_played: number;
  map_stats: MapStats;
  maps_completed: number;
  fails: number;
  fastest_game: number;
  games_finished: number;
}

export interface MapStats {
  bbq: Atlantis;
  city: Atlantis;
  distance: Distance;
  sewer: Atlantis;
  toilet: Distance;
  mushroom: Atlantis;
  atlantis: Atlantis;
  kingdommines: Atlantis;
  maelstrom: Atlantis;
  mineshaft: Atlantis;
  raindrops: Atlantis;
  balloons: Atlantis;
  cabin: Atlantis;
  drainage: Atlantis;
  microscope: Atlantis;
  ufo: Atlantis;
  launchzone: Atlantis;
  warp: Atlantis;
  nightlife: Atlantis;
  sandworm: Atlantis;
  gears: Atlantis;
  space: Atlantis;
  boardgames: Atlantis;
  butterflies: Atlantis;
  retro: Atlantis;
  kraken: Atlantis;
  lavafall: Atlantis;
  overgrown: Atlantis;
  hellgate: Atlantis;
  kingspass: Atlantis;
  warportal: Atlantis;
  well: Atlantis;
  castle: Atlantis;
  floatingislands: Atlantis;
  upsidedown: Atlantis;
  glacier: Atlantis;
  ocean: Atlantis;
  western: Atlantis;
}

export interface Atlantis {
  best_time: number;
  completions: number;
}

export interface Distance {
  best_time: number;
}

export interface Arena {
  coins: number;
}

export interface Bedwars {
  packages: string[];
  Experience: number;
  first_join_7: boolean;
  bedwars_boxes: number;
  games_played_bedwars_1: number;
  winstreak: number;
  gold_resources_collected_bedwars: number;
  eight_one_losses_bedwars: number;
  losses_bedwars: number;
  games_played_bedwars: number;
  eight_one_iron_resources_collected_bedwars: number;
  eight_one_games_played_bedwars: number;
  eight_one_resources_collected_bedwars: number;
  iron_resources_collected_bedwars: number;
  eight_one_gold_resources_collected_bedwars: number;
  resources_collected_bedwars: number;
  favourites_2: string;
  eight_two_winstreak: number;
  final_deaths_bedwars: number;
  void_deaths_bedwars: number;
  eight_two_void_deaths_bedwars: number;
  void_kills_bedwars: number;
  diamond_resources_collected_bedwars: number;
  deaths_bedwars: number;
  entity_attack_final_deaths_bedwars: number;
  emerald_resources_collected_bedwars: number;
  eight_two_emerald_resources_collected_bedwars: number;
  eight_two_resources_collected_bedwars: number;
  eight_two_diamond_resources_collected_bedwars: number;
  coins: number;
  eight_two_kills_bedwars: number;
  eight_two_iron_resources_collected_bedwars: number;
  eight_two_void_kills_bedwars: number;
  beds_lost_bedwars: number;
  kills_bedwars: number;
  eight_two_final_deaths_bedwars: number;
  eight_two_deaths_bedwars: number;
  eight_two__items_purchased_bedwars: number;
  eight_two_entity_attack_final_deaths_bedwars: number;
  eight_two_games_played_bedwars: number;
  eight_two_items_purchased_bedwars: number;
  eight_two_beds_lost_bedwars: number;
  eight_two_entity_attack_deaths_bedwars: number;
  eight_two_gold_resources_collected_bedwars: number;
  entity_attack_deaths_bedwars: number;
  items_purchased_bedwars: number;
  eight_two_losses_bedwars: number;
  _items_purchased_bedwars: number;
  four_four_winstreak: number;
  four_four_iron_resources_collected_bedwars: number;
  four_four__items_purchased_bedwars: number;
  four_four_games_played_bedwars: number;
  four_four_wins_bedwars: number;
  wins_bedwars: number;
  four_four_resources_collected_bedwars: number;
  four_four_void_deaths_bedwars: number;
  four_four_items_purchased_bedwars: number;
  four_four_deaths_bedwars: number;
  four_four_gold_resources_collected_bedwars: number;
  four_four_emerald_resources_collected_bedwars: number;
  eight_one_winstreak: number;
  eight_one__items_purchased_bedwars: number;
  eight_one_beds_lost_bedwars: number;
  eight_one_deaths_bedwars: number;
  eight_one_diamond_resources_collected_bedwars: number;
  eight_one_final_deaths_bedwars: number;
  eight_one_items_purchased_bedwars: number;
  eight_one_void_deaths_bedwars: number;
  eight_one_void_final_deaths_bedwars: number;
  void_final_deaths_bedwars: number;
  beds_broken_bedwars: number;
  eight_one_beds_broken_bedwars: number;
  eight_one_entity_attack_deaths_bedwars: number;
  eight_one_entity_attack_final_deaths_bedwars: number;
  eight_one_entity_attack_final_kills_bedwars: number;
  eight_one_entity_attack_kills_bedwars: number;
  eight_one_final_kills_bedwars: number;
  eight_one_kills_bedwars: number;
  'eight_one_permanent _items_purchased_bedwars': number;
  entity_attack_final_kills_bedwars: number;
  entity_attack_kills_bedwars: number;
  final_kills_bedwars: number;
  'permanent _items_purchased_bedwars': number;
  eight_one_magic_deaths_bedwars: number;
  magic_deaths_bedwars: number;
  eight_one_permanent_items_purchased_bedwars: number;
  permanent_items_purchased_bedwars: number;
  eight_one_void_kills_bedwars: number;
  eight_one_emerald_resources_collected_bedwars: number;
  eight_one_void_final_kills_bedwars: number;
  void_final_kills_bedwars: number;
  eight_one_magic_final_deaths_bedwars: number;
  magic_final_deaths_bedwars: number;
  bedwars_christmas_boxes: number;
  free_event_key_bedwars_christmas_boxes_2020: boolean;
  eight_one_wins_bedwars: number;
  eight_one_fall_kills_bedwars: number;
  fall_kills_bedwars: number;
  four_four_beds_lost_bedwars: number;
  four_four_entity_attack_final_deaths_bedwars: number;
  four_four_entity_attack_final_kills_bedwars: number;
  four_four_entity_attack_kills_bedwars: number;
  four_four_final_deaths_bedwars: number;
  four_four_final_kills_bedwars: number;
  four_four_kills_bedwars: number;
  four_four_losses_bedwars: number;
  four_three_winstreak: number;
  four_three__items_purchased_bedwars: number;
  four_three_beds_lost_bedwars: number;
  four_three_diamond_resources_collected_bedwars: number;
  four_three_emerald_resources_collected_bedwars: number;
  four_three_entity_attack_final_deaths_bedwars: number;
  four_three_entity_attack_kills_bedwars: number;
  four_three_final_deaths_bedwars: number;
  four_three_games_played_bedwars: number;
  four_three_gold_resources_collected_bedwars: number;
  four_three_iron_resources_collected_bedwars: number;
  four_three_items_purchased_bedwars: number;
  four_three_kills_bedwars: number;
  four_three_losses_bedwars: number;
  four_three_resources_collected_bedwars: number;
  four_three_final_kills_bedwars: number;
  four_three_void_final_kills_bedwars: number;
  four_three_void_kills_bedwars: number;
  four_three_wins_bedwars: number;
  four_three_entity_attack_final_kills_bedwars: number;
  four_three_deaths_bedwars: number;
  four_three_entity_attack_deaths_bedwars: number;
  lastTourneyAd: number;
  slumber: Slumber;
  four_four_entity_attack_deaths_bedwars: number;
  four_four_magic_deaths_bedwars: number;
}

export interface Slumber {
  fredgie: Fredgie;
  quest: Quest;
}

export interface Fredgie {
  should_update_index: boolean;
  dialogue_index: number;
}

export interface Quest {
  gambler_george: GamblerGeorge;
}

export interface GamblerGeorge {
  won_last_game: boolean;
  gamble_games_won: number;
}

export interface BuildBattle {
  wins_solo_normal: number;
  wins: number;
  buildbattle_loadout: string[];
  coins: number;
  games_played: number;
  monthly_coins_a: number;
  score: number;
  solo_most_points: number;
  total_votes: number;
  weekly_coins_a: number;
  votes_Tooth: number;
  monthly_coins_b: number;
  weekly_coins_b: number;
}

export interface Duels {
  bow_rookie_title_prestige: number;
  op_rookie_title_prestige: number;
  classic_rookie_title_prestige: number;
  skywars_rookie_title_prestige: number;
  tnt_games_rookie_title_prestige: number;
  mega_walls_rookie_title_prestige: number;
  sumo_rookie_title_prestige: number;
  uhc_rookie_title_prestige: number;
  combo_rookie_title_prestige: number;
  all_modes_rookie_title_prestige: number;
  blitz_rookie_title_prestige: number;
  no_debuff_rookie_title_prestige: number;
  bridge_rookie_title_prestige: number;
  duels_recently_played2: string;
  show_lb_option: string;
  selected_2_new: string;
  selected_1_new: string;
  chat_enabled: string;
  games_played_duels: number;
  current_uhc_winstreak: number;
  current_winstreak_mode_uhc_duel: number;
  current_winstreak: number;
  blocks_placed: number;
  bow_hits: number;
  bow_shots: number;
  damage_dealt: number;
  deaths: number;
  golden_apples_eaten: number;
  health_regenerated: number;
  losses: number;
  melee_hits: number;
  melee_swings: number;
  rounds_played: number;
  uhc_duel_blocks_placed: number;
  uhc_duel_bow_hits: number;
  uhc_duel_bow_shots: number;
  uhc_duel_damage_dealt: number;
  uhc_duel_deaths: number;
  uhc_duel_golden_apples_eaten: number;
  uhc_duel_health_regenerated: number;
  uhc_duel_losses: number;
  uhc_duel_melee_hits: number;
  uhc_duel_melee_swings: number;
  uhc_duel_rounds_played: number;
  maps_won_on: string[];
  best_winstreak_mode_uhc_duel: number;
  best_overall_winstreak: number;
  best_uhc_winstreak: number;
  coins: number;
  kills: number;
  uhc_duel_kills: number;
  uhc_duel_wins: number;
  wins: number;
  current_classic_winstreak: number;
  best_winstreak_mode_classic_duel: number;
  best_classic_winstreak: number;
  current_winstreak_mode_classic_duel: number;
  classic_duel_bow_shots: number;
  classic_duel_damage_dealt: number;
  classic_duel_health_regenerated: number;
  classic_duel_kills: number;
  classic_duel_melee_hits: number;
  classic_duel_melee_swings: number;
  classic_duel_rounds_played: number;
  classic_duel_wins: number;
  classic_duel_bow_hits: number;
  classic_duel_deaths: number;
  classic_duel_losses: number;
  current_winstreak_mode_sumo_duel: number;
  current_sumo_winstreak: number;
  sumo_duel_losses: number;
  sumo_duel_melee_hits: number;
  sumo_duel_melee_swings: number;
  sumo_duel_rounds_played: number;
  duels_winstreak_best_classic_duel: number;
  leaderboardPage_win_streak: number;
  current_op_winstreak: number;
  current_winstreak_mode_op_duel: number;
  op_duel_damage_dealt: number;
  op_duel_deaths: number;
  op_duel_health_regenerated: number;
  op_duel_losses: number;
  op_duel_melee_hits: number;
  op_duel_melee_swings: number;
  op_duel_rounds_played: number;
  best_op_winstreak: number;
  best_winstreak_mode_op_duel: number;
  op_duel_kills: number;
  op_duel_wins: number;
  duels_winstreak_best_op_duel: number;
  current_winstreak_mode_op_doubles: number;
  op_doubles_damage_dealt: number;
  op_doubles_deaths: number;
  op_doubles_health_regenerated: number;
  op_doubles_losses: number;
  op_doubles_melee_hits: number;
  op_doubles_melee_swings: number;
  op_doubles_rounds_played: number;
  best_bridge_winstreak: number;
  bridgeMapWins: string[];
  current_bridge_winstreak: number;
  current_winstreak_mode_bridge_duel: number;
  best_winstreak_mode_bridge_duel: number;
  bridge_duel_rounds_played: number;
  bridge_duel_wins: number;
  bridge_deaths: number;
  bridge_duel_blocks_placed: number;
  bridge_duel_bow_hits: number;
  bridge_duel_bow_shots: number;
  bridge_duel_bridge_deaths: number;
  bridge_duel_bridge_kills: number;
  bridge_duel_damage_dealt: number;
  bridge_duel_health_regenerated: number;
  bridge_duel_losses: number;
  bridge_duel_melee_hits: number;
  bridge_duel_melee_swings: number;
  bridge_kills: number;
  current_winstreak_mode_uhc_doubles: number;
  uhc_doubles_blocks_placed: number;
  uhc_doubles_bow_hits: number;
  uhc_doubles_bow_shots: number;
  uhc_doubles_damage_dealt: number;
  uhc_doubles_deaths: number;
  uhc_doubles_golden_apples_eaten: number;
  uhc_doubles_health_regenerated: number;
  uhc_doubles_losses: number;
  uhc_doubles_melee_hits: number;
  uhc_doubles_melee_swings: number;
  uhc_doubles_rounds_played: number;
  best_winstreak_mode_uhc_doubles: number;
  uhc_doubles_wins: number;
  duels_winstreak_best_uhc_doubles: number;
  uhc_doubles_kills: number;
  duels_winstreak_best_uhc_duel: number;
  sumo_duel_deaths: number;
  mw_duels_class: string;
  blitz_duels_kit: string;
  best_blitz_winstreak: number;
  best_winstreak_mode_blitz_duel: number;
  current_winstreak_mode_blitz_duel: number;
  current_blitz_winstreak: number;
  blitz_duel_blocks_placed: number;
  blitz_duel_damage_dealt: number;
  blitz_duel_health_regenerated: number;
  blitz_duel_kills: number;
  blitz_duel_kit_wins: number;
  blitz_duel_knight_kit_wins: number;
  blitz_duel_melee_hits: number;
  blitz_duel_melee_swings: number;
  blitz_duel_rounds_played: number;
  blitz_duel_wins: number;
  kit_wins: number;
  knight_kit_wins: number;
  best_winstreak_mode_sumo_duel: number;
  best_sumo_winstreak: number;
  sumo_duel_kills: number;
  sumo_duel_wins: number;
  duels_winstreak_best_sumo_duel: number;
  current_winstreak_mode_bow_duel: number;
  best_winstreak_mode_bow_duel: number;
  current_bow_winstreak: number;
  best_bow_winstreak: number;
  bow_duel_bow_hits: number;
  bow_duel_bow_shots: number;
  bow_duel_damage_dealt: number;
  bow_duel_health_regenerated: number;
  bow_duel_kills: number;
  bow_duel_rounds_played: number;
  bow_duel_wins: number;
  bow_duel_deaths: number;
  bow_duel_losses: number;
  current_mega_walls_winstreak: number;
  current_winstreak_mode_mw_duel: number;
  mw_duel_blocks_placed: number;
  mw_duel_bow_hits: number;
  mw_duel_bow_shots: number;
  mw_duel_damage_dealt: number;
  mw_duel_deaths: number;
  mw_duel_health_regenerated: number;
  mw_duel_losses: number;
  mw_duel_melee_hits: number;
  mw_duel_melee_swings: number;
  mw_duel_rounds_played: number;
  current_combo_winstreak: number;
  current_winstreak_mode_combo_duel: number;
  combo_duel_deaths: number;
  combo_duel_golden_apples_eaten: number;
  combo_duel_health_regenerated: number;
  combo_duel_losses: number;
  combo_duel_melee_hits: number;
  combo_duel_melee_swings: number;
  combo_duel_rounds_played: number;
  current_winstreak_mode_potion_duel: number;
  current_no_debuff_winstreak: number;
  heal_pots_used: number;
  potion_duel_damage_dealt: number;
  potion_duel_deaths: number;
  potion_duel_heal_pots_used: number;
  potion_duel_health_regenerated: number;
  potion_duel_losses: number;
  potion_duel_melee_hits: number;
  potion_duel_melee_swings: number;
  potion_duel_rounds_played: number;
  sw_duels_kit_new3: string;
  current_skywars_winstreak: number;
  current_winstreak_mode_sw_duel: number;
  sw_duel_blocks_placed: number;
  sw_duel_damage_dealt: number;
  sw_duel_deaths: number;
  sw_duel_health_regenerated: number;
  sw_duel_losses: number;
  sw_duel_melee_hits: number;
  sw_duel_melee_swings: number;
  sw_duel_rounds_played: number;
  current_winstreak_mode_bowspleef_duel: number;
  current_tnt_games_winstreak: number;
  bowspleef_duel_bow_shots: number;
  bowspleef_duel_deaths: number;
  bowspleef_duel_losses: number;
  bowspleef_duel_rounds_played: number;
  blitz_duel_bow_shots: number;
  blitz_duel_deaths: number;
  blitz_duel_losses: number;
  blitz_duel_bow_hits: number;
  duels_winstreak_best_bow_duel: number;
  sw_duel_bow_shots: number;
  bridge_duel_goals: number;
  goals: number;
  best_skywars_winstreak: number;
  best_winstreak_mode_sw_duel: number;
  bowman_kit_wins: number;
  sw_duel_bowman_kit_wins: number;
  sw_duel_kit_wins: number;
  sw_duel_wins: number;
  sw_duel_bow_hits: number;
  sw_doubles_bow_hits: number;
  sw_doubles_bow_shots: number;
  sw_doubles_damage_dealt: number;
  sw_doubles_health_regenerated: number;
  sw_doubles_melee_hits: number;
  sw_doubles_melee_swings: number;
  sw_doubles_rounds_played: number;
  sw_doubles_blocks_placed: number;
  best_winstreak_mode_combo_duel: number;
  best_combo_winstreak: number;
  combo_duel_kills: number;
  combo_duel_wins: number;
  duels_winstreak_best_combo_duel: number;
  sw_duel_kills: number;
  duels_winstreak_best_sw_duel: number;
  current_winstreak_mode_uhc_meetup: number;
  uhc_meetup_blocks_placed: number;
  uhc_meetup_bow_hits: number;
  uhc_meetup_bow_shots: number;
  uhc_meetup_damage_dealt: number;
  uhc_meetup_deaths: number;
  uhc_meetup_health_regenerated: number;
  uhc_meetup_losses: number;
  uhc_meetup_melee_hits: number;
  uhc_meetup_melee_swings: number;
  uhc_meetup_rounds_played: number;
  enderman_kit_wins: number;
  sw_duel_enderman_kit_wins: number;
  batguy_kit_wins: number;
  sw_duel_batguy_kit_wins: number;
  best_winstreak_mode_bowspleef_duel: number;
  best_tnt_games_winstreak: number;
  bowspleef_duel_wins: number;
  scout_kit_wins: number;
  sw_duel_scout_kit_wins: number;
  current_winstreak_mode_bridge_four: number;
  best_winstreak_mode_bridge_four: number;
  bridge_four_blocks_placed: number;
  bridge_four_bow_hits: number;
  bridge_four_bow_shots: number;
  bridge_four_bridge_deaths: number;
  bridge_four_bridge_kills: number;
  bridge_four_damage_dealt: number;
  bridge_four_goals: number;
  bridge_four_health_regenerated: number;
  bridge_four_melee_hits: number;
  bridge_four_melee_swings: number;
  bridge_four_rounds_played: number;
  bridge_four_wins: number;
  duels_winstreak_best_bridge_four: number;
  current_winstreak_mode_uhc_four: number;
  best_winstreak_mode_uhc_four: number;
  uhc_four_bow_shots: number;
  uhc_four_damage_dealt: number;
  uhc_four_golden_apples_eaten: number;
  uhc_four_melee_hits: number;
  uhc_four_melee_swings: number;
  uhc_four_rounds_played: number;
  uhc_four_wins: number;
  duels_winstreak_best_uhc_four: number;
  uhc_four_blocks_placed: number;
  uhc_four_bow_hits: number;
  uhc_four_deaths: number;
  uhc_four_health_regenerated: number;
  uhc_four_kills: number;
  uhc_four_losses: number;
  moved_to_redis_3: boolean;
  parkour_rookie_title_prestige: number;
  boxing_rookie_title_prestige: number;
  rematch_option_1: string;
  boxing_duel_melee_hits: number;
  boxing_duel_melee_swings: number;
  boxing_duel_rounds_played: number;
  bridge_duel_golden_apples_eaten: number;
  best_all_modes_winstreak: number;
  best_arena_winstreak: number;
  best_mega_walls_winstreak: number;
  best_no_debuff_winstreak: number;
  best_parkour_winstreak: number;
  best_boxing_winstreak: number;
  best_winstreak_mode_boxing_duel: number;
  current_winstreak_mode_boxing_duel: number;
  current_boxing_winstreak: number;
  boxing_duel_wins: number;
  combo_duel_damage_dealt: number;
}

export interface GingerBread {
  helmet_active: string;
  shoes_active: string;
  booster_active: string;
  packages: string[];
  pants_active: string;
  jacket_active: string;
  engine_active: string;
  skin_active: string;
  frame_active: string;
  coins: number;
  lastTourneyAd: number;
}

export interface VanityMeta {
  packages: string[];
}

export interface HungerGames {
  packages: string[];
  coins: number;
  lastTourneyAd: number;
  wins_backup: number;
  autoarmor: boolean;
  wins: number;
  wins_solo_normal: number;
  wins_teams_normal: number;
}

export interface Legacy {
  tokens: number;
  total_tokens: number;
  vampirez_tokens: number;
  next_tokens_seconds: number;
  quakecraft_tokens: number;
}

export interface Mcgo {
  coins: number;
  pocket_change: number;
  kills_deathmatch: number;
  game_wins: number;
  kills: number;
  game_wins_deathmatch: number;
  grenade_kills: number;
  grenadeKills: number;
  headshot_kills: number;
  packages: string[];
  bombs_defused: number;
  bombs_planted: number;
  lastTourneyAd: number;
}

export interface MainLobby {
  questNPCTutorials: QuestNPCTutorials;
}

export interface QuestNPCTutorials {
  christmas_guide_2024: boolean;
  easter_guide_2025: boolean;
}

export interface MurderMystery {
  murdermystery_books: string[];
  mm_christmas_chests: number;
  coins: number;
  coins_pickedup: number;
  coins_pickedup_MURDER_CLASSIC: number;
  coins_pickedup_headquarters: number;
  coins_pickedup_headquarters_MURDER_CLASSIC: number;
  games: number;
  games_MURDER_CLASSIC: number;
  games_headquarters: number;
  games_headquarters_MURDER_CLASSIC: number;
  wins: number;
  wins_MURDER_CLASSIC: number;
  wins_headquarters: number;
  wins_headquarters_MURDER_CLASSIC: number;
  coins_pickedup_hollywood: number;
  coins_pickedup_hollywood_MURDER_CLASSIC: number;
  games_hollywood: number;
  games_hollywood_MURDER_CLASSIC: number;
  wins_hollywood: number;
  wins_hollywood_MURDER_CLASSIC: number;
  coins_pickedup_archives_top_floor: number;
  coins_pickedup_archives_top_floor_MURDER_CLASSIC: number;
  games_archives_top_floor: number;
  games_archives_top_floor_MURDER_CLASSIC: number;
  wins_archives_top_floor: number;
  wins_archives_top_floor_MURDER_CLASSIC: number;
  coins_pickedup_cattleridge_farm: number;
  coins_pickedup_cattleridge_farm_MURDER_CLASSIC: number;
  games_cattleridge_farm: number;
  games_cattleridge_farm_MURDER_CLASSIC: number;
  wins_cattleridge_farm: number;
  wins_cattleridge_farm_MURDER_CLASSIC: number;
  bow_kills: number;
  bow_kills_MURDER_CLASSIC: number;
  bow_kills_archives_top_floor: number;
  bow_kills_archives_top_floor_MURDER_CLASSIC: number;
  deaths: number;
  deaths_MURDER_CLASSIC: number;
  deaths_archives_top_floor: number;
  deaths_archives_top_floor_MURDER_CLASSIC: number;
  kills: number;
  kills_MURDER_CLASSIC: number;
  kills_archives_top_floor: number;
  kills_archives_top_floor_MURDER_CLASSIC: number;
  coins_pickedup_snowglobe: number;
  coins_pickedup_snowglobe_MURDER_CLASSIC: number;
  games_snowglobe: number;
  games_snowglobe_MURDER_CLASSIC: number;
  wins_snowglobe: number;
  wins_snowglobe_MURDER_CLASSIC: number;
  coins_pickedup_gold_rush: number;
  coins_pickedup_gold_rush_MURDER_CLASSIC: number;
  games_gold_rush: number;
  games_gold_rush_MURDER_CLASSIC: number;
  deaths_headquarters: number;
  deaths_headquarters_MURDER_CLASSIC: number;
  coins_pickedup_library: number;
  coins_pickedup_library_MURDER_CLASSIC: number;
  deaths_library: number;
  deaths_library_MURDER_CLASSIC: number;
  games_library: number;
  games_library_MURDER_CLASSIC: number;
  wins_library: number;
  wins_library_MURDER_CLASSIC: number;
  deaths_gold_rush: number;
  deaths_gold_rush_MURDER_CLASSIC: number;
  wins_gold_rush: number;
  wins_gold_rush_MURDER_CLASSIC: number;
  packages: string[];
  deaths_snowfall: number;
  deaths_snowfall_MURDER_CLASSIC: number;
  games_snowfall: number;
  games_snowfall_MURDER_CLASSIC: number;
}

export interface Paintball {
  packages: string[];
  coins: number;
}

export interface Pit {
  profile: PitProfile;
  pit_stats_ptl: { [key: string]: number };
}

export interface PitProfile {
  moved_achievements_1: boolean;
  outgoing_offers: any[];
  moved_achievements_2: boolean;
  leaderboard_stats: LeaderboardStatsClass;
  last_save: number;
  king_quest: KingQuest;
  inv_armor: InvArmor;
  item_stash: InvArmor;
  login_messages: string[];
  spire_stash_inv: InvArmor;
  xp: number;
  inv_contents: InvArmor;
  zero_point_three_gold_transfer: boolean;
  inv_enderchest: InvArmor;
  bounties: any[];
  spire_stash_armor: InvArmor;
  cash: number;
  cash_during_prestige_0: number;
}

export interface InvArmor {
  type: number;
  data: number[];
}

export interface KingQuest {
  kills: number;
}

export interface Quake {
  packages: string[];
  coins: number;
  lastTourneyAd: number;
  compass_selected: boolean;
  alternative_gun_cooldown_indicator: boolean;
  enable_sound: boolean;
  "messageOthers' Kills/deaths": boolean;
  'messageYour Kills': boolean;
  messageCoin: boolean;
  highest_killstreak: number;
  instantRespawn: boolean;
  'messageYour Deaths': boolean;
  showDashCooldown: boolean;
  'messageMulti-kills': boolean;
  messageKillstreaks: boolean;
  kills: number;
  headshots: number;
  distance_travelled: number;
  shots_fired: number;
  kills_since_update_feb_2017: number;
  deaths: number;
}

export interface SkyBlock {
  profiles: { [key: string]: ProfileValue };
}

export interface ProfileValue {
  profile_id: string;
  cute_name: string;
}

export interface SkyWars {
  packages: string[];
  killstreak: number;
  win_streak: number;
  coins: number;
  losses: number;
  losses_kit_basic_solo_default: number;
  deaths_kit_basic_solo_default: number;
  deaths_solo_insane: number;
  deaths: number;
  losses_solo_insane: number;
  deaths_solo: number;
  quits: number;
  losses_solo: number;
  survived_players_solo: number;
  survived_players: number;
  survived_players_kit_basic_solo_default: number;
  games_solo: number;
  arrows_hit: number;
  games: number;
  games_kit_basic_solo_default: number;
  arrows_shot: number;
  blocks_placed: number;
  blocks_broken: number;
  souls: number;
  levelFormatted: string;
  activeKit_SOLO: string;
  activeKit_SOLO_random: boolean;
  games_played_skywars: number;
  chests_opened: number;
  chests_opened_kit_basic_solo_default: number;
  chests_opened_solo: number;
  deaths_solo_normal: number;
  lastMode: string;
  losses_solo_normal: number;
  time_played: number;
  time_played_kit_basic_solo_default: number;
  time_played_solo: number;
  arrows_hit_kit_basic_solo_default: number;
  arrows_hit_solo: number;
  arrows_shot_kit_basic_solo_default: number;
  arrows_shot_solo: number;
  egg_thrown: number;
  longest_bow_shot: number;
  longest_bow_shot_kit_basic_solo_default: number;
  longest_bow_shot_solo: number;
  chests_opened_kit_mining_team_default: number;
  deaths_kit_mining_team_default: number;
  games_kit_mining_team_default: number;
  losses_kit_mining_team_default: number;
  survived_players_kit_mining_team_default: number;
  time_played_kit_mining_team_default: number;
  arrows_hit_kit_mining_team_default: number;
  arrows_shot_kit_mining_team_default: number;
  assists: number;
  assists_kit_mining_team_default: number;
  assists_solo: number;
  longest_bow_shot_kit_mining_team_default: number;
  skywars_experience: number;
  kills: number;
  kills_kit_mining_team_default: number;
  kills_monthly_b: number;
  kills_solo: number;
  kills_solo_insane: number;
  kills_weekly_b: number;
  longest_bow_kill: number;
  longest_bow_kill_kit_mining_team_default: number;
  longest_bow_kill_solo: number;
  melee_kills: number;
  melee_kills_kit_mining_team_default: number;
  melee_kills_solo: number;
  most_kills_game: number;
  most_kills_game_kit_mining_team_default: number;
  most_kills_game_solo: number;
  souls_gathered: number;
  assists_kit_basic_solo_default: number;
  activeKit_MEGA: string;
  activeKit_MEGA_random: boolean;
  kills_kit_basic_solo_default: number;
  kills_solo_normal: number;
  most_kills_game_kit_basic_solo_default: number;
  void_kills: number;
  void_kills_kit_basic_solo_default: number;
  void_kills_solo: number;
  longest_bow_kill_kit_basic_solo_default: number;
  melee_kills_kit_basic_solo_default: number;
  activeKit_TEAMS: string;
  activeKit_TEAMS_random: boolean;
  chests_opened_team: number;
  deaths_team: number;
  deaths_team_insane: number;
  losses_team: number;
  losses_team_insane: number;
  survived_players_team: number;
  time_played_team: number;
  kills_team: number;
  kills_team_insane: number;
  void_kills_kit_mining_team_default: number;
  void_kills_team: number;
  arrows_hit_team: number;
  arrows_shot_team: number;
  longest_bow_kill_team: number;
  longest_bow_shot_team: number;
  melee_kills_team: number;
  most_kills_game_team: number;
  bow_kills: number;
  bow_kills_kit_mining_team_default: number;
  bow_kills_team: number;
  slime_explained: number;
  slime_explained_last: number;
  blocks_placed_lab: number;
  chests_opened_lab: number;
  chests_opened_lab_kit_defending_team_frog: number;
  chests_opened_lab_solo: number;
  coins_gained_lab: number;
  deaths_lab: number;
  deaths_lab_kit_defending_team_frog: number;
  deaths_lab_solo: number;
  losses_lab: number;
  losses_lab_kit_defending_team_frog: number;
  losses_lab_solo: number;
  quits_lab: number;
  survived_players_lab: number;
  survived_players_lab_kit_defending_team_frog: number;
  survived_players_lab_solo: number;
  time_played_lab: number;
  time_played_lab_kit_defending_team_frog: number;
  time_played_lab_solo: number;
  win_streak_lab: number;
  chests_opened_kit_defending_team_frog: number;
  deaths_kit_defending_team_frog: number;
  games_kit_defending_team_frog: number;
  losses_kit_defending_team_frog: number;
  survived_players_kit_defending_team_frog: number;
  time_played_kit_defending_team_frog: number;
  arrows_shot_kit_defending_team_frog: number;
  kills_kit_defending_team_frog: number;
  longest_bow_kill_kit_defending_team_frog: number;
  melee_kills_kit_defending_team_frog: number;
  most_kills_game_kit_defending_team_frog: number;
  void_kills_kit_defending_team_frog: number;
  arrows_hit_kit_defending_team_frog: number;
  longest_bow_shot_kit_defending_team_frog: number;
  enderpearls_thrown: number;
  heads: number;
  heads_eww: number;
  heads_eww_kit_defending_team_frog: number;
  heads_eww_solo: number;
  heads_kit_defending_team_frog: number;
  heads_meh: number;
  heads_meh_kit_defending_team_frog: number;
  heads_meh_solo: number;
  heads_solo: number;
  kills_weekly_a: number;
  head_collection: HeadCollection;
  lucky_explained: number;
  lucky_explained_last: number;
  arrows_shot_lab: number;
  arrows_shot_lab_kit_defending_team_frog: number;
  arrows_shot_lab_solo: number;
  blocks_broken_lab: number;
  kills_lab: number;
  kills_lab_kit_defending_team_frog: number;
  kills_lab_solo: number;
  melee_kills_lab: number;
  melee_kills_lab_kit_defending_team_frog: number;
  melee_kills_lab_solo: number;
  souls_gathered_lab: number;
  games_lab: number;
  games_lab_kit_defending_team_frog: number;
  games_lab_solo: number;
  assists_kit_defending_team_frog: number;
  chests_opened_kit_ranked_ranked_default: number;
  chests_opened_ranked: number;
  deaths_kit_ranked_ranked_default: number;
  deaths_ranked: number;
  deaths_ranked_normal: number;
  games_kit_ranked_ranked_default: number;
  games_ranked: number;
  kills_kit_ranked_ranked_default: number;
  kills_ranked: number;
  kills_ranked_normal: number;
  losses_kit_ranked_ranked_default: number;
  losses_ranked: number;
  losses_ranked_normal: number;
  most_kills_game_kit_ranked_ranked_default: number;
  most_kills_game_ranked: number;
  survived_players_kit_ranked_ranked_default: number;
  survived_players_ranked: number;
  time_played_kit_ranked_ranked_default: number;
  time_played_ranked: number;
  void_kills_kit_ranked_ranked_default: number;
  void_kills_ranked: number;
  fall_kills: number;
  fall_kills_kit_defending_team_frog: number;
  fall_kills_team: number;
  kills_monthly_a: number;
  fastest_win: number;
  fastest_win_kit_defending_team_frog: number;
  fastest_win_solo: number;
  killstreak_kit_defending_team_frog: number;
  killstreak_solo: number;
  wins: number;
  wins_kit_defending_team_frog: number;
  wins_solo: number;
  wins_solo_insane: number;
  deaths_kit_mega_mega_default: number;
  deaths_mega: number;
  deaths_mega_normal: number;
  losses_kit_mega_mega_default: number;
  losses_mega: number;
  losses_mega_normal: number;
  survived_players_kit_mega_mega_default: number;
  survived_players_mega: number;
  time_played_kit_mega_mega_default: number;
  time_played_mega: number;
  arrows_shot_kit_mega_mega_default: number;
  arrows_shot_mega: number;
  refill_chest_destroy: number;
  longest_bow_kill_kit_ranked_ranked_default: number;
  longest_bow_kill_ranked: number;
  melee_kills_kit_ranked_ranked_default: number;
  melee_kills_ranked: number;
  heads_kit_basic_solo_default: number;
  heads_meh_kit_basic_solo_default: number;
  heads_salty: number;
  heads_salty_kit_defending_team_frog: number;
  heads_salty_solo: number;
  fall_kills_solo: number;
  fastest_win_kit_supporting_team_ecologist: number;
  games_kit_supporting_team_ecologist: number;
  kills_kit_supporting_team_ecologist: number;
  killstreak_kit_supporting_team_ecologist: number;
  longest_bow_kill_kit_supporting_team_ecologist: number;
  melee_kills_kit_supporting_team_ecologist: number;
  most_kills_game_kit_supporting_team_ecologist: number;
  survived_players_kit_supporting_team_ecologist: number;
  time_played_kit_supporting_team_ecologist: number;
  wins_kit_supporting_team_ecologist: number;
  arrows_shot_kit_supporting_team_ecologist: number;
  deaths_kit_supporting_team_ecologist: number;
  losses_kit_supporting_team_ecologist: number;
  arrows_hit_kit_supporting_team_ecologist: number;
  longest_bow_shot_kit_supporting_team_ecologist: number;
  void_kills_kit_supporting_team_ecologist: number;
  assists_kit_supporting_team_ecologist: number;
  chests_opened_kit_supporting_team_ecologist: number;
  inGamePresentsCap_2021_12: number;
  inGamePresentsCap_2021_13: number;
  activeKit_RANKED: string;
  activeKit_RANKED_random: boolean;
  deaths_kit_ranked_ranked_scout: number;
  games_kit_ranked_ranked_scout: number;
  kills_kit_ranked_ranked_scout: number;
  losses_kit_ranked_ranked_scout: number;
  most_kills_game_kit_ranked_ranked_scout: number;
  survived_players_kit_ranked_ranked_scout: number;
  time_played_kit_ranked_ranked_scout: number;
  void_kills_kit_ranked_ranked_scout: number;
  games_team: number;
  wins_team: number;
  wins_team_insane: number;
  assists_team: number;
  heads_heavenly: number;
  heads_heavenly_kit_defending_team_frog: number;
  heads_heavenly_team: number;
  heads_team: number;
  killstreak_team: number;
  team_bulldozer: number;
  chests_opened_kit_ranked_ranked_armorer: number;
  fastest_win_kit_ranked_ranked_armorer: number;
  fastest_win_ranked: number;
  games_kit_ranked_ranked_armorer: number;
  kills_kit_ranked_ranked_armorer: number;
  killstreak_kit_ranked_ranked_armorer: number;
  killstreak_ranked: number;
  longest_bow_kill_kit_ranked_ranked_armorer: number;
  melee_kills_kit_ranked_ranked_armorer: number;
  most_kills_game_kit_ranked_ranked_armorer: number;
  survived_players_kit_ranked_ranked_armorer: number;
  time_played_kit_ranked_ranked_armorer: number;
  wins_kit_ranked_ranked_armorer: number;
  wins_ranked: number;
  wins_ranked_normal: number;
  deaths_kit_ranked_ranked_armorer: number;
  losses_kit_ranked_ranked_armorer: number;
  void_kills_kit_ranked_ranked_armorer: number;
  chests_opened_kit_ranked_ranked_scout: number;
  longest_bow_kill_kit_ranked_ranked_scout: number;
  melee_kills_kit_ranked_ranked_scout: number;
  fastest_win_kit_ranked_ranked_scout: number;
  killstreak_kit_ranked_ranked_scout: number;
  wins_kit_ranked_ranked_scout: number;
  skywars_easter_boxes: number;
  opals: number;
  heads_decent: number;
  heads_decent_kit_defending_team_frog: number;
  heads_decent_solo: number;
  heads_yucky: number;
  heads_yucky_kit_defending_team_frog: number;
  heads_yucky_solo: number;
  bow_kills_kit_defending_team_frog: number;
  bow_kills_solo: number;
  toggle_team_bulldozer: boolean;
  team_ender_mastery: number;
  heads_tasty: number;
  heads_tasty_kit_defending_team_frog: number;
  heads_tasty_solo: number;
  team_fat: number;
  team_juggernaut: number;
  chests_opened_kit_defending_team_armorer: number;
  deaths_kit_defending_team_armorer: number;
  games_kit_defending_team_armorer: number;
  losses_kit_defending_team_armorer: number;
  survived_players_kit_defending_team_armorer: number;
  time_played_kit_defending_team_armorer: number;
  lastTourneyAd: number;
  skywars_christmas_boxes: number;
  perkslot: Perkslot;
  toggle_solo_savior: boolean;
  toggle_solo_black_magic: boolean;
  toggle_solo_environmental_expert: boolean;
  toggle_solo_revenge: boolean;
  solo_fat: number;
  toggle_solo_robbery: boolean;
  toggle_team_arrow_recovery: boolean;
  toggle_solo_nourishment: boolean;
  toggle_team_juggernaut: boolean;
  solo_savior: number;
  toggle_team_resistance_boost: boolean;
  toggle_solo_barbarian: boolean;
  'toggle_team_annoy-o-mite': boolean;
  toggle_solo_necromancer: boolean;
  toggle_team_mining_expertise: boolean;
  toggle_team_nourishment: boolean;
  toggle_team_fat: boolean;
  team_resistance_boost: number;
  toggle_team_environmental_expert: boolean;
  toggle_team_knowledge: boolean;
  toggle_team_bridger: boolean;
  toggle_team_necromancer: boolean;
  toggle_team_robbery: boolean;
  toggle_solo_frost: boolean;
  toggle_team_frost: boolean;
  toggle_team_diamondpiercer: boolean;
  toggle_team_blazing_arrows: boolean;
  toggle_team_lucky_charm: boolean;
  toggle_ranked_armorer_perk: boolean;
  toggle_ranked_champion_perk: boolean;
  toggle_team_barbarian: boolean;
  toggle_ranked_blacksmith_perk: boolean;
  toggle_ranked_healer_perk: boolean;
  toggle_team_savior: boolean;
  toggle_team_black_magic: boolean;
  toggle_ranked_paladin_perk: boolean;
  toggle_ranked_athlete_perk: boolean;
  toggle_ranked_blazing_arrows: boolean;
  toggle_ranked_scout_perk: boolean;
  toggle_ranked_last_stand: boolean;
  toggle_ranked_bowman_perk: boolean;
  toggle_ranked_juggernaut: boolean;
  toggle_ranked_rusher: boolean;
  toggle_ranked_bridger: boolean;
  toggle_ranked_environmental_expert: boolean;
  toggle_ranked_mining_expertise: boolean;
  toggle_mega_juggernaut: boolean;
  toggle_ranked_pyromancer_perk: boolean;
  toggle_mega_mining_expertise: boolean;
  toggle_mega_rusher: boolean;
  toggle_mega_tank: boolean;
  toggle_mega_notoriety: boolean;
  toggle_mega_nourishment: boolean;
  toggle_team_marksmanship: boolean;
  toggle_mega_bridger: boolean;
  toggle_mega_environmental_expert: boolean;
  toggle_mega_marksmanship: boolean;
  toggle_mega_arrow_recovery: boolean;
  toggle_mega_necromancer: boolean;
  toggle_mega_lucky_charm: boolean;
  toggle_solo_blazing_arrows: boolean;
  toggle_solo_arrow_recovery: boolean;
  'toggle_solo_annoy-o-mite': boolean;
  toggle_solo_bulldozer: boolean;
  toggle_solo_fat: boolean;
  solo_juggernaut: number;
  toggle_solo_marksmanship: boolean;
  toggle_solo_mining_expertise: boolean;
  solo_resistance_boost: number;
  toggle_mega_black_magic: boolean;
  toggle_solo_speed_boost: boolean;
  toggle_solo_knowledge: boolean;
  toggle_solo_resistance_boost: boolean;
  solo_bulldozer: number;
  toggle_team_speed_boost: boolean;
  toggle_ranked_hound_perk: boolean;
  toggle_ranked_arrow_recovery: boolean;
  toggle_mega_blazing_arrows: boolean;
  toggle_ranked_magician_perk: boolean;
  toggle_solo_bridger: boolean;
  toggle_solo_lucky_charm: boolean;
  team_savior: number;
  toggle_solo_juggernaut: boolean;
  toggle_ranked_tough_skin: boolean;
  xp_kit_defending_team_frog: number;
  xp_kit_ranked_ranked_armorer: number;
  xp_kit_ranked_ranked_scout: number;
  xp_kit_supporting_team_ecologist: number;
}

export interface HeadCollection {
  recent: Prestigious[];
  prestigious: Prestigious[];
}

export interface Prestigious {
  timestamp: number;
  mode: string;
  sacrifice: string;
}

export interface Perkslot {
  normal: { [key: string]: string };
  insane: { [key: string]: string };
}

export interface SpeedUHC {
  firstJoinLobbyInt: number;
  packages: string[];
  tears: number;
  found_RARE: number;
  tearWellUses: number;
  activeKit_INSANE: string;
  activeMasterPerk: string;
  score: number;
  movedOver: boolean;
  activeKit_NORMAL: string;
  killstreak: number;
  blocks_broken: number;
  blocks_placed: number;
  deaths: number;
  deaths_kit_basic_normal_archaeologist: number;
  deaths_mastery_wild_specialist: number;
  deaths_normal: number;
  deaths_solo: number;
  deaths_solo_normal: number;
  losses: number;
  losses_kit_basic_normal_archaeologist: number;
  losses_mastery_wild_specialist: number;
  losses_normal: number;
  losses_solo: number;
  losses_solo_normal: number;
  quits: number;
  survived_players: number;
  survived_players_kit_basic_normal_archaeologist: number;
  survived_players_normal: number;
  survived_players_solo: number;
  win_streak: number;
  highestKillstreak: number;
  kills: number;
  kills_kit_basic_normal_archaeologist: number;
  kills_mastery_wild_specialist: number;
  kills_monthly_b: number;
  kills_normal: number;
  kills_solo: number;
  kills_solo_normal: number;
  kills_weekly_b: number;
  score_kit_basic_normal_archaeologist: number;
  score_normal: number;
  score_solo: number;
  coins: number;
}

export interface SuperSmash {
  lastLevel_THE_BULK: number;
  coins: number;
}

export interface TNTGames {
  new_firewizard_regen: number;
  new_pvprun_double_jumps: number;
  new_icewizard_regen: number;
  new_witherwizard_explode: number;
  new_firewizard_explode: number;
  new_kineticwizard_explode: number;
  packages: string[];
  new_icewizard_explode: number;
  new_bloodwizard_regen: number;
  new_tntrun_double_jumps: number;
  new_witherwizard_regen: number;
  new_spleef_double_jumps: number;
  new_kineticwizard_regen: number;
  new_spleef_tripleshot: number;
  new_spleef_repulsor: number;
  wins: number;
  new_tntag_speedy: number;
  new_bloodwizard_explode: number;
  run_potions_splashed_on_players: number;
  record_tntrun: number;
  coins: number;
  deaths_tntrun: number;
  winstreak: number;
  record_pvprun: number;
  deaths_pvprun: number;
  flags: Flags;
  kills_tntag: number;
  deaths_bowspleef: number;
  tags_bowspleef: number;
  wins_tntag: number;
  lastTourneyAd: number;
  deaths_tntag: number;
}

export interface Flags {
  show_tip_holograms: boolean;
  show_tntrun_actionbar_info: boolean;
  show_tnttag_actionbar_info: boolean;
  enable_explosive_dash: boolean;
}

export interface Uhc {
  coins: number;
  saved_stats: boolean;
  clearup_achievement: boolean;
}

export interface VampireZ {
  updated_stats: boolean;
  coins: number;
  most_vampire_kills_new: number;
}

export interface Walls3 {
  packages: string[];
  coins: number;
  classes: Classes;
  squid_new_d: number;
  chosen_class: string;
  squid_new_a: number;
  squid_new_b: number;
  squid_new_c: number;
  squid_new_g: number;
  cakes_found_by_name: string[];
  absorption_potions_drunk: number;
  absorption_potions_drunk_standard: number;
  activations: number;
  activations_standard: number;
  amount_healed: number;
  amount_healed_standard: number;
  assists: number;
  assists_standard: number;
  blocks_broken: number;
  blocks_broken_standard: number;
  blocks_placed: number;
  blocks_placed_preparation: number;
  blocks_placed_preparation_standard: number;
  blocks_placed_standard: number;
  cakes_found: number;
  cakes_found_standard: number;
  damage_dealt: number;
  damage_dealt_standard: number;
  deaths: number;
  deaths_standard: number;
  defender_assists: number;
  defender_assists_standard: number;
  defender_kills: number;
  defender_kills_standard: number;
  diamond_ore_broken: number;
  diamond_ore_broken_standard: number;
  enemies_hit: number;
  enemies_hit_standard: number;
  final_deaths: number;
  final_deaths_standard: number;
  final_kills: number;
  final_kills_melee: number;
  final_kills_melee_standard: number;
  final_kills_standard: number;
  fish_eaten: number;
  fish_eaten_standard: number;
  food_eaten: number;
  food_eaten_standard: number;
  games_played: number;
  games_played_standard: number;
  iron_armor_gifted: number;
  iron_armor_gifted_standard: number;
  iron_ore_broken: number;
  iron_ore_broken_standard: number;
  kills: number;
  kills_melee: number;
  kills_melee_behind: number;
  kills_melee_behind_standard: number;
  kills_melee_standard: number;
  kills_standard: number;
  meters_fallen: number;
  meters_fallen_standard: number;
  meters_walked: number;
  meters_walked_speed: number;
  meters_walked_speed_standard: number;
  meters_walked_standard: number;
  potions_drunk: number;
  potions_drunk_standard: number;
  self_healed: number;
  self_healed_standard: number;
  squid_a_activations: number;
  squid_a_activations_standard: number;
  squid_a_amount_healed: number;
  squid_a_amount_healed_standard: number;
  squid_a_assists: number;
  squid_a_assists_standard: number;
  squid_a_damage_dealt: number;
  squid_a_damage_dealt_standard: number;
  squid_a_defender_kills: number;
  squid_a_defender_kills_standard: number;
  squid_a_enemies_hit: number;
  squid_a_enemies_hit_standard: number;
  squid_a_kills: number;
  squid_a_kills_melee: number;
  squid_a_kills_melee_standard: number;
  squid_a_kills_standard: number;
  squid_a_self_healed: number;
  squid_a_self_healed_standard: number;
  squid_a_total_kills: number;
  squid_a_total_kills_standard: number;
  squid_absorption_potions_drunk: number;
  squid_absorption_potions_drunk_standard: number;
  squid_activations: number;
  squid_activations_standard: number;
  squid_amount_healed: number;
  squid_amount_healed_standard: number;
  squid_assists: number;
  squid_assists_standard: number;
  squid_blocks_broken: number;
  squid_blocks_broken_standard: number;
  squid_blocks_placed: number;
  squid_blocks_placed_preparation: number;
  squid_blocks_placed_preparation_standard: number;
  squid_blocks_placed_standard: number;
  squid_damage_dealt: number;
  squid_damage_dealt_standard: number;
  squid_deaths: number;
  squid_deaths_standard: number;
  squid_defender_assists: number;
  squid_defender_assists_standard: number;
  squid_defender_kills: number;
  squid_defender_kills_standard: number;
  squid_diamond_ore_broken: number;
  squid_diamond_ore_broken_standard: number;
  squid_enemies_hit: number;
  squid_enemies_hit_standard: number;
  squid_final_deaths: number;
  squid_final_deaths_standard: number;
  squid_final_kills: number;
  squid_final_kills_melee: number;
  squid_final_kills_melee_standard: number;
  squid_final_kills_standard: number;
  squid_fish_eaten: number;
  squid_fish_eaten_standard: number;
  squid_food_eaten: number;
  squid_food_eaten_standard: number;
  squid_g_activations: number;
  squid_g_activations_standard: number;
  squid_games_played: number;
  squid_games_played_standard: number;
  squid_iron_armor_gifted: number;
  squid_iron_armor_gifted_standard: number;
  squid_iron_ore_broken: number;
  squid_iron_ore_broken_standard: number;
  squid_kills: number;
  squid_kills_melee: number;
  squid_kills_melee_behind: number;
  squid_kills_melee_behind_standard: number;
  squid_kills_melee_standard: number;
  squid_kills_standard: number;
  squid_meters_fallen: number;
  squid_meters_fallen_standard: number;
  squid_meters_walked: number;
  squid_meters_walked_speed: number;
  squid_meters_walked_speed_standard: number;
  squid_meters_walked_standard: number;
  squid_potions_drunk: number;
  squid_potions_drunk_standard: number;
  squid_self_healed: number;
  squid_self_healed_standard: number;
  squid_sword_crafted: number;
  squid_sword_crafted_standard: number;
  squid_time_played: number;
  squid_time_played_standard: number;
  squid_total_deaths: number;
  squid_total_deaths_standard: number;
  squid_total_final_kills: number;
  squid_total_final_kills_standard: number;
  squid_total_kills: number;
  squid_total_kills_standard: number;
  squid_treasures_found: number;
  squid_treasures_found_standard: number;
  squid_wins: number;
  squid_wins_standard: number;
  squid_wither_damage: number;
  squid_wither_damage_standard: number;
  squid_wither_kills: number;
  squid_wither_kills_standard: number;
  sword_crafted: number;
  sword_crafted_standard: number;
  time_played: number;
  time_played_standard: number;
  total_deaths: number;
  total_deaths_standard: number;
  total_final_kills: number;
  total_final_kills_standard: number;
  total_kills: number;
  total_kills_standard: number;
  treasures_found: number;
  treasures_found_standard: number;
  wins: number;
  wins_standard: number;
  wither_damage: number;
  wither_damage_standard: number;
  wither_kills: number;
  wither_kills_standard: number;
}

export interface Classes {
  herobrine: Enderman;
  enderman: Enderman;
  skeleton: Enderman;
  zombie: Enderman;
  squid: Squid;
}

export interface Enderman {
  skill_level_d: number;
  skill_level_dChecked5: boolean;
  checked4: boolean;
  unlocked: boolean;
  skill_level_aChecked5: boolean;
  skill_level_a: number;
}

export interface Squid {
  unlocked: boolean;
  skill_level_d: number;
  skill_level_a: number;
  skill_level_b: number;
  skill_level_c: number;
  skill_level_g: number;
}

export interface WoolGames {
  progression: Progression;
  lastTourneyAd: number;
  sheep_wars: SheepWars;
  data_migration_version: number;
}

export interface Progression {
  available_layers: number;
}

export interface SheepWars {
  stats: SheepWarsStats;
  layout: Layout;
}

export interface Layout {
  slot: { [key: string]: string };
  opened: boolean;
}

export interface SheepWarsStats {
  games_played: number;
  sheep_thrown: number;
  wins: number;
  damage_dealt: number;
  losses: number;
  deaths: number;
  kills: number;
}

export interface Tourney {
  first_join_lobby: number;
}
