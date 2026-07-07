import type { GenerationId } from "../Generations";
import type { MemberId } from "../Members";

export type UnitCategory = "whole" | "core" | "shuffle";

export const UNITS = [
	{
		id: "hasunosora",
		name: "蓮ノ空女学院スクールアイドルクラブ",
		category: "whole",
		iconUrl: null,
	},
	{
		id: "cerise-bouquet",
		name: "スリーズブーケ",
		category: "core",
		iconUrl: "https://sukisuki.club/units/cerise-bouquet.png",
	},
	{
		id: "dollchestra",
		name: "DOLLCHESTRA",
		category: "core",
		iconUrl: "https://sukisuki.club/units/dollchestra.png",
	},
	{
		id: "mira-cra-park",
		name: "みらくらぱーく！",
		category: "core",
		iconUrl: "https://sukisuki.club/units/mira-cra-park.png",
	},
	{
		id: "edel-note",
		name: "Edel Note",
		category: "core",
		iconUrl: "https://sukisuki.club/units/edel-note.png",
	},
	{
		id: "kahomegu-gelato",
		name: "かほめぐ♡じぇらーと",
		category: "shuffle",
		iconUrl: null,
	},
	{
		id: "hasu-no-kyujitsu",
		name: "蓮ノ休日",
		category: "shuffle",
		iconUrl: null,
	},
	{
		id: "ruri-tsuzu",
		name: "るりのとゆかいなつづりたち",
		category: "shuffle",
		iconUrl: null,
	},
	{
		id: "ruri-to",
		name: "Ruri＆To",
		category: "shuffle",
		iconUrl: null,
	},
	{
		id: "princess",
		name: "PRINCEε>ε>",
		category: "shuffle",
		iconUrl: null,
	},
] as const satisfies readonly {
	id: string;
	name: string;
	category: UnitCategory;
	iconUrl: string | null;
}[];

export type Unit = (typeof UNITS)[number];
export type UnitId = Unit["id"];

export type UnitPeriodKey = GenerationId | "105-bgp";

export const UNIT_ROSTERS = [
	{
		unitId: "hasunosora",
		period: 103,
		memberIds: [1031, 1032, 1021, 1022, 1033, 1023],
	},
	{
		unitId: "hasunosora",
		period: 104,
		memberIds: [1031, 1032, 1021, 1022, 1033, 1023, 1041, 1042, 1043],
	},
	{
		unitId: "hasunosora",
		period: 105,
		memberIds: [1031, 1032, 1033, 1041, 1042, 1043, 1051, 1052],
	},
	{
		unitId: "hasunosora",
		period: "105-bgp",
		memberIds: [
			1021, 1022, 1023, 1031, 1032, 1033, 1041, 1042, 1043, 1051, 1052,
		],
	},
	{ unitId: "cerise-bouquet", period: 103, memberIds: [1031, 1021] },
	{ unitId: "cerise-bouquet", period: 104, memberIds: [1031, 1021, 1041] },
	{ unitId: "cerise-bouquet", period: 105, memberIds: [1031, 1041] },
	{ unitId: "dollchestra", period: 103, memberIds: [1032, 1022] },
	{ unitId: "dollchestra", period: 104, memberIds: [1032, 1022, 1042] },
	{ unitId: "dollchestra", period: 105, memberIds: [1032, 1042] },
	{ unitId: "mira-cra-park", period: 103, memberIds: [1033, 1023] },
	{ unitId: "mira-cra-park", period: 104, memberIds: [1033, 1023, 1043] },
	{ unitId: "mira-cra-park", period: 105, memberIds: [1033, 1043] },
	{ unitId: "edel-note", period: 105, memberIds: [1051, 1052] },
	{ unitId: "kahomegu-gelato", period: 103, memberIds: [1031, 1023] },
	{ unitId: "hasu-no-kyujitsu", period: 103, memberIds: [1032, 1021] },
	{ unitId: "ruri-tsuzu", period: 103, memberIds: [1033, 1022] },
	{ unitId: "ruri-to", period: 105, memberIds: [1033, 1032, 1042, 1052] },
	{ unitId: "princess", period: 105, memberIds: [1043, 1031, 1041, 1051] },
] as const satisfies readonly {
	unitId: UnitId;
	period: UnitPeriodKey;
	memberIds: readonly MemberId[];
}[];

export type UnitRoster = (typeof UNIT_ROSTERS)[number];
