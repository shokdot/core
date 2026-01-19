import axios from "axios";
import { SERVICE_TOKEN, USER_SERVICE_URL } from "../env.js";
import { AppError } from "./AppError.js";

const checkBlocked = async (userA: string, userB: string) => {
	try {
		const { data } = await axios.get(`${USER_SERVICE_URL}/blocks/check`,
			{
				params: { userA, userB },
				headers: {
					'x-service-token': SERVICE_TOKEN,
				}
			}
		)
		return Boolean(data?.data);
	}
	catch (error: any) {
		throw new AppError('USER_SERVICE_ERROR');
	}
};

export default checkBlocked;
