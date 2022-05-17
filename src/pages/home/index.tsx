import { useRequest } from 'ahooks'
import { Button, Table } from 'antd'
import React from 'react'

import { Workload } from '../../interfaces'
import { service } from '../../plugins/service'
import { ymd } from '../../utils/formatter'

export default function Home() {
  const { data, refresh, loading } = useRequest((): Promise<Workload[]> => service.post('workload/list'))
  console.log(data)

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
      title: '工作项',
      dataIndex: 'workItemTitle',
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
  return (
    <div className="p-[10px]">
      <div className="flex justify-between mb-10px">
        <div></div>
        <Button type={'primary'} onClick={handleSync}>
          同步数据
        </Button>
      </div>

      <Table loading={loading} dataSource={data} columns={columns} rowKey={'id'}></Table>
    </div>
  )
}
