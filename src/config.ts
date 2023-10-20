import { BuildType, BuildTypesScheme, Config } from "./types/config";

const defaultConfig: Config = {
	SITE_NAME: process.env.REACT_APP_SITE_NAME || "Site Name",
	stateVersion: 0.2, // saved redux state reloads if config version not equal state
	BUILD_TYPE: BuildType.PRODUCTION,
	isProduction: () => process.env.REACT_APP_BUILD_TYPE === BuildType.PRODUCTION,
	API_URL: "http://fakeapi.mock/",
	localStorageKey: process.env.REACT_APP_LOCAL_STORAGE_KEY || "site_local_storage",
};

const buildTypeConfigs: BuildTypesScheme = {
	[BuildType.DEVELOPMENT]: {
		BUILD_TYPE: BuildType.DEVELOPMENT,
	},
	[BuildType.LOCALHOST]: {
		BUILD_TYPE: BuildType.LOCALHOST,
		API_URL: "http://127.0.0.1:8000/",
	},
	[BuildType.PRODUCTION]: {
		BUILD_TYPE: BuildType.PRODUCTION,
	},
	[BuildType.MOCK]: {
		BUILD_TYPE: BuildType.MOCK,
	},
};

const buildType: BuildType = (process.env["REACT_APP_BUILD_TYPE"] as BuildType) || BuildType.LOCALHOST;
const config: Config = { ...defaultConfig, ...buildTypeConfigs[buildType] };
export default config;
