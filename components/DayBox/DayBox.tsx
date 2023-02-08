import {useState} from "react";
import {Modal, Stack, useMantineTheme} from "@mantine/core";
import styles from "@/pages/workload/overview.module.css";
import {Workload} from "@/pages/workload/overview";

interface IDayBox {
    workload: Workload;
}

const DayBox = ({workload}: IDayBox) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    const formatDate = (date: string) => {
        let options: any = {year: 'numeric', month: '2-digit', day: '2-digit'};
        return new Date(date).toLocaleDateString([], options);
    }

    return (
        <Stack className={styles.box} onClick={() => setOpened(true)}>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Tasks"
            >
                <ul>
                    {workload.tasks.map((task, index) => {
                        return (
                            <li key={index}>{task}</li>
                        )
                    })}
                </ul>
            </Modal>
            <div className={styles.header}>
                {formatDate(workload.date)}
            </div>
            <div className="body"
                 style={{backgroundColor: 'rgba(25, 113, 194, 0.2)', justifyContent: 'end', cursor: "pointer"}}>
                <div className={styles.boxInside}
                     style={{
                         height: workload.hoursTask / workload.hoursContract * 100 + '%',
                         backgroundColor: theme.colors.red[8]
                     }}>
                    <div className={styles.text}>Aufgaben</div>
                </div>
                <div className={styles.boxInside}
                     style={{
                         height: workload.hoursTimeoff / workload.hoursContract * 100 + '%',
                         backgroundColor: 'rgba(25, 113, 194, 0.4)'
                     }}>
                    <div className={styles.text}>Urlaub</div>
                </div>
            </div>
        </Stack>
    )
}

export default DayBox;