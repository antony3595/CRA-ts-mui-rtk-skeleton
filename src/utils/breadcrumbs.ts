import { RoutePathDefinition } from "../constants/routes";
import { matchPath, PathMatch } from "react-router-dom";

const skipPaths = ["/", "*"];

export function matchRouteDefinitions(definitions: RoutePathDefinition[], locationPathname: string): [PathMatch, RoutePathDefinition][] {
	const crumbs: [PathMatch, RoutePathDefinition][] = [];

	definitions.forEach((definition) => {
		const { path } = definition;

		const match = matchPath({ path: path, end: false }, locationPathname);
		if (match) {
			if (!skipPaths.includes(definition.path)) crumbs.push([match, definition]);

			if (definition.children) {
				const nestedMatches = matchRouteDefinitions(definition.children, locationPathname);

				crumbs.push(...nestedMatches);
			}
		}
	});

	return crumbs;
}
