import { useSetState } from 'ahooks'
import ReactECharts from 'echarts-for-react'
import { map } from 'lodash'
import { useEffect } from 'react'

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
      data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    },
    yAxis: {
      type: 'value',
    },
    series: [],
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
