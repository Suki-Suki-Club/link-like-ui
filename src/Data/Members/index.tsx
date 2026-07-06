import type { GenerationId } from "../Generations";

export const MEMBERS = [
	{
		id: 1021,
		name: "乙宗梢",
		generationId: 102,
		themeColor: "#68be8d",
		iconUrl: "https://sukisuki.club/icons/1021.png",
	},
	{
		id: 1022,
		name: "夕霧綴理",
		generationId: 102,
		themeColor: "#ba2636",
		iconUrl: "https://sukisuki.club/icons/1022.png",
	},
	{
		id: 1023,
		name: "藤島慈",
		generationId: 102,
		themeColor: "#c8c2c6",
		iconUrl: "https://sukisuki.club/icons/1023.png",
	},
	{
		id: 1031,
		name: "日野下花帆",
		generationId: 103,
		themeColor: "#f8b500",
		iconUrl: "https://sukisuki.club/icons/1031.png",
	},
	{
		id: 1032,
		name: "村野さやか",
		generationId: 103,
		themeColor: "#5383c3",
		iconUrl: "https://sukisuki.club/icons/1032.png",
	},
	{
		id: 1033,
		name: "大沢瑠璃乃",
		generationId: 103,
		themeColor: "#e7609e",
		iconUrl: "https://sukisuki.club/icons/1033.png",
	},
	{
		id: 1041,
		name: "百生吟子",
		generationId: 104,
		themeColor: "#a2d7dd",
		iconUrl: "https://sukisuki.club/icons/1041.png",
	},
	{
		id: 1042,
		name: "徒町小鈴",
		generationId: 104,
		themeColor: "#fad764",
		iconUrl: "https://sukisuki.club/icons/1042.png",
	},
	{
		id: 1043,
		name: "安養寺姫芽",
		generationId: 104,
		themeColor: "#9d8de2",
		iconUrl: "https://sukisuki.club/icons/1043.png",
	},
	{
		id: 1051,
		name: "桂城泉",
		generationId: 105,
		themeColor: "#1ebecd",
		iconUrl: "https://sukisuki.club/icons/1051.png",
	},
	{
		id: 1052,
		name: "セラス柳田リリエンフェルト",
		generationId: 105,
		themeColor: "#f56455",
		iconUrl: "https://sukisuki.club/icons/1052.png",
	},
] as const satisfies readonly {
	id: number;
	name: string;
	generationId: GenerationId;
	themeColor: string;
	iconUrl: string;
}[];

export type Member = (typeof MEMBERS)[number];
export type MemberId = Member["id"];
