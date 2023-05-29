import React, { useState } from 'react'
import { Modal, Stack } from '@mantine/core'
import styles from '../../pages/workload/workload.module.css'
import type { Workload } from '../../lib/models'
import { FormattedDate } from 'react-intl'

const DayBox = ({ workload }: { workload: Workload }): React.JSX.Element => {
  const [opened, setOpened] = useState(false)

  const formatDate = (date: Date): React.JSX.Element => (
    <>
      <FormattedDate value={date} weekday="short" />
      <span> </span>
      <FormattedDate value={date} year="numeric" month="2-digit" day="2-digit" />
    </>
  )

  const getBoxHeight = (): string => {
    const percent = (workload.hoursTask / workload.hoursContract) * 100
    return `${percent > 10 || percent === 0 ? percent : 20}%`
  }

  const getBoxColor = (): string =>
    (workload.hoursTask / workload.hoursContract) * 100 === 100
      ? 'linear-gradient(180deg, rgba(238,142,141,1) 0%, rgba(214,92,91,1) 100%)'
      : 'linear-gradient(180deg, rgba(115,201,171,1) 0%, rgba(91,175,143,1) 100%)'

  const getBoxText = (): React.JSX.Element =>
    (workload.hoursTask / workload.hoursContract) * 100 === 100 ? (
      <>
        <b>{workload.hoursTask}h</b>
        <br />
        Full capacity
      </>
    ) : (
      <>📋</>
    )

  return (
    <Stack className={styles.box} onClick={() => setOpened(true)}>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Tasks">
        {workload.tasks.length > 0 ? (
          <ul>
            {workload.tasks.map((task) => (
              <li key={task.name}>
                <a href={task.link} target={'_blank'} rel="noreferrer">
                  {task.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div>No Tasks.</div>
        )}
      </Modal>
      <div className={styles.header}>{formatDate(new Date(Date.parse(workload.date)))}</div>
      <div className={styles.boxBackground}>
        <div
          className={styles.boxInside}
          style={{
            height: getBoxHeight(),
            background: getBoxColor(),
          }}
        >
          <div className={styles.text}>{getBoxText()}</div>
        </div>
        <div
          className={styles.boxInside}
          style={{
            height: `${(workload.hoursTimeoff / workload.hoursContract) * 100}%`,
            background: 'linear-gradient(180deg, rgba(252,227,48,1) 0%, rgba(252,188,48,1) 100%)',
          }}
        >
          <div className={styles.text}>🌴</div>
        </div>
      </div>
    </Stack>
  )
}

export default DayBox
