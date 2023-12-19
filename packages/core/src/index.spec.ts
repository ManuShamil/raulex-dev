import { parseConfigToJson } from "./config-parser"


const sampleConfig = `
class CfgPatches
{
	class KeyCardRooms
	{
		requiredAddons[] = 
		{
			"JM_CF_Scripts"
		};
		units[] = {};
		weapons[] = {};
	};
};
class CfgMods
{
	class KeyCardRooms
	{
		name = "KeyCardRooms";
		type = "mod";
		dependencies[] = {"World"};
		class defs
		{
			class worldScriptModule
			{
				value = "";
				files[] = {"Development/Global","KeyCardRooms/Scripts/4_World"};
			};
			class missionScriptModule
			{
				value = "";
				files[] = {"Development/Global","KeyCardRooms/Scripts/5_Mission"};
			};
		};
	};
};
class CfgSounds
{
	class KeyCard_DoorAlarm
	{
		sound[] = {"KeyCardRooms/Assets/Sounds/DoorAlarm10Sec",1,1,200};
	};
};`

describe(`core`, () => {
    it(`be able to parse config`, () => {

        const config = parseConfigToJson(sampleConfig)

        console.log(config)

        expect(true).toBe(true)
    })
})