import {Card, Image, Progress, SimpleGrid, Text} from "@mantine/core";
import styles from './workload.module.css';
import {useCallback, useEffect, useState} from "react";
import {DateRangePicker, DateRangePickerValue} from "@mantine/dates";
import 'dayjs/locale/de';
import {User} from "../../lib/models";
import DayBox from "../../components/DayBox/DayBox";
import {api} from "../../lib/api";

const Workload = () => {
    const getDayInWeek = (d: Date, dayNo: number) => {
        d = new Date(d);
        let day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : dayNo); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    let monday = getDayInWeek(new Date(), 1);
    let friday = getDayInWeek(new Date(), 5);

    const [users, setUsers] = useState<User[]>([]);

    const [date, setDate] = useState<DateRangePickerValue>([
        new Date(monday),
        new Date(friday),
    ]);

    const getUrlFromDates = () => {
        if (date[0] !== null && date[1] !== null) {
            //need to use swedish here for the correct time format
            return date[0].toLocaleDateString('sv-SE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).split('/').reverse().join('-') + '/' + date[1].toLocaleDateString('sv-SE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).split('/').reverse().join('-')
        }
        return undefined;
    }

    useEffect(() => {
        if (date[0] !== null && date[1] !== null) {
            api.get(`/workload/1/${getUrlFromDates()}/`).then((res) => {
                setUsers(res.data);
            })
        }
    }, [date])

    const changeDateRange = (dates: DateRangePickerValue) => {
        setDate(dates);
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
                                    <Text component="span" color={weeklyPercentage < 0.8 ? 'teal' : '#E27574'}
                                          weight={700}>
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

export default Workload;