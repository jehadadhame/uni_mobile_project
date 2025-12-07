import { Text } from "@rneui/base"
import { useAuth } from "../../context/AppContext"
export const Home = () => {
    const { user } = useAuth();
    console.log("rendering Home page")
    console.log("from home page user : ", user?.email)
    return (
        <Text>Home page</Text>
    )
}