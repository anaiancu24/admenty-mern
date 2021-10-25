import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMoods } from '../actions/moodActions';
import PropTypes from 'prop-types';
import {Line} from 'react-chartjs-2';
import moment from 'moment'


class CheckinList extends Component {

    state = {
        labels: ['January', 'February', 'March',
                 'April', 'May'],
        datasets: [
          {
            label: 'Rainfall',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
          }
        ]
      }



    componentDidMount() {
        this.props.getMoods();
    }



    render() {

        const { moods } = this.props.mood
        const positivities = []
        moods.map(mood => positivities.push(mood.positivity))
        const dates = []
        moods.map(mood => {
            let formattedDate =  moment(mood.date).format('Do MMMM YYYY')
            return dates.push(formattedDate)
        })
   
        return (
            <div>
                {positivities}
                <Line
          data={{
            labels: dates.reverse(),
            datasets: [
              {
                label: 'Positivity Level',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: positivities.reverse()
              }
            ]
          }}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
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