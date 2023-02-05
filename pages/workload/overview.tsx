import {Card, Image, Progress, SimpleGrid, Stack, Text} from "@mantine/core";
import styles from './overview.module.css';

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    avatar: string;
    workload?: Workload[];
    workloadSum?: Workload;
}

interface Workload {
    hoursContract: number;
    hoursTimeoff: number;
    hoursTask: number;
}

const Overview = ({users}: { users: User[] }) => {
    console.log(users); //todo: remove debug

    return (
        <>
            <h1>Workload</h1>
            <h2>Development</h2>
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
                                              color="dimmed">{user.workloadSum.hoursTimeoff + user.workloadSum.hoursTask} / {user.workloadSum?.hoursContract} Stunden</Text>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.besides}>
                                <Text size="xs" color="dimmed" mt={7}>Auslastung</Text>
                                <Text component="span" color={weeklyPercentage < 0.8 ? 'teal' : 'red'} weight={700}>
                                    {weeklyPercentage * 100}%
                                </Text>
                            </div>
                            <Progress value={weeklyPercentage * 100} mt="md" size="lg" radius="xl"
                                      color={weeklyPercentage < 0.8 ? 'teal' : 'red'}/>
                        </Card>
                        <div className="days">
                            <Card
                                withBorder
                                radius="md"
                                p={0}
                                sx={(theme) => ({
                                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                                })}
                            >
                                <SimpleGrid cols={5} style={{gap: 3}}>
                                    {user.workload ? user.workload.map((workload, index) => {
                                        return (
                                            <Stack key={index} className={styles.box} style={{backgroundColor: 'rgba(25, 113, 194, 0.2)', justifyContent: 'end'}}>
                                                <div className={styles.boxInside}
                                                     style={{height: workload.hoursTask / workload.hoursContract * 100 + '%', backgroundColor: 'rgba(25, 113, 194, 0.8)'}}>
                                                    <div className={styles.text}>Aufgaben</div>
                                                </div>
                                                <div className={styles.boxInside}
                                                     style={{height: workload.hoursTimeoff / workload.hoursContract * 100 + '%', backgroundColor: 'rgba(25, 113, 194, 0.4)'}}>
                                                    <div className={styles.text}>Urlaub</div>
                                                </div>
                                            </Stack>
                                        )
                                    }) : 'q'}
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
    // Fetch data from external API
    const res = await fetch(`http://127.0.0.1:8000/workload/1/2023-02-06/2023-02-10`)
    const users: User[] = await res.json()
    return {
        props: {
            users: JSON.parse(JSON.stringify(users))
        }
    }
}

export default Overview;