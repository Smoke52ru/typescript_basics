import React, {FC, useEffect, useState} from 'react';
import {IUser} from "../types/types";
import axios from "axios";
import {Params, useParams, useNavigate} from "react-router";

interface IUserItemPageParams extends Params{
    id: string;
}

const UserItemPage:FC = () => {
    const [user, setUser] = useState<IUser|null>(null)
    const params = useParams<IUserItemPageParams>()
    const nav = useNavigate()

    useEffect(() => {
        fetchUser()
    }, [])

    async function fetchUser() {
        try {
            const response = await axios.get<IUser>(`https://jsonplaceholder.typicode.com/users/` + params.id)
            setUser(response.data)
        } catch (e) {
            alert(e)
        }
    }
    return (
        <div>
            <button onClick={()=>nav('/users')}>Back</button>
            <h1>Page for user with id = {user?.id}</h1>
            <div>{user?.email} | {user?.name}</div>
        </div>
    );
};

export default UserItemPage;