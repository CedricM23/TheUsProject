import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import 'react-circular-progressbar/dist/styles.css';

export default function AdminDashboardView(){
    const user = useContext(UserContext);
    return(
        <div className="text-center text-2xl p-4">
        Welcome <span className="font-bold">{user.firstName}</span>
        </div>
    )
}