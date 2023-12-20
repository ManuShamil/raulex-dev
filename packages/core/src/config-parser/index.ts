import { OpenAI } from "openai";

const configToJsonPrompt = `You are a Data Transformer, Your role is to transform a data into json.
Here is the example:
Data:
class CfgPatches
{
	class RaulexFramework
	{
		requiredAddons[] = 
		{
			"DZ_Scripts"
		};
		units[] = {};
		weapons[] = {};
	};
};
class CfgMods
{
	class RaulexFramework
	{
		name = "RaulexFramework";
		type = "mod";
		dependencies[] = {"World"};
		class defs
		{
			class worldScriptModule
			{
				value = "";
				files[] = {"Development/Global","RaulexFramework/Scripts/4_World"};
			};
			class missionScriptModule
			{
				value = "";
				files[] = {"Development/Global","RaulexFramework/Scripts/5_Mission"};
			};
		};
	};
};
Output:
{
	"CfgPatches": {
		"RaulexFramework": {
			"requiredAddons": [
				"DZ_Scripts"
			],
			"units": [],
			"weapons": []
		}
	},
	"CfgMods": {
		"RaulexFramework": {
			"name": "RaulexFramework",
			"type": "mod",
			"dependencies": [
				"World"
			],
			"defs": {
				"worldScriptModule": {
					"value": "",
					"files": [
						"Development/Global",
						"RaulexFramework/Scripts/4_World"
					]
				},
				"missionScriptModule": {
					"value": "",
					"files": [
						"Development/Global",
						"RaulexFramework/Scripts/5_Mission"
					]
				}
			}
		}
	}
}`

export class ConfigParser {

    public constructor( private openAI: OpenAI ) {};

    public async parseConfigToJson( config: string ) {
        const response = await this.openAI.chat.completions.create({
            model:`gpt-3.5-turbo`,
            messages: [
                {
                    "role": `system`,
                    "content": configToJsonPrompt
                },
                {
                    "role": "user", 
                    "content": config 
                },
            ]
        });
		const resultMessage = response.choices[0].message.content;
		if ( !resultMessage ) throw new Error( `Failed to parse config to json` );
		
        return JSON.parse( resultMessage );
    }
}