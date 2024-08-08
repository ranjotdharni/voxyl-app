import styles from '../../assets/css/metrics/components/projectMetrics.module.css'
import CSS from 'csstype'
import { themes } from '../../theme'
import { useContext, useState } from 'react'
import { Context } from '../../pages/Layout'
import Chart from 'react-apexcharts'
import CustomDroplist, { PayloadItem } from '../CustomDroplist'
import { ApexOptions } from 'apexcharts'
import { STATUS_COLORS, STATUS_LITERALS } from '../projects/project/Step'

export default function ProjectMetrics() {
    const [theme, mode] = useContext(Context)
    const [viewMode, setViewMode] = useState<0 | 1>(0) // Where 0 = Step Mode & 1 = Point Mode
    // @ts-ignore
    const [overallChartOptions, setOverallChartOptions] = useState<ApexOptions>({
        series: [23, 43, 25, 33],
        labels: STATUS_LITERALS,
        colors: STATUS_COLORS,
        fill: {
            colors: STATUS_COLORS
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            pie: {
                customScale: 1.25,
                donut: {
                    size: '80%',
                    labels: {
                        show: true,
                        value: {
                            color: themes[mode][theme].primary.subheader
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            fontFamily: 'JetBrains Mono',
                            fontSize: '0.65rem',
                            color: themes[mode][theme].primary.highlight
                        }
                    }
                }
            }
        },
        legend: {
            fontFamily: 'JetBrains Mono',
            itemMargin: {
                horizontal: 2
            },
            markers: {
                strokeWidth: 0,
                offsetX: -2
            },
            labels: {
                useSeriesColors: true
            }
        },
        stroke: {
            show: false
        },
        subtitle: {
            text: '.',
            align: 'center',
            offsetY: 10000,
            style: {
                color: themes[mode][theme].primary.subheader,
                fontSize: '1rem',
                fontFamily: 'JetBrains Mono'
            }
        }
    })

    // @ts-ignore
    const [projectChartOptions, setProjectChartOptions] = useState<ApexOptions>({
        title: {
            text: 'Progress Graph',
            style: {
                fontFamily: 'JetBrains Mono',
                fontSize: '20px',
                color: themes[mode][theme].primary.header
            }
        },
        xaxis: {
            categories: ['Apr 3', 'Apr 6', 'Apr 9', 'Apr 12', 'Apr 15']
        },
        series: [
            {
                name: (viewMode === 0 ? 'Steps' : 'Points'),
                data: [22, 17, 14, 30, 18]
            }
        ],
        colors: [themes[mode][theme].primary.header],
        chart: {
            foreColor: themes[mode][theme].primary.highlight
        }
    })

    // @ts-ignore
    const [projects, setProjects] = useState<PayloadItem[]>([])
    const [selectedProject, setSelectedProject] = useState<number>(0)

    const inlineStyles: {[key: string]: CSS.Properties} = {
        "mainContainer": {
            background: themes[mode][theme].boxGradient,
            border: themes[mode][theme].glassBorder
        },
        "projectSelectTitle": {
            color: themes[mode][theme].primary.header
        },
        "basicContentContainer": {
            background: themes[mode][theme].glassBackground,
            border: themes[mode][theme].glassBorder,
            boxShadow: themes[mode][theme].glassShadow
        },
        "viewModeLabel": {
            color: themes[mode][theme].primary.subtext
        },
        "viewMode": {
            color: themes[mode][theme].primary.tertiary
        },
        "selectedViewMode": {
            color: themes[mode][theme].primary.subheader,
            background: themes[mode][theme].primary.header
        },
        "overallChartCaption": {
            color: themes[mode][theme].primary.highlight
        }
    }

    return (
        <div className={styles.mainContainer} style={inlineStyles.mainContainer}>
            <div className={styles.projectSelectContainer}>
                <div className={styles.projectSelectTitleWrapper}>
                    <p style={inlineStyles.projectSelectTitle}>Select Project</p>
                </div>
                <div className={styles.viewModeWrapper}>
                    <p style={inlineStyles.viewModeLabel}>View By</p>
                    <p style={viewMode === 0 ? inlineStyles.selectedViewMode : inlineStyles.viewMode} onClick={() => { setViewMode(0) }}>Steps</p>
                    <p style={viewMode === 1 ? inlineStyles.selectedViewMode : inlineStyles.viewMode} onClick={() => { setViewMode(1) }}>Points</p>
                </div>
                <div className={styles.projectSelectWrapper}>
                    <CustomDroplist selected={selectedProject} payload={projects} callback={setSelectedProject} />
                </div>
            </div>
            <div className={styles.content1Container} style={inlineStyles.basicContentContainer}>
                <div className={styles.overallChartWrapper}>
                    <div className={styles.overallChartPositioner}>
                        <Chart type='donut' series={overallChartOptions.series} options={overallChartOptions} height='100%' />
                    </div>
                    <div className={styles.overallChartCaption}>
                        <p style={inlineStyles.overallChartCaption}>All Tasks</p>
                    </div>
                </div>
                <div className={styles.logWrapper}>

                </div>
            </div>
            <div className={styles.content2Container} style={inlineStyles.basicContentContainer}>
                <div className={styles.projectChartContainer}>
                    <div className={styles.projectChartWrapper}>
                        <Chart options={projectChartOptions} series={projectChartOptions.series} type='line' width='100%' height='100%' />
                    </div>
                </div>
            </div>
        </div>
    )
}