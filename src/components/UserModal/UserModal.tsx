import React, {useEffect, useState} from 'react';
import {Avatar, Button, createStyles, Modal} from "@mantine/core";
import {Check, Link, Logout} from "tabler-icons-react";
import {UserButton} from "../UserButton/UserButton";
import {useCookies} from "react-cookie";
import {User} from "../../lib/models";
import {api} from "../../lib/api";

interface OAuth {
    name: string;
    connected: boolean;
}


function UserModal() {
    const {classes} = useModalStyles();
    const [opened, setOpened] = useState(false);
    const [jsonUser] = useCookies<string>(['user']);
    const user: User = jsonUser.user; //todo: prettier

    const [oauth, setOAuth] = useState<OAuth[]>([]);

    useEffect(() => {
        if (oauth.length === 0) {
            api.get('/user/oauth').then((res) => {
                setOAuth(res.data);
            });
        }
    }, [oauth.length])

    const ucFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Logged in as"
            >
                <div>
                    <div className={classes.besides}>
                        <Avatar src={user.avatar}></Avatar>
                        <div>
                            <strong>{user.name}</strong>
                            <div>{user.email}</div>
                        </div>
                    </div>
                    <div className={classes.connected}>
                        {oauth ?
                            oauth.map((item, key) => {
                                return <div key={key}>{item.connected ?
                                    <Button compact variant="gradient" gradient={{from: 'teal', to: 'lime', deg: 105}}
                                            leftIcon={<Check size={14}/>}>{ucFirst(item.name)}</Button>:
                                    <a href={`${process.env.REACT_APP_PUBLIC_API_URL}/oauth/${item.name}`}><Button
                                        compact variant="gradient" gradient={{from: 'indigo', to: 'cyan'}}
                                        leftIcon={<Link size={14}/>}>Connect to {ucFirst(item.name)}</Button></a>}</div>
                            })
                            : undefined}
                    </div>
                    <Button component="a" href="#" variant="outline" leftIcon={<Logout size={14}/>}>Logout</Button>
                </div>
            </Modal>
            <UserButton
                image={user.avatar}
                name={user.name}
                email={user.email}
                onClick={setOpened}
            />
        </>
    );
}

const useModalStyles = createStyles((theme) => ({
    besides: {
        display: 'flex',
        gap: "1rem",
        alignItems: 'center',
        marginBottom: '1rem'
    },
    connected: {
        marginTop: 15,
        marginBottom: 15
    }
}));

export default UserModal;