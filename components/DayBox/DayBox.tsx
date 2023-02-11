import {useState} from "react";
import {Modal, Stack} from "@mantine/core";
import styles from "@/pages/workload/overview.module.css";
import {Workload} from "@/pages/workload/overview";

interface IDayBox {
    workload: Workload;
}

export interface Task {
    name: string;
    link: string;
}

const DayBox = ({workload}: IDayBox) => {
    const [opened, setOpened] = useState(false);

    const formatDate = (date: string) => {
        let options: any = {year: 'numeric', month: '2-digit', day: '2-digit'};
        let optionsDay: any = {weekday: 'short'};
        return new Date(date).toLocaleDateString([], optionsDay) + ' ' + new Date(date).toLocaleDateString([], options);
    }

    const getBoxHeight = (workload: Workload) => {
        const percent = workload.hoursTask / workload.hoursContract * 100;
        return (percent > 10 || percent === 0 ? percent : 20) + '%';
    }

    const getBoxColor = (workload: Workload) => {
        return workload.hoursTask / workload.hoursContract * 100 === 100 ? 'linear-gradient(180deg, rgba(238,142,141,1) 0%, rgba(214,92,91,1) 100%)' : 'linear-gradient(180deg, rgba(115,201,171,1) 0%, rgba(91,175,143,1) 100%)';
    }

    const getBoxText = (workload: Workload) => {
        return workload.hoursTask / workload.hoursContract * 100 === 100 ? (
            <>
                <b>{workload.hoursTask}h</b>
                <br/>
                Full capacity
            </>
        ) : '📋';
    }

    return (
        <Stack className={styles.box} onClick={() => setOpened(true)}>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Tasks"
            >
                {workload.tasks.length > 0 ?
                    <ul>
                        {workload.tasks.map((task, index) => {
                            return (
                                <li key={index}>
                                    <a href={task.link} target={"_blank"} rel="noreferrer">{task.name}</a>
                                </li>
                            )
                        })}
                    </ul> :
                    <div>Keine Aufgaben.</div>}
            </Modal>
            <div className={styles.header}>
                {formatDate(workload.date)}
            </div>
            <div className={styles.boxBackground}>
                <div
                    className={styles.boxInside}
                    style={{
                        height: getBoxHeight(workload),
                        background: getBoxColor(workload),
                    }}
                >
                    <div className={styles.text}>{getBoxText(workload)}</div>
                </div>
                <div
                    className={styles.boxInside}
                    style={{
                        height: `${workload.hoursTimeoff / workload.hoursContract * 100}%`,
                        background: 'linear-gradient(180deg, rgba(252,227,48,1) 0%, rgba(252,188,48,1) 100%)',
                    }}
                >
                    <div className={styles.text}>🌴</div>
                </div>
            </div>
        </Stack>
    )
}

export default DayBox;