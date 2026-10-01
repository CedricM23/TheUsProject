import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import 'react-circular-progressbar/dist/styles.css';
import { Navigate } from "react-router";

export default function AdminDashboardView() {
    const user = useContext(UserContext);
    return (
        <div>
            {user?.authorities?.some(auth => auth.name.includes("ADMIN")) ? (
                <div className="text-center p-4 text-3xl">
                    Hello <span className="font-extrabold">{user.firstName}</span>
                </div>
            ) : (
                // 403
                <Navigate to="/access-denied" />
            )}
        </div>
    )
}