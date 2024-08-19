import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Button, Alert } from 'react-native';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Comprar leite', completed: false },
    { id: '2', text: 'Estudar React Native', completed: false },
    { id: '3', text: 'Fazer exercício', completed: false },
  ]);
  
  const [newTask, setNewTask] = useState('');

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: (tasks.length + 1).toString(), text: newTask, completed: false }
      ]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja excluir esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          onPress: () => {
            setTasks(tasks.filter(task => task.id !== id));
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)} style={styles.taskContent}>
        <Text style={[styles.taskText, item.completed && styles.completedTask]}>{item.text}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Adicionar nova tarefa"
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="Adicionar Tarefa" onPress={addTask} />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskContent: {
    flex: 1,
  },
  taskText: {
    fontSize: 18,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'dashed',
    color: '#888',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    color: '#ffff'
  },
});

export default App;
