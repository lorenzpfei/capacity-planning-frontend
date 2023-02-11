import {Card, Image, Progress, SimpleGrid, Text} from "@mantine/core";
import styles from './overview.module.css';
import {useState} from "react";
import DayBox, {Task} from "@/components/DayBox/DayBox";
import {DateRangePicker, DateRangePickerValue} from "@mantine/dates";
import 'dayjs/locale/de';

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    avatar: string;
    workload?: Workload[];
    workloadSum?: Workload;
}

export interface Workload {
    hoursContract: number;
    hoursTimeoff: number;
    hoursTask: number;
    tasks: Task[];
    date: string;
}

const Overview = ({initialUsers, monday, friday}: { initialUsers: User[], monday: string, friday: string }) => {
    const [users, setUsers] = useState<User[]>(initialUsers);

    const [date, setDate] = useState<DateRangePickerValue>([
        new Date(monday),
        new Date(friday),
    ]);

    const changeDateRange = (dates: DateRangePickerValue) => {
        setDate(dates);
        if (dates[0] !== null && dates[1] !== null) {
            //need to use swedish here for the correct time format
            fetch('http://127.0.0.1:8000/workload/1/' + dates[0].toLocaleDateString('sv-SE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).split('/').reverse().join('-') + '/' + dates[1].toLocaleDateString('sv-SE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).split('/').reverse().join('-') + '/', {
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }).then((data) => {
                data.json().then((res) => {
                    setUsers(res);
                })
            })
        }
    }

    return (
        <>
            <h1>Capacities</h1>
            <h2>Development</h2>
            <div className={styles.week}>
                <div className={styles.info}>
                    <DateRangePicker
                        label="Select period"
                        placeholder="Select period"
                        value={date}
                        onChange={changeDateRange}
                        locale={'de'}
                        inputFormat="DD.MM.YYYY"
                    />
                </div>
            </div>
            {users.map((user, index) => {
                if (!(user.workloadSum && user.workload)) {
                    return (<p key={index}>Es konnten keine Kapazitätsdaten für {user.name} gefunden werden.</p>)
                }

                let weeklyPercentage = (user.workloadSum.hoursTimeoff + user.workloadSum.hoursTask) / user.workloadSum.hoursContract;

                return (
                    <div className={styles.week} key={index}>
                        <Card
                            withBorder
                            radius="md"
                            p="xl"
                            sx={(theme) => ({
                                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                            })}
                            className={styles.card}
                        >
                            <div className={styles.info}>
                                <div className={styles.besides}>
                                    <div>
                                        <Image radius="xl"
                                               src={user.avatar}
                                               alt={user.name}
                                               width={40}/>
                                    </div>
                                    <div>
                                        <Text size="lg" weight={500}>{user.name}</Text>
                                        <Text size="xs" transform="uppercase" weight={700}
                                              color="dimmed">{Math.round(user.workloadSum.hoursTimeoff + user.workloadSum.hoursTask * 100) / 100} / {user.workloadSum?.hoursContract} Hours</Text>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={styles.besides}>
                                    <Text size="xs" color="dimmed" mt={7}>Load</Text>
                                    <Text component="span" color={weeklyPercentage < 0.8 ? 'teal' : '#E27574'} weight={700}>
                                        {Math.round(weeklyPercentage * 100 * 100) / 100}%
                                    </Text>
                                </div>
                                <Progress value={weeklyPercentage * 100} mt="md" size="lg" radius="xl"
                                          color={weeklyPercentage < 0.8 ? 'teal' : '#E27574'}/>
                            </div>
                        </Card>
                        <div className={styles.days}>
                            <Card
                                withBorder
                                radius="md"
                                p={0}
                                style={{width: '100%'}}
                                sx={(theme) => ({
                                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                                })}
                            >
                                <SimpleGrid cols={5} style={{gap: 3, display: 'flex', overflowX: 'auto'}}>
                                    {user.workload ? user.workload.map((workload, index) => {
                                        return (
                                            <DayBox workload={workload} key={index}/>
                                        )
                                    }) : ''}
                                </SimpleGrid>
                            </Card>
                        </div>
                    </div>
                )
            })}
        </>
    );
}

export async function getServerSideProps() {
    const getDayInWeek = (d: Date, dayNo: number) => {
        d = new Date(d);
        let day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : dayNo); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    let monday = getDayInWeek(new Date(), 1);
    let friday = getDayInWeek(new Date(), 5);

    // Fetch data from external API
    const res = await fetch('http://127.0.0.1:8000/workload/1/' + monday.toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).split('/').reverse().join('-') + '/' + friday.toLocaleDateString('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).split('/').reverse().join('-') + '/')
    const users: User[] = await res.json()
    return {
        props: {
            initialUsers: JSON.parse(JSON.stringify(users)),
            monday: monday.toISOString(),
            friday: friday.toISOString()
        }
    }
}

export default Overview;