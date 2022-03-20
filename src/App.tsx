import React, {useEffect, useState} from 'react';
import Card, {CardVariant} from "./components/Card";
import {ITodo, IUser} from "./types/types";
import axios from 'axios';
import {BrowserRouter, NavLink, Route, Routes} from 'react-router-dom';
import EventsExample from './components/EventsExample';
import UserPage from "./components/UserPage";
import TodosPage from "./components/TodosPage";
import UserItemPage from "./components/UserItemPage";
import TodoItem from "./components/TodoItem";
import TodoItemPage from './components/TodoItemPage';


const App = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [todos,setTodos] = useState<ITodo[]>([])

    useEffect(() => {
        fetchUsers()
        fetchTodos()
    }, [])

    async function fetchUsers() {
        try {
            const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
            setUsers(response.data)
        } catch (e) {
            alert(e)
        }
    }

    async function fetchTodos() {
        try {
            const response = await axios.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos?_limit=10')
            setTodos(response.data)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div>
            {/*<EventsExample/>
            <Card
                height={'200px'}
                width={'200px'}
                variant={CardVariant.outlined}
                onClick={(num) => console.log('click', num)}
            >
                <button>Button</button>
            </Card>*/}
            <BrowserRouter>
                <div>
                    <NavLink to={'/users'}>Users</NavLink>
                    <NavLink to={'/todos'}>Todos</NavLink>
                </div>
                <Routes>
                    <Route path={'/users'} element={<UserPage/>}/>
                    <Route path={'/todos'} element={<TodosPage/>}/>
                    <Route path={'/user/:id'} element={<UserItemPage/>}/>
                    <Route path={'/todo/:id'} element={<TodoItemPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;