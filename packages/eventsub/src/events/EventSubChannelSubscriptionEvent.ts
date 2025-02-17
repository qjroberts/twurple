import { Enumerable } from '@d-fischer/shared-utils';
import type { ApiClient, HelixUser } from '@twurple/api';
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';

/**
 * The tier of a subscription. 1000 means tier 1, and so on.
 */
export type EventSubChannelSubscriptionEventTier = '1000' | '2000' | '3000';

/** @private */
export interface EventSubChannelSubscriptionEventData {
	user_id: string;
	user_login: string;
	user_name: string;
	broadcaster_user_id: string;
	broadcaster_user_login: string;
	broadcaster_user_name: string;
	tier: EventSubChannelSubscriptionEventTier;
	is_gift: boolean;
}

/**
 * An EventSub event representing a channel subscription.
 */
@rtfm<EventSubChannelSubscriptionEvent>('eventsub', 'EventSubChannelSubscriptionEvent', 'userId')
export class EventSubChannelSubscriptionEvent extends DataObject<EventSubChannelSubscriptionEventData> {
	@Enumerable(false) private readonly _client: ApiClient;

	/** @private */
	constructor(data: EventSubChannelSubscriptionEventData, client: ApiClient) {
		super(data);
		this._client = client;
	}

	/**
	 * The ID of the subscribing user.
	 */
	get userId(): string {
		return this[rawDataSymbol].user_id;
	}

	/**
	 * The name of the subscribing user.
	 */
	get userName(): string {
		return this[rawDataSymbol].user_login;
	}

	/**
	 * The display name of the subscribing user.
	 */
	get userDisplayName(): string {
		return this[rawDataSymbol].user_name;
	}

	/**
	 * Retrieves more information about the subscribing user.
	 */
	async getUser(): Promise<HelixUser> {
		return (await this._client.users.getUserById(this[rawDataSymbol].user_id))!;
	}

	/**
	 * The ID of the broadcaster.
	 */
	get broadcasterId(): string {
		return this[rawDataSymbol].broadcaster_user_id;
	}

	/**
	 * The name of the broadcaster.
	 */
	get broadcasterName(): string {
		return this[rawDataSymbol].broadcaster_user_login;
	}

	/**
	 * The display name of the broadcaster.
	 */
	get broadcasterDisplayName(): string {
		return this[rawDataSymbol].broadcaster_user_name;
	}

	/**
	 * Retrieves more information about the broadcaster.
	 */
	async getBroadcaster(): Promise<HelixUser> {
		return (await this._client.users.getUserById(this[rawDataSymbol].broadcaster_user_id))!;
	}

	/**
	 * The tier of the subscription, either 1000, 2000 or 3000.
	 */
	get tier(): EventSubChannelSubscriptionEventTier {
		return this[rawDataSymbol].tier;
	}

	/**
	 * Whether the subscription has been gifted.
	 */
	get isGift(): boolean {
		return this[rawDataSymbol].is_gift;
	}
}
