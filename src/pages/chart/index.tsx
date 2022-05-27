import { useSetState } from 'ahooks'
import ReactECharts from 'echarts-for-react'
import { map } from 'lodash'
import { useEffect } from 'react'

import { service } from '../../plugins/service'
export default function Chart() {
  const [option1, setOption1] = useSetState({
    title: {
      text: '工时折线图(本周)',
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
      data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    },
    yAxis: {
      type: 'value',
    },
    series: [],
  })

  const [option2, setOption2] = useSetState({
    title: {
      text: '工时折线图(上周)',
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
      data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    },
    yAxis: {
      type: 'value',
    },
    series: [],
  })
  useEffect(function () {
    service.post('workload/chart').then((res) => {
      setOption1({
        legend: {
          data: map(res.data.current, 'user.displayName'),
        },
        series: res.data.current.map((item: any) => {
          return {
            name: item.user.displayName,
            type: 'line',
            data: item.result,
          }
        }),
      })
      setOption2({
        legend: {
          data: map(res.data.prev, 'user.displayName'),
        },
        series: res.data.prev.map((item: any) => {
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
    <div className="p-[15px]">
      <ReactECharts option={option1} notMerge lazyUpdate theme={'theme_name'} className="bg-white p-[15px]" />
      <ReactECharts option={option2} notMerge lazyUpdate theme={'theme_name'} className="bg-white p-[15px] mt-[15px]" />
    </div>
  )
}
