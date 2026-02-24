import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/constant";
import UserDetails from "../../common-functions/profile-icon/user-details";

type data = {
    name: string,
    email: string,
    role: string
}

const Profile = () => {
    const [user, setUser] = useState<data | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/");
                return;
            }

            try {
                const res = await fetch(`${BASE_URL}/auth/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                console.log("Response:", data);

                if (!res.ok) {
                    throw new Error(data.message || "Unauthorized");
                }

                setUser(data.user);

            } catch (err: any) {
                localStorage.removeItem("token");
                navigate("/");
            }
        };

        fetchProfile();
    }, [navigate]);

    return (
        <div>
            <UserDetails
                profilePic={""}
                name={user?.name || ''}
                email={user?.email || ''}
                role={user?.role || ''}
            />
        </div>
    );
}
export default Profile;