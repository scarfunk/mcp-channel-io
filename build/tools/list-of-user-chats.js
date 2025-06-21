import { makeOpenApiRequest } from "../utils/api.util.js";
export async function listOfUserChatsHandler(input, accessKey, secretKey) {
    const result = await makeOpenApiRequest(`/open/v5/user-chats?state=${input.state}&limit=100`, accessKey, secretKey);
    if (!result) {
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify({ error: "Failed to fetch user chats" }),
                },
            ],
        };
    }
    // 채팅 주요 정보
    const mappedUserChats = result.userChats.map((uc) => {
        return {
            id: uc.id, // 채팅 아이디
            state: uc.state, // 상태
            priority: uc.priority, // 우선순위
            managerIds: uc.managerIds, // 관리자 아이디 목록
            name: uc.name, // 문의자 이름
            tags: uc.tags, // 태그 목록
        };
    });
    // 문의자 정보
    const mappedUsers = result.users.map((u) => {
        return {
            id: u.id, // 문의자 아이디
            name: u.name, // 문의자 이름
            profile: {
                name: u.profile.name,
                company: u.profile.company,
                email: u.profile.email,
                mobileNumber: u.profile.mobileNumber,
            },
        };
    });
    // 관리자 정보
    const mappedMangers = result.managers.map((m) => {
        return {
            id: m.id,
            name: m.name,
        };
    });
    const response = {
        userChats: mappedUserChats, // 채팅 목록
        users: mappedUsers, // 문의자 목록
        managers: mappedMangers, // 관리자 목록
    };
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(response),
            },
        ],
    };
}
