import React, { Component } from 'react'
import CSVReader from 'react-csv-reader'

export default class importXlsx extends Component {

    logfile = (a, b) => {
        console.log(a)
        console.log(b)
    }

    render() {
        return (
            <div>
                <CSVReader onFileLoaded={(data, fileInfo) => this.logfile(data,fileInfo)} />
            </div>
        )
    }
}
