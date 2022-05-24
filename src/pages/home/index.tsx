import { useAntdTable } from 'ahooks'
import { Button, Radio, Table } from 'antd'
import Decimal from 'decimal.js'
import { find, map } from 'lodash'
import React, { useEffect, useState } from 'react'

import { User, Workload } from '../../interfaces'
import { dateOptions } from '../../lib/dateOptions'
import { service } from '../../plugins/service'
import { ymd } from '../../utils/formatter'

interface Result {
  list: Workload[]
  total: number
}
export default function Home() {
  const [userList, setUserList] = useState<User[]>([])
  const [date, setDate] = useState(1)
  const [activeUserId, setActiveUserId] = useState(null)
  useEffect(() => {
    service.post<User[]>('workload/user').then((res) => {
      setUserList(res.data)
    })
  }, [])
  const { tableProps, refresh } = useAntdTable(
    ({ current, pageSize }): Promise<Result> =>
      service
        .post('workload/list', {
          skip: (current - 1) * pageSize,
          take: pageSize,
          userId: activeUserId,
          date: find<any>(dateOptions, { value: date })?.conditions,
        })
        .then((res) => {
          return {
            total: res.data.total,
            list: res.data.data,
          }
        }),
    {
      refreshDeps: [activeUserId, date],
      defaultPageSize: 50,
    },
  )

  function handleSync() {
    service.post('workload/sync').then(() => {
      refresh()
    })
  }

  const columns = [
    {
      title: '项目',
      dataIndex: ['project', 'name'],
    },
    {
      title: '编号',
      dataIndex: 'workItemIdentifier',
    },
    {
      title: '工作项',
      dataIndex: 'workItemTitle',
      render: (text: string, record: Workload) => {
        return (
          <a href={`https://lingyusoft.pingcode.com/pjm/items/${record.workItemId}`} target="_blank" rel="noreferrer">
            {text}
          </a>
        )
      },
    },
    {
      title: '工时',
      dataIndex: 'duration',
      align: 'right' as const,
    },
    {
      title: '工时描述',
      dataIndex: 'description',
    },
    {
      title: '创建人',
      dataIndex: ['user', 'displayName'],
    },
    {
      title: '日期',
      dataIndex: 'date',
      render: ymd,
    },
  ]

  function summary(pageData: readonly Workload[]) {
    const total = pageData.length
      ? Decimal.sum(...map(pageData, 'duration'))
          .toDP()
          .toString()
      : 0
    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}>合计</Table.Summary.Cell>
          <Table.Summary.Cell index={1}></Table.Summary.Cell>
          <Table.Summary.Cell index={2} align="right">
            {total}
          </Table.Summary.Cell>
          <Table.Summary.Cell index={3}></Table.Summary.Cell>
          <Table.Summary.Cell index={4}></Table.Summary.Cell>
          <Table.Summary.Cell index={5}></Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    )
  }

  return (
    <div className="p-[10px]">
      <div className="flex justify-between mb-[10px]">
        <div>
          <Radio.Group
            options={userList.map(({ displayName: label, id: value }) => ({ label, value }))}
            onChange={(event) => setActiveUserId(event.target.value)}
            value={activeUserId}
            optionType="button"
            buttonStyle="solid"
          />

          <Radio.Group
            className="ml-[30px]"
            options={dateOptions}
            onChange={(event) => setDate(event.target.value)}
            value={date}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
        <Button type={'primary'} onClick={handleSync}>
          同步数据
        </Button>
      </div>

      <Table
        {...tableProps}
        columns={columns}
        rowKey={'id'}
        pagination={{ showSizeChanger: true, ...tableProps.pagination }}
        summary={summary}></Table>
    </div>
  )
}
