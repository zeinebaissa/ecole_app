import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';
import Sidebar from './Sidebar'; // Adjust the path as needed
import './Classes.css'; // Importing the CSS file

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState('');
  const [selectedNiveau, setSelectedNiveau] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const niveaux = ['7ème', '8ème', '9ème'];

  useEffect(() => {
    axios.get('http://localhost:9091/api/classes')
      .then(response => {
        setClasses(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching classes');
        setLoading(false);
      });
  }, []);

  const handleAddClass = () => {
    if (newClass && selectedNiveau) {
      axios.post('http://localhost:9091/api/classes', { nom_classe: newClass, niveau_classe: selectedNiveau })
        .then(response => {
          setClasses([...classes, response.data]);
          setNewClass('');
          setSelectedNiveau('');
        })
        .catch(error => setError('Error adding class'));
    } else {
      alert('Please select a niveau and provide a class name.');
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Gestion des Classes</h1>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <>
            <div className="input-container">
              <TextField
                label="Nom de la classe"
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <FormControl style={{ minWidth: 120 }}>
                <InputLabel>Niveau</InputLabel>
                <Select
                  value={selectedNiveau}
                  onChange={(e) => setSelectedNiveau(e.target.value)}
                >
                  {niveaux.map((niveau) => (
                    <MenuItem key={niveau} value={niveau}>
                      {niveau}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained" color="primary" onClick={handleAddClass} style={{ marginLeft: '10px' }}>
                Ajouter
              </Button>
            </div>

            <div className="classes-list">
              {niveaux.map((niveau) => (
                <div key={niveau} className="niveau-section">
                  <h3>{niveau}</h3>
                  {classes.filter((classe) => classe.niveau_classe === niveau).length > 0 ? (
                    <ul>
                      {classes.filter((classe) => classe.niveau_classe === niveau).map((classe) => (
                        <li key={classe.id_classe}>{classe.nom_classe}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>Aucune classe disponible pour ce niveau.</p>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Classes;
