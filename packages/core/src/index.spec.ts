import dotenv from 'dotenv'
import { RaulexCore } from '.'

dotenv.config()
jest.setTimeout(30000)

const raulexCore = new RaulexCore( { openAIKey: process.env.OPENAI_KEY || '' } )
const sampleConfig = `
class CfgPatches
{
    class DayZExpansion_Vehicles_Scripts
    {
        units[] = {};
        weapons[] = {};
        requiredVersion = 0.1;
        requiredAddons[] = {"DayZExpansion_Core_Scripts"};
    };
};
class CfgNoises
{
    class HeliExpansionNoise
    {
        type = "sound";
        continuousRange = 300;
        strength = 50;
    };
};
class CfgMods
{
    class DZ_Expansion_Vehicles
    {
        dir = "DayZExpansion/Vehicles";
        credits = "$STR_MOD_EXPANSION_AUTHOR";
        inputs = "DayZExpansion/Vehicles/Scripts/Data/Inputs.xml";
        extra = 0;
        type = "mod";
        CF_ModStorage = 1;
        name = "DayZ Expansion - Vehicles";
        picture = "set:expansion_mod_imageset image:mod_v";
        logo = "set:expansion_mod_imageset image:mod_v";
        logoSmall = "set:expansion_mod_imageset image:mod_v";
        logoOver = "set:expansion_mod_imageset image:mod_v";
        tooltip = "DayZ Expansion - Vehicles";
        overview = "$STR_MOD_EXPANSION_DESC";
        action = "";
        author = "$STR_MOD_EXPANSION_AUTHOR";
        authorID = "";
        expansionSkins[] = {"DayZExpansion/Skins/Vehicles/Air/","DayZExpansion/Skins/Vehicles/Water/","DayZExpansion/Skins/Vehicles/Ground/"};
        dependencies[] = {"Game","World","Mission"};
        class defs
        {
            class widgetStyles
            {
                files[] = {};
            };
            class imageSets
            {
                files[] = {};
            };
            class engineScriptModule
            {
                value = "";
                files[] = {"DayZExpansion/Vehicles/Scripts/Common","DayZExpansion/Vehicles/Scripts/1_Core"};
            };
            class gameLibScriptModule
            {
                value = "";
                files[] = {"DayZExpansion/Vehicles/Scripts/Common","DayZExpansion/Vehicles/Scripts/2_GameLib"};
            };
            class gameScriptModule
            {
                value = "";
                files[] = {"DayZExpansion/Vehicles/Scripts/Common","DayZExpansion/Vehicles/Scripts/3_Game"};
            };
            class worldScriptModule
            {
                value = "";
                files[] = {"DayZExpansion/Vehicles/Scripts/Common","DayZExpansion/Vehicles/Scripts/4_World"};
            };
            class missionScriptModule
            {
                value = "";
                files[] = {"DayZExpansion/Vehicles/Scripts/Common","DayZExpansion/Vehicles/Scripts/5_Mission"};
            };
        };
    };
};
`

describe(`core`, () => {
    it(`has OPENAI Key`, () => {

        expect(process.env.OPENAI_KEY).toBeDefined()
    })
    it(`can parse config`, async () => {

        const result = await raulexCore.getConfigParser().parseConfigToJson(sampleConfig)

        
        expect(result["CfgNoises"]["HeliExpansionNoise"]["type"]).toEqual("sound")
    })
})