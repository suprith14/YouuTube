import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ValidationComponent = ({ element }) => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("userLocal"))
    console.log(" ValidationComponent component : user :", user)
    useEffect(() => {
        if (!user) {
            return navigate("/login")
        }
    }, [user, navigate])

    if (!user) {
        return null
    }
    return element
}
export default ValidationComponent
