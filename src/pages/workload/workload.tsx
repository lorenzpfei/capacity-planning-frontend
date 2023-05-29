import type { SelectItem } from '@mantine/core'
import { Card, Image, Progress, Select, SimpleGrid, Text } from '@mantine/core'
import styles from './workload.module.css'
import React, { useCallback, useEffect, useState } from 'react'
import type { DateRangePickerValue } from '@mantine/dates'
import { DateRangePicker } from '@mantine/dates'
import 'dayjs/locale/de'
import type { Department, User } from '../../lib/models'
import DayBox from '../../components/DayBox/DayBox'
import { api } from '../../lib/api'
import type { AxiosResponse } from 'axios'
import { useIntl } from 'react-intl'

const Workload = (): React.JSX.Element => {
  const getDayInWeek = (date: Date, dayNo: number): Date => {
    const parsedDate = new Date(date)
    const day = parsedDate.getDay(),
      diff = parsedDate.getDate() - day + (day === 0 ? -6 : dayNo) // adjust when day is sunday
    return new Date(parsedDate.setDate(diff))
  }

  const intl = useIntl()

  const [selectedDepartment, setSelectedDepartment] = useState<Department>()
  const [departments, setDepartments] = useState<Department[]>([])
  const [selectItems, setSelectItems] = useState<SelectItem[]>([])

  const [users, setUsers] = useState<User[]>([])

  const monday = getDayInWeek(new Date(), 1)
  const friday = getDayInWeek(new Date(), 5)

  const [date, setDate] = useState<Date[]>([new Date(monday), new Date(friday)])

  const getUrlFromDates = useCallback(
    (): string =>
      //need to use swedish here for the correct time format
      `${date[0]
        .toLocaleDateString('sv-SE', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .split('/')
        .reverse()
        .join('-')}/${date[1]
        .toLocaleDateString('sv-SE', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .split('/')
        .reverse()
        .join('-')}`,
    [date]
  )

  useEffect(() => {
    if (departments.length > 0 && !selectedDepartment) {
      setSelectedDepartment(departments[0])
    }
  }, [selectedDepartment, departments])

  // Fetching workload data
  useEffect(() => {
    if (selectedDepartment) {
      void api
        .get(`/workload/${selectedDepartment.id}/${getUrlFromDates()}/`)
        .then((res: AxiosResponse<User[]>) => {
          setUsers(res.data)
        })
    }
  }, [selectedDepartment, getUrlFromDates])

  useEffect(() => {
    void api.get('/departments').then((res: AxiosResponse<Department[]>) => {
      setDepartments(res.data)

      //need to reformat array to work in select
      const formatedDepartments = res.data.map((item: Department) => {
        const tempSelectItem: SelectItem = {
          value: item.id.toString(),
          label: item.name,
          selected: item.id === selectedDepartment?.id,
        }
        return tempSelectItem
      })
      setSelectItems([...formatedDepartments])
    })
  }, [selectedDepartment?.id])

  const changeDateRange = (dates: DateRangePickerValue): void => {
    if (dates[0] !== null && dates[1] !== null) {
      setDate(dates as Date[])
    }
  }

  const changeDepartment = (departmentValue: number): void => {
    const newDepartment = departments.find((item) => item.id === departmentValue)
    if (newDepartment) {
      setSelectedDepartment(newDepartment)
    }
  }

  return (
    <>
      <h1>Capacities</h1>
      {selectItems.length > 0 && selectedDepartment ? (
        <>
          <div className={styles.flex}>
            <Select
              label="Pick a department"
              placeholder="Pick one"
              defaultValue={selectedDepartment.id.toString()}
              data={selectItems}
              onChange={(value) => changeDepartment(parseInt(value as string, 10))}
            />
          </div>
          <h2>{selectedDepartment.name}</h2>
          <div className={styles.week}>
            <div className={styles.info}>
              <DateRangePicker
                label="Select period"
                placeholder="Select period"
                value={date as DateRangePickerValue}
                onChange={changeDateRange}
                locale={intl.locale}
                inputFormat={'DD/MM/YYYY'}
              />
            </div>
          </div>
          {users.length > 0 ? (
            users.map((user) => {
              if (!(user.workloadSum && user.workload)) {
                return (
                  <p key={user.id}>
                    Es konnten keine Kapazitätsdaten für {user.name} gefunden werden.
                  </p>
                )
              }

              const weeklyPercentage =
                (user.workloadSum.hoursTimeoff + user.workloadSum.hoursTask) /
                user.workloadSum.hoursContract

              return (
                <div className={styles.week} key={user.name}>
                  <Card
                    withBorder
                    radius="md"
                    p="xl"
                    sx={(theme) => ({
                      backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                    })}
                    className={styles.card}
                  >
                    <div className={styles.info}>
                      <div className={styles.besides}>
                        <div>
                          <Image radius="xl" src={user.avatar} alt={user.name} width={40} />
                        </div>
                        <div>
                          <Text size="lg" weight={500}>
                            {user.name}
                          </Text>
                          <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                            {Math.round(
                              (user.workloadSum.hoursTimeoff + user.workloadSum.hoursTask) * 100
                            ) / 100}{' '}
                            / {user.workloadSum.hoursContract} Hours
                          </Text>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className={styles.besides}>
                        <Text size="xs" color="dimmed" mt={7}>
                          Load
                        </Text>
                        <Text
                          component="span"
                          color={weeklyPercentage < 0.8 ? 'teal' : '#E27574'}
                          weight={700}
                        >
                          {Math.round(weeklyPercentage * 100 * 100) / 100}%
                        </Text>
                      </div>
                      <Progress
                        value={weeklyPercentage * 100}
                        mt="md"
                        size="lg"
                        radius="xl"
                        color={weeklyPercentage < 0.8 ? 'teal' : '#E27574'}
                      />
                    </div>
                  </Card>
                  <div className={styles.days}>
                    <Card
                      withBorder
                      radius="md"
                      p={0}
                      style={{ width: '100%' }}
                      sx={(theme) => ({
                        backgroundColor:
                          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                      })}
                    >
                      <SimpleGrid cols={5} style={{ gap: 3, display: 'flex', overflowX: 'auto' }}>
                        {user.workload.length > 0
                          ? user.workload.map((workload) => (
                              <DayBox workload={workload} key={workload.date} />
                            ))
                          : undefined}
                      </SimpleGrid>
                    </Card>
                  </div>
                </div>
              )
            })
          ) : (
            <div>No entries found. Maybe there are no users assigned to this department.</div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default Workload
