export interface ErrorCodeConfig {
	statusCode: number;
	message: string;
}

export const ERROR_CODES: Record<string, ErrorCodeConfig> = {
	ACCESS_TOKEN_MISSING: {
		statusCode: 401,
		message: 'Authorization token is missing',
	},
	INVALID_ACCESS_TOKEN: {
		statusCode: 401,
		message: 'Invalid or expired access token',
	},
	INVALID_REFRESH_TOKEN: {
		statusCode: 403,
		message: 'Invalid or expired refresh token',
	},
	INVALID_TWO_FA_TOKEN: {
		statusCode: 403,
		message: 'Invalid or expired two-factor authentication token',
	},
	SERVICE_TOKEN_MISSING: {
		statusCode: 401,
		message: 'Missing service token',
	},
	INVALID_SERVICE_TOKEN: {
		statusCode: 403,
		message: 'Invalid service token',
	},
	USER_SERVICE_ERROR: {
		statusCode: 503,
		message: 'User service is temporarily unavailable',
	},
	INTERNAL_SERVER_ERROR: {
		statusCode: 500,
		message: 'Internal server error',
	},
	TOO_MANY_REQUESTS: {
		statusCode: 429,
		message: 'Too many requests',
	},
	VALIDATION_FAILED: {
		statusCode: 400,
		message: 'Validation failed',
	},
	// User errors
	USER_NOT_FOUND: {
		statusCode: 404,
		message: 'User not found',
	},
	USERNAME_EXISTS: {
		statusCode: 409,
		message: 'Username already exists',
	},
	USERNAME_TAKEN: {
		statusCode: 409,
		message: 'Username is already taken',
	},
	EMAIL_EXISTS: {
		statusCode: 409,
		message: 'Email already exists',
	},
	USER_ID_REQUIRED: {
		statusCode: 400,
		message: 'User ID is required',
	},
	USER_BLOCKED: {
		statusCode: 403,
		message: 'User is blocked',
	},
	USER_NOT_ALLOWED: {
		statusCode: 403,
		message: 'User is not allowed',
	},
	RECEIVER_NOT_FOUND: {
		statusCode: 404,
		message: 'Receiver not found',
	},
	CANT_SEND_YOURSELF: {
		statusCode: 400,
		message: 'Cannot send request to yourself',
	},
	USERS_BLOCKED: {
		statusCode: 403,
		message: 'Users are blocked',
	},
	// Authentication errors
	INVALID_CREDENTIALS: {
		statusCode: 401,
		message: 'Invalid credentials',
	},
	EMAIL_NOT_VERIFIED: {
		statusCode: 403,
		message: 'Email not verified',
	},
	NOT_REGISTERED: {
		statusCode: 404,
		message: 'User is not registered',
	},
	WEAK_PASSWORD: {
		statusCode: 400,
		message: 'Password is too weak',
	},
	INVALID_TOKEN: {
		statusCode: 400,
		message: 'Invalid token',
	},
	MISSING_TOKEN: {
		statusCode: 400,
		message: 'Token is missing',
	},
	NO_TOKEN: {
		statusCode: 400,
		message: 'Token is required',
	},
	INVALID_SESSION_TOKEN: {
		statusCode: 401,
		message: 'Invalid session token',
	},
	REFRESH_TOKEN_MISSING: {
		statusCode: 400,
		message: 'Refresh token is missing',
	},
	// OAuth errors
	OAUTH_USER: {
		statusCode: 400,
		message: 'User registered via OAuth',
	},
	NO_OAUTH_TOKEN: {
		statusCode: 400,
		message: 'OAuth token is missing',
	},
	NO_GITHUB_USERNAME: {
		statusCode: 400,
		message: 'GitHub username not found',
	},
	NO_VERIFIED_EMAIL: {
		statusCode: 400,
		message: 'No verified email found',
	},
	GITHUB_API_ERROR: {
		statusCode: 500,
		message: 'GitHub API error',
	},
	// 2FA errors
	NOT_2FA_INITIALIZED: {
		statusCode: 400,
		message: 'Two-factor authentication is not initialized',
	},
	INVALID_2FA_TOKEN: {
		statusCode: 401,
		message: 'Invalid two-factor authentication token',
	},
	'2FA_NOT_ENABLED': {
		statusCode: 400,
		message: 'Two-factor authentication is not enabled',
	},
	// User profile errors
	NO_FIELDS_PROVIDED: {
		statusCode: 400,
		message: 'No fields provided for update',
	},
	INVALID_STATUS: {
		statusCode: 400,
		message: 'Invalid status',
	},
	NO_STATUS_PROVIDED: {
		statusCode: 400,
		message: 'Status is required',
	},
	INVALID_AVATAR: {
		statusCode: 400,
		message: 'Invalid avatar',
	},
	// Friendship errors
	ALREADY_SENT: {
		statusCode: 409,
		message: 'Friend request already sent',
	},
	FRIENDSHIP_NOT_FOUND: {
		statusCode: 404,
		message: 'Friendship not found',
	},
	FRIEND_REQUEST_NOT_FOUND: {
		statusCode: 404,
		message: 'Friend request not found',
	},
	// Block errors
	BLOCK_NOT_FOUND: {
		statusCode: 404,
		message: 'Block not found',
	},
	BLOCK_SELF: {
		statusCode: 400,
		message: 'Cannot block yourself',
	},
	// Room errors
	ROOM_NOT_FOUND: {
		statusCode: 404,
		message: 'Room not found',
	},
	ROOM_FULL: {
		statusCode: 409,
		message: 'Room is full',
	},
	ALREADY_IN_ROOM: {
		statusCode: 409,
		message: 'User is already in the room',
	},
	PLAYER_NOT_FOUND_IN_ROOM: {
		statusCode: 404,
		message: 'Player not found in room',
	},
	ROOM_NOT_WAITING: {
		statusCode: 400,
		message: 'Room is not in waiting status',
	},
	JOIN_ROOM_FAILED: {
		statusCode: 500,
		message: 'Failed to join room',
	},
	MISSING_ROOM_ID: {
		statusCode: 400,
		message: 'Room ID is required',
	},
	INVALID_WIN_SCORE: {
		statusCode: 400,
		message: 'Invalid win score',
	},
	UNAUTHORIZED: {
		statusCode: 403,
		message: 'Unauthorized',
	},
	// Game errors
	GAME_NOT_FOUND: {
		statusCode: 404,
		message: 'Game not found',
	},
	GAME_ALREADY_EXISTS: {
		statusCode: 409,
		message: 'Game already exists',
	},
	GAME_CREATION_FAILED: {
		statusCode: 500,
		message: 'Failed to create game',
	},
	FAILED_TO_BROADCAST_ROOM_UPDATE: {
		statusCode: 500,
		message: 'Failed to broadcast room update',
	},
	// Invitation errors
	INVITATION_NOT_FOUND: {
		statusCode: 404,
		message: 'Invitation not found',
	},
	INVITATION_EXPIRED: {
		statusCode: 400,
		message: 'Invitation has expired',
	},
	INVITATION_NOT_PENDING: {
		statusCode: 400,
		message: 'Invitation is no longer pending',
	},
	INVITATION_NOT_FOR_USER: {
		statusCode: 403,
		message: 'You are not the invitee for this invitation',
	},
	INVITER_ALREADY_IN_ROOM: {
		statusCode: 409,
		message: 'Inviter is already in a room',
	},
	INVITEE_ALREADY_IN_ROOM: {
		statusCode: 409,
		message: 'Invitee is already in a room',
	},
	ALREADY_IN_QUEUE: {
		statusCode: 409,
		message: 'User is already in the matchmaking queue',
	},
	// Notification errors
	NOT_FOUND: {
		statusCode: 404,
		message: 'Resource not found',
	},
	// Generic errors
	UNHANDLED_ERROR: {
		statusCode: 500,
		message: 'Unhandled error occurred',
	},
} as const;
