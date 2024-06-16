'use server';

import { cookies } from 'next/headers';

export const getAuth = () => {
    const token = cookies().get('token');
    if (token) {
        let user;
        if (token.value === "1f00b921-3393-4b14-a0e3-971a571c7de7") {
            user = "abi"
        } else if (token.value === "blacklisted") {
            user = "admin"
        }
        return [token, user]
    }
    
    return [token];
}
