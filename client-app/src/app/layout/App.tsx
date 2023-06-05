import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';






function App() {
  const [Activities, setActivities]= useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity| undefined>(undefined)
  const [editMode, setEditMode] = useState(false);

  useEffect (()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(resoponse=>{
      setActivities(resoponse.data);
    })
  },[])

  function handleSelectActivity(id:string){
    setSelectedActivity(Activities.find(x=>x.id === id))
    
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?:string){
    id? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity:Activity){
    activity.id
      ? setActivities([...Activities.filter(x=>x.id != activity.id), activity])
      : setActivities([...Activities, activity]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
        <Container style = {{marginTop:'7em'}}>
          <ActivityDashBoard activities={Activities}
           selectedActivity={selectedActivity}
           selectActivity={handleSelectActivity}
           cancelSelectActivity={handleCancelSelectActivity}
           editMode={editMode}
           openForm={handleFormOpen}  
           closeForm={handleFormClose}
           createOrEdit={handleCreateOrEditActivity}
          />
          </Container>
        <Button content='test' />
    </>
  );
}

export default App;
