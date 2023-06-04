import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';






function App() {
  const [Activities, setActivities]= useState<Activity[]>([]);

  useEffect (()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(resoponse=>{
      setActivities(resoponse.data)
    })
  },[])

  return (
    <div >
      <NavBar/>
          <List>
            {Activities.map((activity)=>(
              <List.Item key={activity.id}>
                {activity.title}
              </List.Item>
            ))}
          </List>
      
        <Button content='test' />
    </div>
  );
}

export default App;
