declare module "angularjs-google-chart" {

    interface IGoogleChartData {
        cols: IGoogleChartCol[]
        rows: any[]
    }

    interface IGoogleChartProperties {
        [key: string]: any
    }

    interface IGoogleChartCol {
        label: string
        type: string
        id: any
        pattern: any
        role:any
    }
}
