import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMoods } from '../actions/moodActions';
import PropTypes from 'prop-types';
import {Line, Pie} from 'react-chartjs-2';
import moment from 'moment'


class CheckinList extends Component {

    componentDidMount() {
        this.props.getMoods();
    }



    render() {

        const { moods } = this.props.mood

        // get all the moods labels
        const moods_labels = []
        moods.map(mood => moods_labels.push(mood.mood))
        // get the unique moods
        const moods_labels_uniq = [...new Set(moods_labels)];
        // get the number of each unique mood
        const moods_labels_uniq_counts = {};
        moods_labels.forEach(function (x) { moods_labels_uniq_counts[x] = (moods_labels_uniq_counts[x] || 0) + 1; });


        // get all the moods levels
        const mood_levels = []
        moods.map(mood => mood_levels.push(mood.mood_level))
        //get all th dates
        const dates = []
        moods.map(mood => {
            let formattedDate =  moment(mood.date).format('Do MMMM')
            return dates.push(formattedDate)
        })
   
        return (
            <div>
                <Line
            data={{
            labels: dates.reverse(),
            datasets: [
              {
                label: 'Mood level',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: mood_levels.reverse()
              }
            ]
          }}
          options={{
            title:{
              display:true,
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
            <Pie data={{
  labels: moods_labels_uniq,
  datasets: [
    {
      label: '# of Votes',
      data: Object.values(moods_labels_uniq_counts),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(125, 29, 24, 0.2)',
        'rgba(75, 229, 124, 0.2)',
        'rgba(195, 9, 14, 0.2)',

      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(125, 29, 24, 0.6)',
        'rgba(75, 229, 124, 1)',
        'rgba(195, 9, 14, 0.6)',

      ],
      borderWidth: 1,
    },
  ],
}} />

            </div>
        )
    }
}

CheckinList.propTypes = {
    getMoods: PropTypes.func.isRequired,
    mood: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool

}

const mapStateToProps = (state) => ({
    mood: state.mood,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getMoods })(CheckinList);