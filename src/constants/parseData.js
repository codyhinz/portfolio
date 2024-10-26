// Import spec icons
import armsIcon from '../assets/arms.png';
import frostIcon from '../assets/frost.png';
import destructionIcon from '../assets/destruction.png';
import arcaneIcon from '../assets/arcane.png';
import furyIcon from '../assets/fury.png';
import unholyIcon from '../assets/unholy.png';

// Import character profiles
import danzeldProfile from '../assets/danzeld.png';
import unholydanProfile from '../assets/unholydan.png';
import souldanProfile from '../assets/souldan.png';
import magemandanProfile from '../assets/magemandan.png';
import mntnmandanProfile from '../assets/mntnmandan.png';


// Character class colors for reference
export const WOW_CLASS_COLORS = {
  WARRIOR: '#C79C6E',
  PALADIN: '#F58CBA',
  HUNTER: '#ABD473',
  ROGUE: '#FFF569',
  PRIEST: '#FFFFFF',
  DEATHKNIGHT: '#C41F3B',
  SHAMAN: '#0070DE',
  MAGE: '#69CCF0',
  WARLOCK: '#9482C9',
  MONK: '#00FF96',
  DRUID: '#FF7D0A',
  DEMONHUNTER: '#A330C9',
};

export const parsePerformances = [
  {
    id: 1,
    characterName: "Danzeld",
    level: 85,
    spec: "Worgen Arms",
    class: "Warrior",
    realm: "Pagle (US)",
    classColor: WOW_CLASS_COLORS.WARRIOR,
    profilePicture: danzeldProfile,
    specIcon: armsIcon,
    overallParse: 92.1,
    bestParse: 99,
    ilvlParse: 93,
    tierName: "Heroic Tier 11",
    kills: 224,
    faction: "Alliance"
  },
  {
    id: 2,
    characterName: "Unholydan",
    level: 80,
    spec: "Human Frost",
    class: "Death Knight",
    realm: "Westfall (US)",
    classColor: WOW_CLASS_COLORS.DEATHKNIGHT,
    profilePicture: unholydanProfile,
    specIcon: frostIcon,
    overallParse: 98.3,
    bestParse: 100,
    ilvlParse: 98.9,
    tierName: "Trial of the Grand Crusader",
    kills: 67,
    faction: "Alliance"
  },
  {
    id: 3,
    characterName: "Souldan",
    level: 20,
    spec: "Undead Destruction",
    class: "Warlock",
    realm: "Wild Growth (US)",
    classColor: WOW_CLASS_COLORS.WARLOCK,
    profilePicture: souldanProfile,
    specIcon: destructionIcon,
    overallParse: 98.8,
    bestParse: 99,
    ilvlParse: 99.2,
    tierName: "Blackfathom Deeps",
    kills: 126,
    faction: "Horde"
  },
  {
    id: 4,
    characterName: "Magemandan",
    level: 70,
    spec: "Gnome Arcane",
    class: "Mage",
    realm: "Westfall (US)",
    classColor: WOW_CLASS_COLORS.MAGE,
    profilePicture: magemandanProfile,
    specIcon: arcaneIcon,
    overallParse: 99,
    bestParse: 100,
    ilvlParse: 99.5,
    tierName: "Black Temple",
    kills: 268,
    faction: "Alliance"
  },
  {
    id: 5,
    characterName: "Mntnmandan",
    level: 60,
    spec: "Human Fury",
    class: "Warrior",
    realm: "Westfall (US)",
    classColor: WOW_CLASS_COLORS.WARRIOR,
    profilePicture: mntnmandanProfile,
    specIcon: furyIcon,
    overallParse: 96.9,
    bestParse: 100,
    ilvlParse: 99.1,
    tierName: "Zul'Gurub",
    kills: 39,
    faction: "Alliance"
  },
  {
    id: 6,
    characterName: "Unholydan",
    level: 80,
    spec: "Human Unholy",
    class: "Death Knight",
    realm: "Westfall (US)",
    classColor: WOW_CLASS_COLORS.DEATHKNIGHT,
    profilePicture: unholydanProfile,
    specIcon: unholyIcon,
    overallParse: 98,
    bestParse: 100,
    ilvlParse: 99,
    tierName: "Ulduar",
    kills: 270,
    faction: "Alliance"
  },
];