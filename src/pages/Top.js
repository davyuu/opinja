import React from 'react'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import TopRestaurants from '../components/TopRestaurants'
import TopUsers from '../components/TopUsers'
import './Top.css'

class Top extends React.Component {
  render() {
    return (
      <div className='top'>
        <Tabs selectedTabClassName='top-tab-selected'>
          <TabList className='top-tab-list'>
            <Tab className='top-tab'>Top Restaurants</Tab>
            <Tab className='top-tab'>Top Users</Tab>
          </TabList>

          <TabPanel>
            <TopRestaurants/>
          </TabPanel>
          <TabPanel>
            <TopUsers/>
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

export default Top
