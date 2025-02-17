import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';

/** @private */
export interface HelixTagData {
	tag_id: string;
	is_auto: boolean;
	localization_names: Record<string, string>;
	localization_descriptions: Record<string, string>;
}

/**
 * A stream tag.
 */
@rtfm<HelixTag>('api', 'HelixTag', 'id')
export class HelixTag extends DataObject<HelixTagData> {
	/**
	 * The ID of the tag.
	 */
	get id(): string {
		return this[rawDataSymbol].tag_id;
	}

	/**
	 * Whether the tag is automatically assigned by Twitch.
	 */
	get isAuto(): boolean {
		return this[rawDataSymbol].is_auto;
	}

	/**
	 * Gets the name of the tag in the specified language.
	 *
	 * @param language The language to get the name in.
	 */
	getName(language: string): string | undefined {
		return this[rawDataSymbol].localization_names[language];
	}

	/**
	 * Gets the description of the tag in the specified language.
	 *
	 * @param language The language to get the description in.
	 */
	getDescription(language: string): string | undefined {
		return this[rawDataSymbol].localization_descriptions[language];
	}
}
