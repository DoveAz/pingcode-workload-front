import { useSetState } from 'ahooks'
import ReactECharts from 'echarts-for-react'
import { map } from 'lodash'
import { useEffect, useState } from 'react'

import { service } from '../../plugins/service'
export default function Chart() {
  const [option, setOption] = useSetState({
    title: {
      text: 'Stacked Line',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: 'Union Ads',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: 'Video Ads',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: 'Direct',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: 'Search Engine',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  })
  useEffect(function () {
    service.post('workload/chart').then((res) => {
      setOption({
        legend: {
          data: map(res.data, 'user.displayName'),
        },
        series: res.data.map((item: any) => {
          return {
            name: item.user.displayName,
            type: 'line',
            data: item.result,
          }
        }),
      })
    })
  }, [])
  return (
    <div className="p-[15px] bg-white">
      <ReactECharts option={option} notMerge lazyUpdate theme={'theme_name'} />
    </div>
  )
}
